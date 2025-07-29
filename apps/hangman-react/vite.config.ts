import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hangmanApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx'
      },
      shared: ['react', 'react-dom'],
      dev: true
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3003,
    host: '0.0.0.0',
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'OPTIONS'],
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
