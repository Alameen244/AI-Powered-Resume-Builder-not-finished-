import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/AI-Powered-Resume-Builder-not-finished-/' : '/',
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
