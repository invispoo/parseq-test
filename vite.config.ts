import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/mutations': 'https://testapi2.parseq.pro',
    },
    cors: false,
  },
});
