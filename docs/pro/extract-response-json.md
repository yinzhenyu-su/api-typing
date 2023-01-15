# 提取接口响应参数类型

## Extract200JSON

### 用法

```ts
import type { Extract200JSON } from "api-typing"

// 通过请求方式和url提取 http status code 为 200 的响应参数的类型
const responseSuccess: Extract200JSON<"post", "/v1/cat"> = {}
```
