import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  publicDir: 'public',
  base: './',
  server: {
    port: 3000,
    host: true
  }
})