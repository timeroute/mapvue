/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "packages/index.ts"),
      name: "MapVue",
      fileName: "mapvue",
    },
    rollupOptions: {
      external: ["vue", "mapbox-gl"],
      output: {
        globals: {
          vue: "Vue",
          "mapbox-gl": "mapbox-gl",
        },
      },
    },
  },
  test: {
    setupFiles: ["setupTest.ts"],
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      reporter: [["json", { file: "coverage.json" }], ["text"]],
    },
  },
});
