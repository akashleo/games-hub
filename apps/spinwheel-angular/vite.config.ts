import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular'; 
import federation from '@originjs/vite-plugin-federation';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills({
      protocolImports: true,
    }),
    angular(), 
    federation({
      name: 'spinwheelApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/app/app.component.ts', 
      },
      shared: [
        '@angular/core',
        '@angular/common',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        'rxjs',
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3004,
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
