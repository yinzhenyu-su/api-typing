///<reference types="vitest"/>
import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  root: ".",
  resolve: {
    alias: {
      "@/src": path.resolve(__dirname, "./src"),
      "@/util": path.resolve(__dirname, "./src/util"),
      "@/test": path.resolve(__dirname, "./src/test"),
    },
  },
  test: {
    exclude: ["src/test/core-type.test.ts", "node_modules/**/*"],
  },
})
