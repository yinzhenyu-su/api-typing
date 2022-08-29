import { defineConfig } from 'tsup'
export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  sourcemap: false,
  dts: false,
  format: ['esm', 'cjs'],
})