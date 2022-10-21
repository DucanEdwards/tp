import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    port: 3000,
    proxy:{
      '/api': {
        target: 'http://localhost:9000',//后端接口地址
        changeOrigin: true,//是否允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})
