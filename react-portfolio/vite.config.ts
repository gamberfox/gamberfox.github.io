import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        //'vue', // Exclude 'vue' from the bundle
        //'react', // Exclude 'react' from the bundle
        //'i18next',
        //'react-i18next',
        //'./i18next-http-backend',
        //'i18next-browser-languagedetector'
      ]
    }
  }})