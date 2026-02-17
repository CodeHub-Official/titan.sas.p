import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getAllServices,
  createService,
  updateService,
  getAllPackages,
  createPackage,
  updatePackage,
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../db";

export const servicesRouter = router({
  // Get all active services
  list: publicProcedure.query(() => {
    return getAllServices();
  }),

  // Create service (admin only)
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        nameAr: z.string().min(1),
        description: z.string().optional(),
        descriptionAr: z.string().optional(),
        imageUrl: z.string().optional(),
        price: z.number().optional(),
        duration: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return createService(input);
    }),

  // Update service (admin only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        nameAr: z.string().optional(),
        description: z.string().optional(),
        descriptionAr: z.string().optional(),
        imageUrl: z.string().optional(),
        price: z.number().optional(),
        duration: z.number().optional(),
        isActive: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const { id, ...data } = input;
      return updateService(id, data);
    }),
});

export const packagesRouter = router({
  // Get all active packages
  list: publicProcedure.query(() => {
    return getAllPackages();
  }),

  // Create package (admin only)
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        nameAr: z.string().min(1),
        description: z.string().optional(),
        descriptionAr: z.string().optional(),
        price: z.number().positive(),
        originalPrice: z.number().optional(),
        features: z.string().optional(),
        duration: z.number().optional(),
        isPopular: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return createPackage(input);
    }),

  // Update package (admin only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        nameAr: z.string().optional(),
        description: z.string().optional(),
        descriptionAr: z.string().optional(),
        price: z.number().optional(),
        originalPrice: z.number().optional(),
        features: z.string().optional(),
        duration: z.number().optional(),
        isPopular: z.number().optional(),
        isActive: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const { id, ...data } = input;
      return updatePackage(id, data);
    }),
});

export const appointmentsRouter = router({
  // Create appointment (public)
  create: publicProcedure
    .input(
      z.object({
        clientName: z.string().min(1),
        clientEmail: z.string().email().optional(),
        clientPhone: z.string().min(1),
        serviceId: z.number().optional(),
        packageId: z.number().optional(),
        appointmentDate: z.date(),
        duration: z.number().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return createAppointment({
        ...input,
        status: "pending",
      });
    }),

  // Get appointments (admin only)
  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    return getAppointments(100);
  }),

  // Update appointment status (admin only)
  updateStatus: protectedProcedure
    .input(
      z.object({
        appointmentId: z.number(),
        status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return updateAppointmentStatus(input.appointmentId, input.status);
    }),
});
