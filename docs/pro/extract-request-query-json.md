# 提取请求路径参数类型

## ExtractParamQuery

### 用法

```ts
import type { ExtractParamQuery } from "api-typing"

// 通过请求方式和 url 提取请求路径的参数类型
// 假设原url为 /v1/cat?pageNo=1&pageSize=10, 请求方式为 get
// 则提取到的请求路径参数类型为 { pageNo: string, pageSize: string }
const requestQuery: ExtractParamQuery<"get", "/v1/cat"> = {}
```
