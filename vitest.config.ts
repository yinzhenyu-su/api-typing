///<reference types="vitest"/>
import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  root: ".",
  resolve: {
    alias: {
      "@/src": path.resolve(__dirname, "./src"),
      "@/util": path.resolve(__dirname, "./util"),
      "@/test": path.resolve(__dirname, "./test"),
    },
  },
  test: {
    include: ["test/index.test.ts"],
    exclude: ["test/core-type.test.ts", "node_modules/**/*"],
  },
})
