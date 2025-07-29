import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-dashboard',
      remotes: {
        tictactoeApp: 'http://172.18.160.1:3001/remoteEntry.js',
        checkerApp: 'http://172.18.160.1:3002/remoteEntry.js',
        hangmanApp: 'http://172.18.160.1:3003/remoteEntry.js',
        spinwheelApp: 'http://172.18.160.1:3004/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3000,
    host: true
  }
})
