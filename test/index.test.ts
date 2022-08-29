import { test, it, expect } from "vitest"
import { create, init } from "../src/index"
import { paths, components, external, operations } from '../api-typing'

declare module '../src/index' {
  interface ApiTypingMeta {
    paths: paths,
    components: components,
    external: external,
    operations: operations,
  }
}

test("test type", async () => {
  const success = await init({ jsonSchemaPath: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json' })
  expect(success).toBeTruthy();
})
