import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      cookie: 'cookie/index.js'
    }
  },
  optimizeDeps: {
    include: ['cookie']
  }
}) 