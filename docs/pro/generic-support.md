# 使用 ApiTypingMeta 泛型支持

## 概述

API-Typing 现在支持泛型，允许用户自定义 API 类型定义，而不必依赖自动生成的类型文件。这为开发者提供了更大的灵活性，可以：

1. 使用自定义 API 类型定义
2. 覆盖或扩展默认的 ApiTypingMeta 接口
3. 支持多个 API 模式定义
4. 更容易地重新定义接口类型

## 基本用法

### 使用默认类型（向后兼容）

```typescript
import { createHTTPClient } from 'api-typing'

// 使用默认的 ApiTypingMeta，与之前完全相同
const client = createHTTPClient({
  baseURL: 'https://api.example.com'
})

// 所有现有代码继续正常工作
const response = await client.get('/pets/{id}', {
  params: { id: 1 }
})
```

### 使用自定义 API 类型

```typescript
import { createHTTPClient, type ApiTyping } from 'api-typing'

// 定义自定义 API 类型
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

// 创建使用自定义类型的客户端
const customClient = createHTTPClient<CustomApiTypes>({
  baseURL: 'https://api.example.com'
})

// 现在拥有完全的类型安全
const user = await customClient.get('/users/{id}', {
  params: { id: 123 },
  query: { include: 'profile' }
})
// user.data 的类型为: { id: number; name: string; email: string }

const newUser = await customClient.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
// newUser.data 的类型为: { id: number; name: string; email: string }
```

## 高级用法

### 扩展现有 API 类型

如果您有自动生成的类型文件，也可以扩展它们：

```typescript
import { createHTTPClient } from 'api-typing'
import type { ApiTypingMeta } from 'api-typing'

// 扩展默认的 ApiTypingMeta
interface ExtendedApiTypes extends ApiTypingMeta {
  paths: ApiTypingMeta['paths'] & {
    "/custom/endpoint": {
      get: {
        parameters: {}
        responses: {
          200: {
            content: {
              "application/json": {
                customData: string
              }
            }
          }
        }
      }
    }
  }
}

const extendedClient = createHTTPClient<ExtendedApiTypes>()
```

### 组合多个 API 定义

```typescript
interface ApiA extends ApiTyping {
  paths: {
    "/api-a/resource": {
      get: {
        parameters: {}
        responses: {
          200: {
            content: { "application/json": { dataA: string } }
          }
        }
      }
    }
  }
  components: {}
  operations: {}
  external: {}
}

interface ApiB extends ApiTyping {
  paths: {
    "/api-b/resource": {
      get: {
        parameters: {}
        responses: {
          200: {
            content: { "application/json": { dataB: number } }
          }
        }
      }
    }
  }
  components: {}
  operations: {}
  external: {}
}

// 组合多个 API
interface CombinedApi extends ApiTyping {
  paths: ApiA['paths'] & ApiB['paths']
  components: ApiA['components'] & ApiB['components']
  operations: ApiA['operations'] & ApiB['operations']
  external: ApiA['external'] & ApiB['external']
}

const combinedClient = createHTTPClient<CombinedApi>()
```

## 类型提取工具

所有现有的类型提取工具都支持泛型参数：

```typescript
import type {
  PathKeyOfMethod,
  ExtractMethodResponseStatusContentJSON,
  Extract200JSON,
  GetArgs,
  PostArgs
} from 'api-typing'

// 使用自定义类型提取路径
type GetPaths = PathKeyOfMethod<'get', CustomApiTypes>
// 结果: "/users/{id}"

// 提取响应类型
type UserResponse = ExtractMethodResponseStatusContentJSON<
  'get',
  200,
  '/users/{id}',
  CustomApiTypes
>
// 结果: { id: number; name: string; email: string }

// 提取请求参数类型
type GetUserArgs = GetArgs<'/users/{id}', CustomApiTypes>
// 结果: ["/users/{id}", { params: { id: number }; query?: { include?: string } }]
```

## 迁移指南

### 从现有代码迁移

如果您已经在使用 API-Typing，无需任何更改。所有现有代码将继续工作，因为泛型类型有默认值。

### 逐步采用自定义类型

1. **开始时**：继续使用默认类型
2. **逐步添加**：为新的 API 端点定义自定义类型
3. **完全自定义**：定义完整的自定义 API 类型

```typescript
// 阶段 1: 默认类型
const client = createHTTPClient()

// 阶段 2: 混合使用
interface PartialCustom extends ApiTypingMeta {
  paths: ApiTypingMeta['paths'] & {
    // 添加新的自定义端点
    "/new-endpoint": { /* ... */ }
  }
}

// 阶段 3: 完全自定义
interface FullyCustom extends ApiTyping {
  // 完全自定义的类型定义
}
```

## 最佳实践

1. **类型文件组织**：将自定义类型定义放在单独的文件中
2. **渐进式采用**：从小的自定义开始，逐步扩展
3. **类型复用**：使用 TypeScript 的类型操作符来复用和组合类型
4. **文档化**：为自定义类型添加注释和文档

```typescript
// types/api.ts
export interface MyApiTypes extends ApiTyping {
  paths: {
    // 详细的类型定义和注释
  }
  components: {
    schemas: {
      // 可复用的模型定义
    }
  }
  operations: {}
  external: {}
}

// client.ts
import type { MyApiTypes } from './types/api'
import { createHTTPClient } from 'api-typing'

export const apiClient = createHTTPClient<MyApiTypes>({
  baseURL: process.env.API_BASE_URL
})
```

通过这种方式，API-Typing 提供了强大的类型系统，既保持了向后兼容性，又为复杂的使用场景提供了灵活性。