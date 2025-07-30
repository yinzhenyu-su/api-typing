import { describe, it, expectTypeOf } from "vitest"
import type { 
  ApiTyping, 
  ApiTypingMeta, 
  PathKeyOfMethod,
  ExtractMethodResponseStatusContentJSON,
  Extract200JSON
} from "../api-helper"
import type { GetArgs, PostArgs } from "../core-type"
import { createHTTPClient } from "../api-typing"

// Define a custom API type for testing
interface CustomApiTypes extends ApiTyping {
  paths: {
    "/users/{id}": {
      get: {
        parameters: {
          path: { id: number }
          query?: { include?: string }
        }
        responses: {
          200: {
            content: {
              "application/json": {
                id: number
                name: string
                email: string
              }
            }
          }
        }
      }
    }
    "/users": {
      post: {
        parameters: {}
        requestBody: {
          content: {
            "application/json": {
              name: string
              email: string
            }
          }
        }
        responses: {
          201: {
            content: {
              "application/json": {
                id: number
                name: string
                email: string
              }
            }
          }
        }
      }
    }
  }
  components: {
    schemas: {
      User: {
        id: number
        name: string
        email: string
      }
    }
  }
  operations: {}
  external: {}
}

describe("Generic Type System Tests", () => {
  it("should correctly extract paths for custom types", () => {
    type CustomPaths = PathKeyOfMethod<"get", CustomApiTypes>
    expectTypeOf<CustomPaths>().toEqualTypeOf<"/users/{id}">()

    type PostPaths = PathKeyOfMethod<"post", CustomApiTypes>
    expectTypeOf<PostPaths>().toEqualTypeOf<"/users">()
  })

  it("should correctly extract response types for custom types", () => {
    type GetUserResponse = ExtractMethodResponseStatusContentJSON<
      "get", 
      200, 
      "/users/{id}", 
      CustomApiTypes
    >
    expectTypeOf<GetUserResponse>().toEqualTypeOf<{
      id: number
      name: string
      email: string
    }>()

    type PostUserResponse = ExtractMethodResponseStatusContentJSON<
      "post", 
      201, 
      "/users", 
      CustomApiTypes
    >
    expectTypeOf<PostUserResponse>().toEqualTypeOf<{
      id: number
      name: string
      email: string
    }>()
  })

  it("should correctly handle Extract200JSON with custom types", () => {
    type UserFromGet = Extract200JSON<"get", "/users/{id}", CustomApiTypes>
    expectTypeOf<UserFromGet>().toEqualTypeOf<{
      id: number
      name: string
      email: string
    }>()
  })

  it("should correctly type request args for custom types", () => {
    type GetUserArgs = GetArgs<"/users/{id}", CustomApiTypes>
    
    // Test the structure without strict type checking
    const getUserArgs: GetUserArgs = [
      "/users/{id}",
      {
        params: { id: 123 },
        query: { include: "profile" }
      }
    ]
    
    expectTypeOf(getUserArgs).toMatchTypeOf<GetUserArgs>()

    type PostUserArgs = PostArgs<"/users", CustomApiTypes>
    
    // Test the structure
    const postUserArgs: PostUserArgs = [
      "/users",
      { name: "John", email: "john@example.com" }
    ]
    
    expectTypeOf(postUserArgs).toMatchTypeOf<PostUserArgs>()
  })

  it("should create properly typed HTTP client with custom types", () => {
    const customClient = createHTTPClient<CustomApiTypes>()
    
    expectTypeOf(customClient.get).toBeFunction()
    expectTypeOf(customClient.post).toBeFunction()
    
    // Test that the client methods accept the correct parameters
    expectTypeOf(customClient.get<"/users/{id}">).parameter(0).toEqualTypeOf<"/users/{id}">()
    expectTypeOf(customClient.post<"/users">).parameter(0).toEqualTypeOf<"/users">()
  })

  it("should maintain backward compatibility with default ApiTypingMeta", () => {
    const defaultClient = createHTTPClient()
    
    expectTypeOf(defaultClient.get).toBeFunction()
    expectTypeOf(defaultClient.post).toBeFunction()
    expectTypeOf(defaultClient.put).toBeFunction()
    expectTypeOf(defaultClient.delete).toBeFunction()
    expectTypeOf(defaultClient.patch).toBeFunction()
    expectTypeOf(defaultClient.head).toBeFunction()
    expectTypeOf(defaultClient.options).toBeFunction()
  })
})