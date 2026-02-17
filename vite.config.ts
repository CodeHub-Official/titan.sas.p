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
  "@": path.resolve(__dirname, "./src"), // شلنا كلمة client لأن الـ root أصلاً هو client
},
    },
  },
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  }
});
