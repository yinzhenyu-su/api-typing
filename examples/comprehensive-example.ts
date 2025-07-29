/**
 * 综合示例：展示 ApiTypingMeta 泛型支持的强大功能
 * 
 * 这个示例演示了如何：
 * 1. 定义自定义 API 类型
 * 2. 使用泛型创建类型安全的 HTTP 客户端
 * 3. 提取和复用类型定义
 * 4. 与现有代码保持兼容
 */

import { createHTTPClient, type ApiTyping } from "../src/index"
import type { 
  PathKeyOfMethod, 
  ExtractMethodResponseStatusContentJSON,
  Extract200JSON
} from "../src/api-helper"

// 1. 定义自定义 API 类型
interface UserApiTypes extends ApiTyping {
  paths: {
    "/users": {
      get: {
        parameters: {
          query?: {
            page?: number
            limit?: number
            search?: string
          }
        }
        responses: {
          200: {
            content: {
              "application/json": {
                users: Array<{
                  id: number
                  name: string
                  email: string
                  role: "admin" | "user"
                }>
                pagination: {
                  page: number
                  limit: number
                  total: number
                }
              }
            }
          }
        }
      }
      post: {
        parameters: {}
        requestBody: {
          content: {
            "application/json": {
              name: string
              email: string
              role: "admin" | "user"
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
                role: "admin" | "user"
                createdAt: string
              }
            }
          }
          400: {
            content: {
              "application/json": {
                error: string
                message: string
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
                email: string
                role: "admin" | "user"
                createdAt: string
                updatedAt: string
              }
            }
          }
          404: {
            content: {
              "application/json": {
                error: string
                message: string
              }
            }
          }
        }
      }
      put: {
        parameters: {
          path: { id: number }
        }
        requestBody: {
          content: {
            "application/json": {
              name?: string
              email?: string
              role?: "admin" | "user"
            }
          }
        }
        responses: {
          200: {
            content: {
              "application/json": {
                id: number
                name: string
                email: string
                role: "admin" | "user"
                updatedAt: string
              }
            }
          }
          404: {
            content: {
              "application/json": {
                error: string
                message: string
              }
            }
          }
        }
      }
      delete: {
        parameters: {
          path: { id: number }
        }
        responses: {
          204: {
            content?: never
          }
          404: {
            content: {
              "application/json": {
                error: string
                message: string
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
        role: "admin" | "user"
        createdAt: string
        updatedAt: string
      }
      UserCreateRequest: {
        name: string
        email: string
        role: "admin" | "user"
      }
      UserUpdateRequest: {
        name?: string
        email?: string
        role?: "admin" | "user"
      }
      UserListResponse: {
        users: Array<UserApiTypes["components"]["schemas"]["User"]>
        pagination: {
          page: number
          limit: number
          total: number
        }
      }
      ErrorResponse: {
        error: string
        message: string
      }
    }
  }
  operations: {}
  external: {}
}

// 2. 创建类型安全的 HTTP 客户端
export const userApiClient = createHTTPClient<UserApiTypes>({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
})

// 3. 类型提取和复用
export type UserApi = {
  // 提取所有模型类型
  schemas: UserApiTypes["components"]["schemas"]
  
  // 提取所有路径
  paths: PathKeyOfMethod<"get" | "post" | "put" | "delete", UserApiTypes>
  
  // 提取特定响应类型
  userListResponse: Extract200JSON<"get", "/users", UserApiTypes>
  userDetailResponse: Extract200JSON<"get", "/users/{id}", UserApiTypes>
  createUserResponse: ExtractMethodResponseStatusContentJSON<"post", 201, "/users", UserApiTypes>
  
  // 提取错误响应类型
  userNotFoundError: ExtractMethodResponseStatusContentJSON<"get", 404, "/users/{id}", UserApiTypes>
  createUserError: ExtractMethodResponseStatusContentJSON<"post", 400, "/users", UserApiTypes>
}

// 4. 实际使用示例
export class UserService {
  constructor(private client = userApiClient) {}

  async getUsers(options?: { page?: number; limit?: number; search?: string }) {
    const response = await this.client.get("/users", {
      query: options
    })
    
    // response.data 是完全类型安全的
    return response.data // 类型: UserApi["userListResponse"]
  }

  async getUserById(id: number) {
    try {
      const response = await this.client.get("/users/{id}", {
        params: { id }
      })
      
      return response.data // 类型: UserApi["userDetailResponse"]
    } catch (error) {
      // 处理 404 错误
      throw error
    }
  }

  async createUser(userData: UserApi["schemas"]["UserCreateRequest"]) {
    try {
      const response = await this.client.post("/users", userData)
      
      return response.data // 类型: UserApi["createUserResponse"]
    } catch (error) {
      // 处理 400 错误
      throw error
    }
  }

  async updateUser(id: number, updates: UserApi["schemas"]["UserUpdateRequest"]) {
    const response = await this.client.put("/users/{id}", updates, {
      params: { id }
    })
    
    return response.data
  }

  async deleteUser(id: number) {
    await this.client.delete<"/users/{id}", 204>("/users/{id}", {
      params: { id },
      __is_config: true
    })
    
    // 204 响应没有 body，所以没有返回值
  }
}

// 5. 向后兼容性示例
// 现有代码无需更改就能继续工作
const defaultClient = createHTTPClient({
  baseURL: "https://api.example.com"
})

// 这些调用与之前完全相同
export async function legacyApiCall() {
  // 使用自动生成的类型
  const pets = await defaultClient.get("/pets/{id}", {
    params: { id: 1 }
  })
  
  return pets.data
}

// 6. 类型验证和智能提示
export function demonstrateTypesSafety() {
  const service = new UserService()
  
  // 完全的类型检查和智能提示
  service.createUser({
    name: "John Doe",
    email: "john@example.com",
    role: "admin" // 只允许 "admin" | "user"
  })
  
  service.updateUser(1, {
    name: "Jane Doe" // 所有字段都是可选的
  })
  
  // TypeScript 会在编译时捕获错误
  // service.createUser({
  //   name: "Invalid",
  //   email: "invalid@example.com",
  //   role: "invalid_role" // ❌ 编译错误：不是有效的角色
  // })
}

// 7. 类型导出，供其他模块使用
export type {
  UserApiTypes,
  UserApi
}

export type User = UserApi["schemas"]["User"]
export type UserCreateRequest = UserApi["schemas"]["UserCreateRequest"]
export type UserUpdateRequest = UserApi["schemas"]["UserUpdateRequest"]
export type ErrorResponse = UserApi["schemas"]["ErrorResponse"]