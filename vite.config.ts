import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'client',
  resolve: {
    alias: {
      // السطرين دول هم اللي هيحلوا مشكلة "@/components/ui/sonner"
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  }
});
