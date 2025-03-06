# 简介

## 什么是 Api-Typing？

Api-Typing 是一个基于 axios 的类型安全的 HTTP 请求框架，专注于提供完整的 TypeScript 类型支持。它能够自动从 OpenAPI 规范中生成类型定义，为接口调用提供端到端的类型安全保障，包括：

- URL 路径参数的类型检查
- 请求参数（Query Parameters）的类型提示
- 请求体（Request Body）的类型校验
- 响应数据（Response）的类型推导

## 为什么选择 Api-Typing？

在前端开发中，API 接口对接是一个既重要又容易出错的环节。常见的问题包括：

- 接口 URL 拼写错误
- 请求参数类型不匹配
- 响应数据结构理解偏差
- 后端接口变更未能及时同步
- 缺乏类型提示导致的开发效率低下

Api-Typing 正是为解决这些问题而生。如果你的项目已经有了 Swagger/OpenAPI 文档，Api-Typing 可以：

1. 自动生成完整的 TypeScript 类型定义
2. 在开发时提供实时的类型检查和提示
3. 在编译阶段发现潜在的类型错误
4. 减少运行时错误，提高代码质量

## 核心特性

- 🔒 完整的类型安全：URL、请求参数、响应数据的端到端类型保护
- 🔄 与 axios 高度兼容：复用你现有的 axios 配置和拦截器
- 🚀 开发体验优先：智能的 IDE 提示和自动补全
- 📚 基于 OpenAPI：支持从 Swagger/OpenAPI 规范自动生成类型
- 🛠 灵活的配置：支持自定义序列化、Mock 数据等高级特性

## 快速上手

```typescript
import { createHTTPClient } from "api-typing"

// 创建类型安全的 HTTP 客户端
const client = createHTTPClient()

// 获得完整的类型提示和检查
const response = await client.get("/users/{userId}", {
  params: { userId: "123" },
  query: { include: ["profile", "posts"] },
})
```

## 设计理念

Api-Typing 的核心理念是"让接口调用更安全、更高效"。通过将 OpenAPI 规范与 TypeScript 的类型系统紧密结合，我们实现了：

- 开发时的即时反馈
- 编译时的类型检查

这种多层次的保护机制能够显著提升开发效率和代码质量。
