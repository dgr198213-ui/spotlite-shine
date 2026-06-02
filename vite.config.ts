import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import { StartVitePlugin } from '@tanstack/start-vite-plugin';
import path from 'path';

export default defineConfig({
  plugins: [
    StartVitePlugin(),
    TanStackRouterVite(),
    react(),
  ],
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
