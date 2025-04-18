import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   port: 3000,
  //   host: "localhost",
  //   strictPort: true,
  //   open: true,
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //     allowedHeaders: ["Content-Type", "Authorization"],
  //     exposedHeaders: ["Content-Type", "Authorization"],
  //     credentials: true,
  //     maxAge: 3600,
  //   },
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:5000",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
