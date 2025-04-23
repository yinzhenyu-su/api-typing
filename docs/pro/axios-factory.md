# 使用 axiosFactory 扩展 axios 实例

## 介绍

`axiosFactory` 是 `createHTTPClient` 的一个配置项，允许用户自定义扩展 axios 实例。
例如，使用 `axios-cache-interceptor` 来实现请求缓存。

> `axios-cache-interceptor` 是一个用于 axios 的缓存拦截器，允许你在请求和响应之间缓存数据，以提高性能和减少网络请求。
> 它提供了一个简单的 API 来配置缓存策略、缓存存储和缓存失效时间。

## 安装

```bash
npm install axios-cache-interceptor
```

## 使用

在 `createHTTPClient` 中的 `axiosFactory` 中使用 `setupCache` 方法来创建缓存实例。

```ts
import { createHTTPClient } from "api-typing"
import { setupCache } from "axios-cache-interceptor"
const client = createHTTPClient({
  baseURL: "http://your-base-url.com",
  mockBaseURL: "http://127.0.0.1:4523/m1/4077180-0-default",
  mock: false,
  createNoTypeHTTPClient: true,
  // 全局配置 query 的编码方式，like { a: 1, b: [1, 2] } => a=1&b=1,b=2
  stringifyOptions: { arrayFormat: "comma", encode: false },
  // 自定义扩展 axios 实例
  axiosFactory: (axios) => {
    return setupCache(axios, {
      // 允许缓存的请求方法
      methods: ["get", "post", "head"],
      // 自定义缓存方法
      headerInterpreter: (header, location) => {
        return {
          // 数据缓存时间 ms
          cache: 1000 * 2,
          // 缓存失效时间 ms
          stale: 1000,
        }
      },
    })
  },
})
```

## 参考

- [axios-cache-interceptor](https://axios-cache-interceptor.js.org/guide/getting-started)
