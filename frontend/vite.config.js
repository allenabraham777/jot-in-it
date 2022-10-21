import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      apis: path.resolve(__dirname, "./src/apis"),
      animations: path.resolve(__dirname, "./src/animations"),
      socket: path.resolve(__dirname, "./src/socket"),
      utils: path.resolve(__dirname, "./src/utils"),
      pages: path.resolve(__dirname, "./src/pages"),
      components: path.resolve(__dirname, "./src/components"),
      ChatProvider: path.resolve(__dirname, "./src/context/ChatProvider.jsx"),
    },
  },
  plugins: [react()],
});
