import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // // 静态页面配置
  // base: "/StudentSystem/",
  // build: {
  //   outDir: "./docs"
  // }
})
