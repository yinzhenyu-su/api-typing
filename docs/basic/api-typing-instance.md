# ApiTypingInstance

## 创建 ApiTypingInstance

```ts
import { createHTTPClient } from "api-typing"
// 调用createHTTPClient接口会创建ApiTypingInstance
// ApiTypingInstance 可以用来发送请求，设置当前请求参数等
const instance = createHTTPClient({
  // 可选配置项
  mock: false, // 是否开启 mock 模式
  mockBaseURL: "", // mock 接口的基础URL
  stringifyOptions: {
    // qs 序列化选项
    arrayFormat: "comma", // 数组格式化方式: brackets, repeat, comma
    encode: false, // 是否编码字符
    delimiter: "&", // 参数分隔符
    skipNulls: true, // 跳过 null 值
  },
  createNoTypeHTTPClient: false, // 是否创建无类型检查的 HTTP 客户端
})
```

## ApiTypingInstance 的属性和方法

### HTTP 请求方法

所有的请求方法都支持类型检查，会根据 OpenAPI 定义自动推导请求参数和响应类型。

#### get(url[, config])

发送 GET 请求

```ts
// 发送一个带路径参数的 GET 请求
const { data } = await instance.get("/users/{userId}", {
  params: { userId: "1" }, // 路径参数
})

// 发送一个带查询参数的 GET 请求
const { data } = await instance.get("/users", {
  query: { age: 18 }, // 查询参数
})
```

#### post(url[, data[, config]])

发送 POST 请求

```ts
// 发送一个带请求体的 POST 请求
const { data } = await instance.post("/pets", {
  name: "lucky",
  tag: "husky",
})
```

#### put(url[, data[, config]])

发送 PUT 请求

```ts
// 发送一个带路径参数和请求体的 PUT 请求
const { data } = await instance.put(
  "/pets/{petId}",
  { name: "lucky", tag: "husky" },
  { params: { petId: 1 } },
)
```

#### patch(url[, data[, config]])

发送 PATCH 请求

```ts
// 发送一个带路径参数和请求体的 PATCH 请求
const { data } = await instance.patch(
  "/pets/{petId}",
  { name: "lucky" },
  { params: { petId: 1 } },
)
```

#### delete(url[, data[, config]])

发送 DELETE 请求

```ts
// 发送一个带请求体的 DELETE 请求
const { data } = await instance.delete("/pets", { id: 1 })
```

#### head(url[, config])

发送 HEAD 请求

```ts
// 发送一个 HEAD 请求
const { headers } = await instance.head("/pets")
```

#### options(url[, config])

发送 OPTIONS 请求

```ts
// 发送一个 OPTIONS 请求
const { data } = await instance.options("/pets")
```

### 其他属性和方法

#### defaults

用于设置请求的默认配置

#### interceptors

请求和响应拦截器

#### cancelToken()

用于取消请求

```ts
// 取消请求示例
const source = instance.cancelToken()
source.cancel("取消请求")
```

#### globalStatus

全局请求状态管理器，可以获取当前正在进行的请求数量

#### noTypeHTTPClient

无类型检查的 HTTP 客户端实例，当不需要类型检查时可以使用此实例

## 类型继承

ApiTypingInstance 继承自 AxiosInstance，因此你可以使用所有 Axios 提供的功能。同时，ApiTypingInstance 增加了类型检查、请求参数验证等增强功能。
