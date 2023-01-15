# 提取接口请求 body 参数类型

## ExtractRequestBodyJSON

### 用法

```ts
import type { ExtractRequestBodyJSON } from "api-typing"

// 通过请求方式和url提取请求body的类型
const requestBodyJSON: ExtractRequestBodyJSON<"post", "/v1/cat"> = {}
```
