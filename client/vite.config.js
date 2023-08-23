import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4444,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:4445',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
