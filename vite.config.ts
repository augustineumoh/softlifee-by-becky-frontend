import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Split chunks for faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui:     ['framer-motion', 'react-icons'],
          store:  ['zustand'],
        },
      },
    },
    // esbuild is Vite's built-in minifier — no extra package needed
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'zustand'],
  },
  // Drop console.log and debugger statements in production builds.
  // pure removes console.log calls only — console.error is kept so real errors stay visible.
  esbuild: {
    drop: ['debugger'],
    pure: ['console.log'],
  },
})
