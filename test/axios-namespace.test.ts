import { test, expect, it } from "vitest"
import { AxiosNamespace } from "@/src/index"

test("test axios-namespace", () => {
  const { Axios } = AxiosNamespace
  const httpClient = new Axios({ baseURL: "." })

  expect(Object.entries(httpClient)).toMatchInlineSnapshot(`
    [
      [
        "defaults",
        {
          "baseURL": ".",
        },
      ],
      [
        "interceptors",
        {
          "request": InterceptorManager {
            "handlers": [],
          },
          "response": InterceptorManager {
            "handlers": [],
          },
        },
      ],
    ]
  `)

  expect(httpClient).toHaveProperty("post")
  expect(httpClient).toHaveProperty("put")
  expect(httpClient).toHaveProperty("patch")
  expect(httpClient).toHaveProperty("delete")
  expect(httpClient).toHaveProperty("get")
  expect(httpClient).toHaveProperty("options")
})
