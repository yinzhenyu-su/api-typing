# 使用 ApiTypingMeta 自定义类型

## ApiTypingMeta

### 用法

```typescript
import type { ApiTypingMeta } from "api-typing"

// 这里为openapi中定义的所有模型类型
export type Meta = ApiTypingMeta["components"]["schemas"]
// 使用模型类型定义数据
const pet: Meta["Pet"] = { id: 1, name: "", tag: "" }
```
