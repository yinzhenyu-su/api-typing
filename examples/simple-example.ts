/**
 * 简单示例：快速开始使用 ApiTypingMeta 泛型支持
 */

import { createHTTPClient, type ApiTyping } from "../src/index"

// 定义简单的自定义 API 类型
interface SimpleApiTypes extends ApiTyping {
  paths: {
    "/hello": {
      get: {
        parameters: {}
        responses: {
          200: {
            content: {
              "application/json": {
                message: string
                timestamp: string
              }
            }
          }
        }
      }
    }
    "/users/{id}": {
      get: {
        parameters: {
          path: { id: number }
        }
        responses: {
          200: {
            content: {
              "application/json": {
                id: number
                name: string
              }
            }
          }
        }
      }
    }
  }
  components: {}
  operations: {}
  external: {}
}

// 创建类型安全的客户端
const api = createHTTPClient<SimpleApiTypes>({
  baseURL: "https://api.example.com"
})

// 使用示例
export async function simpleExample() {
  // 完全类型安全的 API 调用
  const hello = await api.get("/hello")
  console.log(hello.data.message) // 类型: string
  
  const user = await api.get("/users/{id}", {
    params: { id: 123 }
  })
  console.log(user.data.name) // 类型: string
}

// 与默认客户端对比
const defaultApi = createHTTPClient() // 使用自动生成的类型

export async function defaultExample() {
  // 使用自动生成的类型（向后兼容）
  const pets = await defaultApi.get("/pets/{id}", {
    params: { id: 1 }
  })
  
  return pets.data
}