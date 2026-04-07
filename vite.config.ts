import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["..", "."],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "backend/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./frontend"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});