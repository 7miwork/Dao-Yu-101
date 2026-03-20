import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Dao-Yu-101/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})