import { test, it, expect } from "vitest"
import { APITypingRequestConfig, create, getDefinition } from "../src/index"
import { paths, components, external, operations } from '../api-typing'
import { requestProxyHandler } from '../src/proxy'

declare module '../src/index' {
  interface ApiTypingMeta {
    paths: paths,
    components: components,
    external: external,
    operations: operations,
  }
}

test("test proxy", async () => {
  const request = (config: APITypingRequestConfig) => {
    return config;
  }
  const proxy = new Proxy(request, requestProxyHandler) as (config: APITypingRequestConfig) => APITypingRequestConfig;
  const res = proxy({ url: '/some/res/{id}', params: { id: 1 } })
  expect(res).toMatchInlineSnapshot(`
    {
      "url": "/some/res/1",
    }
  `)

  expect(proxy({ url: '/some/res/{id}', params: { id: 2 }, query: { page: 1, pageSize: 10 } })).toMatchInlineSnapshot(`
    {
      "url": "/some/res/2?page=1&pageSize=10",
    }
  `)

  expect(proxy({ url: '/some/group/{groupId}/{resId}', params: { groupId: 123, resId: 456 } })).toMatchInlineSnapshot(`
    {
      "url": "/some/group/123/456",
    }
  `)

  expect(proxy({ url: '/some/group/{groupId}/{resId}', params: { groupId: 123, resId: 456 }, query: { page: 1, pageSize: 10 } })).toMatchInlineSnapshot(`
    {
      "url": "/some/group/123/456?page=1&pageSize=10",
    }
  `)

  expect(proxy({ url: '/some/group/id', params: { resId: 21 }, query: null })).toMatchInlineSnapshot(`
    {
      "url": "/some/group/id",
    }
  `)

  expect(proxy({ url: undefined, params: { resId: 21 }, query: { page: 1 } })).toMatchInlineSnapshot(`
    {
      "url": "?page=1",
    }
  `)
})

test("test getDefinition", async () => {
  const success = await getDefinition({ jsonSchemaPath: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json' })
  expect(success).toBeTruthy();
})
