import { test, it, expect } from "vitest"
import { existsSync } from "fs"
import { create, getDefinition } from "../src/index"
import { requestProxyHandler } from "../src/proxy"
import type { ApiTypingRequestRaw } from "../src/CoreType"
import type {
  components,
  paths,
  external,
  operations,
} from "../api-typing-meta"

declare module "../src/index" {
  interface ApiTypingMeta {
    components: components
    paths: paths
    external: external
    operations: operations
  }
}

test("test proxy", async () => {
  const request = (config: ApiTypingRequestRaw) => {
    return config
  }
  const proxy = new Proxy(request, requestProxyHandler) as (
    config: ApiTypingRequestRaw,
  ) => ApiTypingRequestRaw
  const res = proxy({ url: "/some/res/{id}", params: { id: 1 } })
  expect(res).toMatchInlineSnapshot(`
    {
      "url": "/some/res/1",
    }
  `)

  expect(
    proxy({
      url: "/some/res/{id}",
      params: { id: 2 },
      query: { page: 1, pageSize: 10 },
    }),
  ).toMatchInlineSnapshot(`
    {
      "url": "/some/res/2?page=1&pageSize=10",
    }
  `)

  expect(
    proxy({
      url: "/some/group/{groupId}/{resId}",
      params: { groupId: 123, resId: 456 },
    }),
  ).toMatchInlineSnapshot(`
    {
      "url": "/some/group/123/456",
    }
  `)

  expect(
    proxy({
      url: "/some/group/{groupId}/{resId}",
      params: { groupId: 123, resId: 456 },
      query: { page: 1, pageSize: 10 },
    }),
  ).toMatchInlineSnapshot(`
    {
      "url": "/some/group/123/456?page=1&pageSize=10",
    }
  `)

  expect(proxy({ url: "/some/group/id", params: { resId: 21 }, query: null }))
    .toMatchInlineSnapshot(`
    {
      "url": "/some/group/id",
    }
  `)

  expect(proxy({ url: undefined, params: { resId: 21 }, query: { page: 1 } }))
    .toMatchInlineSnapshot(`
    {
      "url": "?page=1",
    }
  `)
})

test("test getDefinition", async () => {
  await getDefinition({
    jsonSchemaPath:
      "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json",
  }).finally(() => {
    setTimeout(() => {
      expect(existsSync("../api-typing-meta.d.ts")).toBeTruthy()
    }, 1000)
  })
})
