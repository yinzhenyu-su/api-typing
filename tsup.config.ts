import { defineConfig } from 'tsup'
export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  sourcemap: true,
  dts: false,
  format: ['esm', 'cjs'],
})