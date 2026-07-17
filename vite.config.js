import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration.
// `base: '/'` (absolute) so assets and client routes work on nested paths
// like /erp/login on Netlify/Vercel. Deep-link refreshes rely on the SPA
// fallback in public/_redirects (Netlify) and vercel.json (Vercel).
export default defineConfig({
  plugins: [react()],
  base: '/',
})
