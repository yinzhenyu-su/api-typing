import { expect, it, describe, vi } from "vitest"
import { createHTTPClient } from "../api-typing"

const client = createHTTPClient({
  baseURL: "https://httpbin.org/anything",
})

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
    client.post(
      "/pets",
      { name: "dog", tag: "pet" },
      { headers: { test: "test" } },
    )
    client.get("/pets", { headers: { test: "test" } })
    client.delete("/pets", { query: { id: 1 }, __is_config: true })

    client.get("/pets/{id}", { params: { id: 0 }, headers: { test: "test" } })
    client.put(
      "/pets/{id}",
      { name: "dog" },
      { params: { id: 0 }, headers: { test: "test" } },
    )

    try {
      await client.get("/pets/{id}", { params: { id: 0 } })
    } catch (error: any) {
      expect(error.message).toBe("Network Error")
    }
  })

  describe("test POST request", () => {
    it("should post pet data correctly", async () => {
      const postSpy = vi.spyOn(client, "post")
      postSpy.mockResolvedValue({
        data: { id: 123, name: "dog", tag: "pet" },
        status: 201,
        statusText: "Created",
        headers: {},
        config: { headers: {} as any },
      })

      const res = await client.post(
        "/pets",
        { name: "dog", tag: "pet" },
        { headers: { test: "test" } },
      )

      expect(postSpy).toHaveBeenCalledWith(
        "/pets",
        { name: "dog", tag: "pet" },
        { headers: { test: "test" } },
      )
      expect(res.data.name).toBe("dog")
      expect(res.status).toBe(201)
    })
  })

  describe("test GET request", () => {
    it("should get pets list with custom headers", async () => {
      // const getInstanceSpy = vi.spyOn(client.api, "request")
      // getInstanceSpy.mockReturnValue({
      //   baseURL: "https://httpbin.org/anything",
      //   headers: { test: "test" },
      //   stringifyOptions: { arrayFormat: "comma", encode: false },
      // })

      const getSpy = vi.spyOn(client, "get")
      getSpy.mockResolvedValue({
        data: [
          { id: 1, name: "dog" },
          { id: 2, name: "cat" },
        ],
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: { test: "test" } as any },
      })

      const res = await client.get("/pets", { headers: { test: "test" } })

      expect(getSpy).toHaveBeenCalledWith("/pets", {
        headers: { test: "test" },
      })
      expect(res.data).toHaveLength(2)
      expect(res.data[0].name).toBe("dog")
      expect(res.config.headers.test).toBe("test")
    })
  })

  describe("test DELETE request", () => {
    it("should delete pet using query parameter", async () => {
      const deleteSpy = vi.spyOn(client, "delete")
      deleteSpy.mockResolvedValue({
        data: { id: 1 },
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} as any },
      })

      const res = await client.delete("/pets", {
        query: { id: 1 },
        __is_config: true,
      })

      expect(deleteSpy).toHaveBeenCalledWith("/pets", {
        query: { id: 1 },
        __is_config: true,
      })
      expect(res.data.id).toBe(1)
    })
  })

  describe("test GET request with path parameter", () => {
    it("should get specific pet with path parameter and custom headers", async () => {
      const getSpy = vi.spyOn(client, "get")
      getSpy.mockResolvedValue({
        data: { id: 0, name: "specific dog" },
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/json" },
        config: { headers: { test: "test" } as any },
      })

      const res = await client.get("/pets/{id}", {
        params: { id: 0 },
        headers: { test: "test" },
      })

      expect(getSpy).toHaveBeenCalledWith("/pets/{id}", {
        params: { id: 0 },
        headers: { test: "test" },
      })
      expect(res.data.id).toBe(0)
      expect(res.data.name).toBe("specific dog")
      expect(res.config.headers.test).toBe("test")
    })
  })

  describe("test PUT request", () => {
    it("should update pet data with path parameter", async () => {
      const putSpy = vi.spyOn(client, "put")
      putSpy.mockResolvedValue({
        data: { id: 0, name: "dog" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} as any },
      })

      const res = await client.put(
        "/pets/{id}",
        { name: "dog" },
        { params: { id: 0 }, headers: { test: "test" } },
      )

      expect(putSpy).toHaveBeenCalledWith(
        "/pets/{id}",
        { name: "dog" },
        { params: { id: 0 }, headers: { test: "test" } },
      )
      expect(res.data.id).toBe(0)
      expect(res.data.name).toBe("dog")
    })
  })
})
