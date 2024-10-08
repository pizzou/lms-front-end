import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // This is Vite's default, but you can specify it explicitly
  },
  server: {
    historyApiFallback: true, // Ensures SPA routing works properly in development
  },
});
