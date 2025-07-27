// vite.config.js
import { defineConfig } from "file:///C:/Users/akash/OneDrive/Documents/Projects/webpack-micro/apps/host-dashboard/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/akash/OneDrive/Documents/Projects/webpack-micro/apps/host-dashboard/node_modules/@vitejs/plugin-react/dist/index.mjs";
import federation from "file:///C:/Users/akash/OneDrive/Documents/Projects/webpack-micro/apps/host-dashboard/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    federation({
      name: "host-dashboard",
      remotes: {
        tictactoeApp: "http://localhost:3001/assets/remoteEntry.js",
        checkerApp: "http://localhost:3002/assets/remoteEntry.js",
        hangmanApp: "http://localhost:3003/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3e3,
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxha2FzaFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUHJvamVjdHNcXFxcd2VicGFjay1taWNyb1xcXFxhcHBzXFxcXGhvc3QtZGFzaGJvYXJkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxha2FzaFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUHJvamVjdHNcXFxcd2VicGFjay1taWNyb1xcXFxhcHBzXFxcXGhvc3QtZGFzaGJvYXJkXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ha2FzaC9PbmVEcml2ZS9Eb2N1bWVudHMvUHJvamVjdHMvd2VicGFjay1taWNyby9hcHBzL2hvc3QtZGFzaGJvYXJkL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBmZWRlcmF0aW9uIGZyb20gJ0BvcmlnaW5qcy92aXRlLXBsdWdpbi1mZWRlcmF0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBmZWRlcmF0aW9uKHtcbiAgICAgIG5hbWU6ICdob3N0LWRhc2hib2FyZCcsXG4gICAgICByZW1vdGVzOiB7XG4gICAgICAgIHRpY3RhY3RvZUFwcDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hc3NldHMvcmVtb3RlRW50cnkuanMnLFxuICAgICAgICBjaGVja2VyQXBwOiAnaHR0cDovL2xvY2FsaG9zdDozMDAyL2Fzc2V0cy9yZW1vdGVFbnRyeS5qcycsXG4gICAgICAgIGhhbmdtYW5BcHA6ICdodHRwOi8vbG9jYWxob3N0OjMwMDMvYXNzZXRzL3JlbW90ZUVudHJ5LmpzJyxcbiAgICAgIH0sXG4gICAgICBzaGFyZWQ6IFsncmVhY3QnLCAncmVhY3QtZG9tJ11cbiAgICB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIG1vZHVsZVByZWxvYWQ6IGZhbHNlLFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgaG9zdDogdHJ1ZVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3YSxTQUFTLG9CQUFvQjtBQUNyYyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQkFBZ0I7QUFFdkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLFFBQ1AsY0FBYztBQUFBLFFBQ2QsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxJQUMvQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLElBQ2YsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
