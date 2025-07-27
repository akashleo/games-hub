import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import federation from '@originjs/vite-plugin-federation'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    svelte(),
    federation({
      name: 'tictactoeApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.svelte'
      },
      shared: ['svelte']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3001,
    host: true
  }
})
