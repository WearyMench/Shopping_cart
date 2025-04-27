import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Shopping_cart/", // Set base for GitHub Pages
});
