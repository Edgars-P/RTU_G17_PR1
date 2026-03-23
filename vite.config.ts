import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
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
