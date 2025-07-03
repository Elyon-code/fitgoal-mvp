import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // ensure this line is present
  ],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      },
   },
})
