import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    // Powers the "Last updated" line. Baked in here rather than through a
    // generated .env file so it works the same on Windows, macOS and CI.
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
})
