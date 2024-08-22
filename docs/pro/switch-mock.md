# 切换 mock

## Mock

### 用法

```typescript
import { createHTTPClient } from "api-typing"

const httpClient = createHTTPClient({
  baseURL: "https://base/url",
  mockBaseURL: "https://mock/base/url",
  mock: false, // 如果这里设置为 true 则所有请求都会切换到 mockBaseURL，默认为false
})

// 当请求 /pet 时，会切换到 https://mock/base/url
httpClient.post(
  "/pet",
  { name: "happy", tag: "husky" },
  {
    mock: true, // 这里会覆盖全局的 mock 切换状态
  },
)
```
