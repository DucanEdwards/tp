import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commpressPlugin from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      commpressPlugin({
        verbose: true, // 默认即可
        disable: false, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 10240, //压缩前最小文件大小
        algorithm: 'gzip', //压缩算法
        ext: '.gz' //文件类型
      })
  ],
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
