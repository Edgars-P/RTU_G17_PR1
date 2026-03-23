import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [cloudflare()],
  build: {
    rolldownOptions: {
      input: {
        main: "index.html",
        game: "game/index.html",
        rules: "gamerules/index.html",
      },
    },
  },
});