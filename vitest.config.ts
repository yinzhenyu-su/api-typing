///<reference types="vitest"/>
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    exclude: ["test/core-type.test.ts"],
  },
})
