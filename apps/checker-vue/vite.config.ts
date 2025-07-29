import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    vue(),
    federation({
      name: 'checkerApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue'
      },
      shared: ['vue'],
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
    port: 3002,
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
  }
})
