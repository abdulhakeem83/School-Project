import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration.
// `base: './'` keeps asset paths relative so the same build works on
// Netlify, Vercel and GitHub Pages without any changes.
export default defineConfig({
  plugins: [react()],
  base: './',
})
