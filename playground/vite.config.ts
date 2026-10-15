import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  preview: {
    port: 4173,
    strictPort: true,
  },
});
