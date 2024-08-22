import { test, it, expect, describe, beforeAll } from "vitest"
import { existsSync } from "fs"
import { getDefinition } from "@/src/api-meta-init"
import { ProxyConfig, requestProxyHandler } from "@/src/api-typing-proxy"
import { isConfig } from "@/src/api-typing"

describe("test proxy, isConfig, init", async () => {
  it("test proxy", () => {
    const request = (config: ProxyConfig) => {
      return config
    }
    const proxy = new Proxy(request, requestProxyHandler) as (
      config: ProxyConfig,
    ) => ProxyConfig
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

    expect(
      proxy({
        url: "/caseInstance/v1/pageAfterGroup/{page}/{size}",
        params: { page: 1, size: 0 },
        data: {},
      }),
    ).toMatchInlineSnapshot(`
      {
        "data": {},
        "url": "/caseInstance/v1/pageAfterGroup/1/0",
      }
    `)

    expect(
      proxy({
        query: { ids: [1, 2, 3] },
        stringifyOptions: { arrayFormat: "comma", encode: false },
      }),
    ).toMatchInlineSnapshot(`
      {
        "url": "?ids=1,2,3",
      }
    `)

    expect(proxy({ url: "", data: "" })).toMatchInlineSnapshot(`
      {
        "data": "",
        "url": "",
      }
    `)

    expect(
      proxy({
        url: "",
        mock: true,
        baseURL: "http://localhost:3000/base",
        mockBaseURL: "http://localhost:3000/mock",
      }),
    ).toMatchInlineSnapshot(`
      {
        "baseURL": "http://localhost:3000/mock",
        "url": "",
      }
    `)

    expect(
      proxy({ url: "", mock: true, baseURL: "http://localhost:3000/base" }),
    ).toMatchInlineSnapshot(`
      {
        "baseURL": "http://localhost:3000/base",
        "url": "",
      }
    `)

    expect(
      proxy({
        url: "",
        mock: false,
        baseURL: "http://localhost:3000/base",
        mockBaseURL: "http://localhost:3000/mock",
      }),
    ).toMatchInlineSnapshot(`
      {
        "baseURL": "http://localhost:3000/base",
        "url": "",
      }
    `)
  })

  it("test isConfig", () => {
    expect(isConfig({})).toBeFalsy()
    expect(isConfig({ auth: "", __is_config: true })).toBeTruthy()
    expect(
      isConfig({ auth: "", __is_config: true, __is_data: true }),
    ).toBeFalsy()
    expect(isConfig({ auth: "", __is_data: true })).toBeFalsy()
    expect(isConfig({ auth: "" })).toBeFalsy()
    expect(isConfig({ params: "" })).toBeFalsy()
    expect(isConfig({ params: "", __is_config: true })).toBeTruthy()
  })

  test("test getDefinition", async () => {
    await getDefinition({
      jsonSchemaPath:
        "https://raw.githubusercontent.com/yinzhenyu-su/api-typing/main/assets/pet.json",
    })
    const success = await new Promise<boolean>((resolve) => {
      if (existsSync("./api-typing-meta.d.ts")) resolve(true)
    })
    expect(success).toBeTruthy()

    await getDefinition({
      jsonSchemaPath: "./api-typing-meta.openapi.json",
    })
    const success2 = await new Promise((resolve) => {
      if (existsSync("./api-typing-meta.d.ts")) resolve(true)
    })
    expect(success2).toBeTruthy()
  })
})
