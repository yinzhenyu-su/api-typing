# 快速开始

## 安装

使用你喜欢的包管理器安装 api-typing：

```bash
pnpm i api-typing
npm i api-typing
yarn add api-typing
```

## 设置更新类型的脚本

在`package.json`的`scripts`字段中添加如下内容

```bash
"get-types": "get-types \"https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json\" \"./api-typing-meta.d.ts\""
```

> get-types 命令可以从远程或本地文件生成类型定义然后生成接口的类型定义文件, 类型定义文件默认会自动生成在项目根目录下

你的`package.json`整体预览解析

```json
{
  "scripts": {
    "get-types": "......"
  }
}
```

运行以下命令生成类型定义：

```bash
pnpm run get-types
```

### 3. 配置 TypeScript

确保生成的 `api-typing-meta.d.ts` 文件被包含在你的 `tsconfig.json` 中：

```json
{
  "include": ["api-typing-meta.d.ts"]
}
```

## 基本用法

### 创建实例

```typescript
import { createHTTPClient } from "api-typing"

const client = createHTTPClient({
  baseURL: "https://api.example.com",
  // 可选配置
  mock: false, // 是否启用 mock
  mockBaseURL: "", // mock 接口的基础 URL
  stringifyOptions: {
    // 查询参数序列化选项
    arrayFormat: "comma", // 数组格式化方式
    encode: false, // 是否编码字符
    delimiter: "&", // 参数分隔符
    skipNulls: true, // 跳过 null 值
  },
})
```

### 发送请求

api-typing 提供完整的类型提示和类型检查：

```typescript
// GET 请求
const { data } = await client.get("/users/{userId}", {
  params: { userId: "123" }, // 路径参数
  query: { include: ["profile"] }, // 查询参数
})

// POST 请求
const response = await client.post("/pets", {
  name: "Lucky",
  tag: "husky",
})

// PUT 请求
await client.put(
  "/pets/{petId}",
  { name: "Lucky", tag: "husky" }, // 请求体
  { params: { petId: 1 } }, // 配置参数
)

// DELETE 请求
await client.delete("/pets/{petId}", null, {
  params: { petId: 1 },
})
```

### 类型安全

api-typing 会自动检查：

- URL 路径参数类型
- 查询参数类型
- 请求体类型
- 响应数据类型

```typescript
// 错误的类型会在编译时被捕获
client.post("/pets", {
  name: 123, // ❌ 类型错误：期望 string 类型
  tag: "husky",
})
```

### 高级功能

#### 取消请求

```typescript
const source = client.cancelToken()
client.get("/long-operation", {
  cancelToken: source.token,
})

// 取消请求
source.cancel("操作已取消")
```

#### Mock 模式

```typescript
// 全局配置
const client = createHTTPClient({
  baseURL: "https://api.example.com",
  mockBaseURL: "https://mock.example.com",
  mock: false,
})

// 单个请求启用 mock
await client.get("/users", {
  mock: true, // 此请求将使用 mockBaseURL
})
```

#### 请求状态跟踪

```typescript
// 获取当前正在进行的请求数量
const activeRequests = client.globalStatus.getRequestCount()
```

## 下一步

- 查看[请求参数](../basic/request.md)文档了解更多请求配置选项
- 查看[响应处理](../basic/response.md)文档了解如何处理响应和错误
- 查看[Mock 切换](../pro/switch-mock.md)文档了解如何使用 Mock 功能
