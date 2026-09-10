import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Build de produção normal serve da raiz (domínio próprio). O workflow de
  // preview no GitHub Pages passa GH_PAGES=true para servir do subcaminho
  // do repositório (https://<user>.github.io/<repo>/).
  base: process.env.GH_PAGES === 'true' ? '/Python/' : '/',
})
