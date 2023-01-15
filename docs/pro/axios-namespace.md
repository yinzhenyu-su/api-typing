# 使用 Axios 命名空间

## AxiosNamespace

### 用法

```typescript
import { AxiosNamespace } from "api-typing"

// 使用原生 AxiosNamespace 创建 httpClient
const { Axios } = AxiosNamespace

const httpClient = new Axios({
  baseURL: "",
})

httpClient.get("/v1/cat/1")
```
