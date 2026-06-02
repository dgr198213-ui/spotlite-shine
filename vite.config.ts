import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// NOTE: Removed @tanstack/start-vite-plugin and @tanstack/router-vite-plugin imports
// in this branch to avoid build-time import/export errors on Vercel. Re-add them
// once we confirm the correct exported API or upgrade those plugins.

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: 'all',
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
  ssr: {
    external: ['@supabase/supabase-js', 'stripe'],
  },
});
