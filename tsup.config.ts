import { defineConfig } from "tsup"
export default defineConfig({
  entry: {
    index: "src/index.ts",
    "api-meta-init": "src/api-meta-init.ts",
  },
  outDir: "./outdir",
  sourcemap: true,
  dts: false,
  format: ["esm", "cjs"],
})
