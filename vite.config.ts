import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  root: 'client',
  resolve: {
    alias: {
      // بما أن الـ root هو client، فالمسار النسبي لـ src هو الحالي
      "@": path.resolve(__dirname, "./client/src"),
    },
  },
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  }
});
