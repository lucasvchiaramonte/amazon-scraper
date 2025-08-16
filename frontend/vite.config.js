import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // Proxy API calls to the backend to avoid CORS issues
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
