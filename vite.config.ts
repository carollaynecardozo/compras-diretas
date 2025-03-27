import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://dados.tcerj.tc.br/api",
        changeOrigin: true,
        secure: false, // Ignora certificados SSL inválidos, se houver
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
