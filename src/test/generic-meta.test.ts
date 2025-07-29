import { describe, it, expect } from "vitest"
import { createHTTPClient } from "../api-typing"
import type { ApiTyping, ApiTypingMeta } from "../api-helper"

describe("Generic ApiTypingMeta support", () => {
  it("should work with default ApiTypingMeta", () => {
    const client = createHTTPClient()
    expect(client).toBeDefined()
    expect(typeof client.get).toBe("function")
    expect(typeof client.post).toBe("function")
  })

  it("should work with custom API types", () => {
    // Define a custom API type
    interface CustomApiTypes extends ApiTyping {
      paths: {
        "/custom/{id}": {
          get: {
            parameters: {
              path: { id: string }
              query?: { include?: string }
            }
            responses: {
              200: {
                content: {
                  "application/json": {
                    id: string
                    name: string
                    customField: boolean
                  }
                }
              }
            }
          }
        }
        "/custom/create": {
          post: {
            parameters: {}
            requestBody: {
              content: {
                "application/json": {
                  name: string
                  customField: boolean
                }
              }
            }
            responses: {
              201: {
                content: {
                  "application/json": {
                    id: string
                    name: string
                    customField: boolean
                  }
                }
              }
            }
          }
        }
      }
      components: {
        schemas: {
          CustomEntity: {
            id: string
            name: string
            customField: boolean
          }
        }
      }
      operations: {}
      external: {}
    }

    // Create client with custom types
    const customClient = createHTTPClient<CustomApiTypes>({
      baseURL: "https://example.com/api"
    })

    expect(customClient).toBeDefined()
    expect(typeof customClient.get).toBe("function")
    expect(typeof customClient.post).toBe("function")
  })

  it("should maintain backward compatibility", () => {
    // Test that existing code still works without specifying generic parameter
    const defaultClient = createHTTPClient({
      baseURL: "https://httpbin.org/anything"
    })

    expect(defaultClient).toBeDefined()
    expect(typeof defaultClient.get).toBe("function")
    expect(typeof defaultClient.post).toBe("function")
    expect(typeof defaultClient.put).toBe("function")
    expect(typeof defaultClient.delete).toBe("function")
    expect(typeof defaultClient.patch).toBe("function")
    expect(typeof defaultClient.head).toBe("function")
    expect(typeof defaultClient.options).toBe("function")
  })
})