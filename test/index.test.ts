import { test, it, expect } from "vitest"
import { existsSync } from "fs"
import { getDefinition } from "@/src/api-meta-init"
import { requestProxyHandler } from "@/src/api-typing-proxy"
import type { ApiTypingRequestRaw } from "@/src/core-type"
import { isConfig } from "@/src/api-typing"

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

  expect(proxy({ url: undefined, params: { resId: 21 }, query: null }))
    .toMatchInlineSnapshot(`
    {
      "url": "",
    }
  `)

  expect(
    proxy({
      url: undefined,
      mock: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "url": "",
    }
  `)

  expect(proxy({ url: "", mock: true, baseURL: "/mock/base" }))
    .toMatchInlineSnapshot(`
    {
      "baseURL": "/mock/base",
      "url": "",
    }
  `)
})

test("test isConfig", () => {
  expect(isConfig({})).toBeTruthy()
  expect(isConfig({ auth: "", __is_config: true })).toBeTruthy()
  expect(isConfig({ auth: "", __is_config: true, __is_data: true })).toBeFalsy()
  expect(isConfig({ auth: "", __is_data: true })).toBeFalsy()
  expect(isConfig({ auth: "" })).toBeTruthy()
  expect(isConfig({ params: "" })).toBeTruthy()
})

test("test getDefinition", async () => {
  await getDefinition({
    jsonSchemaPath:
      "https://raw.githubusercontent.com/yinzhenyu-su/api-typing/main/assets/pet.json",
  }).finally(() => {
    setTimeout(() => {
      expect(existsSync("../api-typing-meta.d.ts")).toBeTruthy()
    }, 1000)
  })
})
