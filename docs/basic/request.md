# 请求参数

api-typing 支持多种请求参数配置方式，包括路径参数、查询参数、请求体等。所有的请求参数都会经过类型检查，确保类型安全。

## 请求配置

所有的请求方法都支持一个可选的配置对象，包含以下主要配置项：

```ts
interface RequestConfig {
  // 路径参数，用于替换 URL 中的 {参数名} 占位符
  params?: Record<string, string | number>

  // 查询参数，会被序列化为 URL 查询字符串
  query?: Record<string, any>

  // 查询参数序列化选项
  stringifyOptions?: {
    arrayFormat?: "brackets" | "repeat" | "comma" // 数组格式化方式
    encode?: boolean // 是否编码字符
    delimiter?: string // 参数分隔符
    skipNulls?: boolean // 是否跳过 null 值
    sort?: (a: string, b: string) => number // 自定义排序
    serializeDate?: (d: Date) => string // 自定义日期序列化
  }

  // Mock 相关配置
  mock?: boolean // 是否启用 mock
  mockBaseURL?: string // mock 接口的基础 URL
}
```

## 路径参数 (params)

用于替换 URL 中的动态参数。

```ts
// 发送一个 GET 请求，URL 为 `/v1/users/1`
createHTTPClient().get("/v1/users/{userId}", {
  params: { userId: "1" },
})

// 发送一个 PUT 请求，URL 为 `/pets/1/toys/2`
createHTTPClient().put("/pets/{petId}/toys/{toyId}", data, {
  params: {
    petId: 1,
    toyId: 2,
  },
})
```

## 查询参数 (query)

用于构建 URL 查询字符串。

```ts
// 发送一个 GET 请求，URL 为 `/v1/users?age=18&type=normal`
createHTTPClient().get("/v1/users", {
  query: {
    age: 18,
    type: "normal",
  },
})

// 自定义查询参数序列化
createHTTPClient().get("/v1/users", {
  query: { tags: ["cat", "dog"] },
  stringifyOptions: {
    arrayFormat: "comma", // 结果：tags=cat,dog
  },
})
```

## 请求体 (data)

不同的请求方法支持不同的请求体格式。

### POST 请求

```ts
// 发送一个 POST 请求，payload 为 JSON 对象
createHTTPClient().post("/pets", {
  name: "lucky",
  tag: "husky",
})

// 发送一个带查询参数的 POST 请求
createHTTPClient().post("/pets", { name: "lucky" }, { query: { type: "dog" } })
```

### PUT 请求

```ts
// 发送一个 PUT 请求，同时包含路径参数和请求体
createHTTPClient().put(
  "/pets/{petId}",
  { name: "lucky", tag: "husky" },
  { params: { petId: 1 } },
)
```

### PATCH 请求

```ts
// 发送一个 PATCH 请求，用于部分更新资源
createHTTPClient().patch(
  "/pets/{petId}",
  { name: "lucky" },
  { params: { petId: 1 } },
)
```

### DELETE 请求

```ts
// 发送一个带请求体的 DELETE 请求
createHTTPClient().delete("/pets", { id: 1 })

// 发送一个带路径参数的 DELETE 请求
createHTTPClient().delete("/pets/{petId}", null, {
  params: { petId: 1 },
})
```

## 高级用法

### 组合使用多种参数

```ts
// 同时使用路径参数、查询参数和请求体
createHTTPClient().put(
  "/pets/{petId}/toys/{toyId}",
  { name: "ball", color: "red" },
  {
    params: { petId: 1, toyId: 2 },
    query: { validate: true },
    stringifyOptions: { skipNulls: true },
  },
)
```

### 类型安全

api-typing 会根据 OpenAPI 定义自动推导以下类型：

- 路径参数类型
- 查询参数类型
- 请求体类型
- 响应数据类型

这意味着在编写代码时，你会获得完整的类型提示和类型检查：

```ts
// 错误的参数类型会在编译时报错
createHTTPClient().post("/pets", {
  name: 123, // Error: 类型 'number' 不能赋值给类型 'string'
  tag: "husky",
})
```
