# 提取请求路径参数类型

## ExtractParamPath

### 用法

```ts
import type { ExtractParamPath } from "api-typing"

// 通过请求方式和 url 提取请求路径的参数类型
// 假设原url为 /v1/cat/{catId}, 请求方式为 put
// 则提取到的请求路径参数类型为 { catId: string }
const requestParams: ExtractParamPath<"put", "/v1/cat"> = {}
```
