# 使用 ApiTypingMeta 自定义类型

## ApiTypingMeta

ApiTypingMeta 现在支持泛型，提供了更强大的类型自定义能力。

### 基础用法

```typescript
import type { ApiTypingMeta } from "api-typing"

// 这里为openapi中定义的所有模型类型
export type Meta = ApiTypingMeta["components"]["schemas"]
// 使用模型类型定义数据
const pet: Meta["Pet"] = { id: 1, name: "", tag: "" }
```

### 泛型支持

从 v1.17.0 开始，ApiTypingMeta 支持泛型参数，允许您定义自定义的 API 类型：

```typescript
import { createHTTPClient, type ApiTyping } from "api-typing"

// 定义自定义 API 类型
interface CustomApiTypes extends ApiTyping {
  paths: {
    "/custom/{id}": {
      get: {
        parameters: { path: { id: string } }
        responses: {
          200: {
            content: {
              "application/json": { id: string; name: string }
            }
          }
        }
      }
    }
  }
  components: {
    schemas: {
      CustomModel: { id: string; name: string }
    }
  }
  operations: {}
  external: {}
}

// 使用自定义类型创建客户端
const customClient = createHTTPClient<CustomApiTypes>()

// 提取自定义类型
export type CustomMeta = CustomApiTypes["components"]["schemas"]
const customModel: CustomMeta["CustomModel"] = { id: "1", name: "example" }
```

了解更多关于泛型支持的详细信息，请参阅 [泛型支持指南](./generic-support.md)。
