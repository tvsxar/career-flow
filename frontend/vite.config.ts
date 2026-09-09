import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/api": {
        target:
          mode === "e2e"
            ? "http://localhost:1100"
            : "http://localhost:1099",
        changeOrigin: true,
      },
    },
  },
}));
