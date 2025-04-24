import { describe, it, expect } from "vitest"
import { _createRequestOptions } from "../api-typing"

describe("测试_createRequestOptions函数", () => {
  it("应该正确处理普通请求参数", () => {
    const options = _createRequestOptions(
      "get", 
      "/api/users", 
      undefined, 
      { headers: { "Content-Type": "application/json" } }
    )
    
    expect(options).toEqual({
      method: "get",
      url: "/api/users",
      headers: { "Content-Type": "application/json" },
      mock: false,
      mockBaseURL: "",
      stringifyOptions: {}
    })
  })

  it("应该正确处理带有数据的请求参数", () => {
    const data = { name: "test", age: 20 }
    const options = _createRequestOptions(
      "post", 
      "/api/users", 
      data, 
      { headers: { "Content-Type": "application/json" } }
    )
    
    expect(options).toEqual({
      method: "post",
      url: "/api/users",
      data: { name: "test", age: 20 },
      headers: { "Content-Type": "application/json" },
      mock: false,
      mockBaseURL: "",
      stringifyOptions: {}
    })
  })

  it("应该处理当数据是配置对象的情况", () => {
    const configData = { 
      headers: { "X-Custom": "value" },
      __is_config: true
    }
    const options = _createRequestOptions(
      "post", 
      "/api/users", 
      configData, 
      undefined
    )
    
    expect(options).toEqual({
      method: "post",
      url: "/api/users",
      headers: { "X-Custom": "value" },
      __is_config: true,
      mock: false,
      mockBaseURL: "",
      stringifyOptions: {}
    })
  })

  it("应该正确合并根配置和请求配置", () => {
    const rootConfig = {
      mock: true,
      mockBaseURL: "https://mock-api.example.com",
      stringifyOptions: { arrayFormat: "comma", encode: false }
    }
    
    const options = _createRequestOptions(
      "get", 
      "/api/users", 
      undefined, 
      { query: { ids: [1, 2, 3] } },
      rootConfig
    )
    
    expect(options).toEqual({
      method: "get",
      url: "/api/users",
      query: { ids: [1, 2, 3] },
      mock: true,
      mockBaseURL: "https://mock-api.example.com",
      stringifyOptions: { arrayFormat: "comma", encode: false }
    })
  })

  it("应该优先使用请求级别的配置", () => {
    const rootConfig = {
      mock: false,
      mockBaseURL: "https://mock-api.example.com",
      stringifyOptions: { arrayFormat: "brackets" }
    }
    
    const options = _createRequestOptions(
      "get", 
      "/api/users", 
      undefined, 
      { 
        mock: true,
        stringifyOptions: { arrayFormat: "comma" }
      },
      rootConfig
    )
    
    expect(options).toEqual({
      method: "get",
      url: "/api/users",
      mock: true,
      mockBaseURL: "https://mock-api.example.com",
      stringifyOptions: { arrayFormat: "comma" }
    })
  })
})