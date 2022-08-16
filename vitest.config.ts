import path from "path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "packages"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "packages/index.ts"),
      name: "MapVue",
      fileName: "mapvue",
    },
    rollupOptions: {
      external: ["vue", "mapbox-gl"],
      output: {
        globals: {
          vue: "Vue",
          mapboxgl: "mapboxgl",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./setupTest.ts",
    coverage: {
      reporter: ["text", "json-summary", "json"],
    },
  },
});
