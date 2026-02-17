import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { createFileUpload, getUserFiles, deleteFileUpload } from "../db";
import { storagePut, storageGet } from "../storage";

export const filesRouter = router({
  // Get user's uploaded files
  getUserFiles: protectedProcedure.query(({ ctx }) => {
    return getUserFiles(ctx.user.id);
  }),

  // Generate presigned URL for file upload
  getUploadUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string().min(1),
        fileSize: z.number().positive(),
        mimeType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // In production, validate file size and type
      if (input.fileSize > 50 * 1024 * 1024) {
        throw new Error("File too large (max 50MB)");
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(input.mimeType)) {
        throw new Error("Invalid file type");
      }

      // Generate a unique key for S3
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const fileKey = `uploads/${ctx.user.id}/${timestamp}-${random}-${input.fileName}`;

      return {
        fileKey,
        uploadUrl: `${process.env.VITE_FRONTEND_FORGE_API_URL}/upload?key=${fileKey}`,
      };
    }),

  // Record file upload in database
  recordUpload: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileKey: z.string(),
        fileUrl: z.string(),
        mimeType: z.string(),
        fileSize: z.number(),
        category: z.enum(["before_after", "gallery", "document"]),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return createFileUpload({
        userId: ctx.user.id,
        fileName: input.fileName,
        fileKey: input.fileKey,
        fileUrl: input.fileUrl,
        mimeType: input.mimeType,
        fileSize: input.fileSize,
        category: input.category,
        description: input.description,
      });
    }),

  // Delete uploaded file
  deleteFile: protectedProcedure
    .input(z.object({ fileId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      // Verify user owns this file
      const files = await getUserFiles(ctx.user.id);
      const file = files.find((f) => f.id === input.fileId);

      if (!file) {
        throw new Error("File not found or unauthorized");
      }

      // Delete from S3 (optional - depends on your setup)
      // await deleteFromS3(file.fileKey);

      return deleteFileUpload(input.fileId);
    }),

  // Get download URL for file
  getDownloadUrl: protectedProcedure
    .input(z.object({ fileId: z.number() }))
    .query(async ({ input, ctx }) => {
      const files = await getUserFiles(ctx.user.id);
      const file = files.find((f) => f.id === input.fileId);

      if (!file) {
        throw new Error("File not found or unauthorized");
      }

      // Generate presigned URL
      const { url } = await storageGet(file.fileKey);
      return { url };
    }),
});
