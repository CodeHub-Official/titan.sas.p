import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'client', // هذا السطر يخبر Vite أن ملف index.html موجود داخل مجلد client
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  }
});
