import { expect, it, describe, vi } from "vitest"
import { createHTTPClient } from "../api-typing"

const client = createHTTPClient({ baseURL: "https://httpbin.org/anything" })

describe("test instance", () => {
  it("should return data", async () => {
    const spy = vi.spyOn(client, "get")
    spy.mockResolvedValue({
      data: { name: "dog", id: 2, tag: "husky" },
      status: 200,
      statusText: "Ok",
      headers: {},
      config: { headers: {} as any },
    })
    const res = await client.get("/pets/{id}", { params: { id: 2 } })
    expect(spy.getMockImplementation())
    expect(res.data.id).toBe(2)
  })

  it("should throw error", async () => {
    const spy = vi.spyOn(client, "get")
    spy.mockRejectedValue(new Error("Network Error"))

    try {
      await client.get("/pets/{id}", { params: { id: 0 } })
    } catch (error: any) {
      expect(error.message).toBe("Network Error")
    }
  })
})
