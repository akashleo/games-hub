import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-dashboard',
      remotes: {
        tictactoeApp: 'http://localhost:3001/assets/remoteEntry.js',
        checkerApp: 'http://localhost:3002/assets/remoteEntry.js',
        hangmanApp: 'http://localhost:3003/assets/remoteEntry.js',
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
