import { defineConfig } from "tsup"
export default defineConfig({
  entry: {
    index: "src/index.ts",
    apiMetaInit: "src/ApiMetaInit.ts",
  },
  outDir: "./outdir",
  sourcemap: true,
  dts: false,
  format: ["esm", "cjs"],
})
