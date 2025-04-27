# api-typing

[![npm version](https://badgen.net/npm/v/api-typing)](https://npm.im/api-typing)

## ![api-typing](https://github.com/yinzhenyu-su/api-typing/blob/main/api-typing.gif?raw=true)

---

[English](./README.md) | 简体中文 | [DeepWiki](https://deepwiki.com/yinzhenyu-su/api-typing)

## 一个强类型提示的 http 客户端(基于 axios)。

亲爱的前端同事们，你是否受够了和后端每天不断地对接口，调整接口路径和传参格式？是否疲于查看后端的回参文档？是否疲于人肉查看同步每次更新后的接口字段变更？是时候让这些工作更加简单轻松一点了。

通过 `api-typing` 只要一些简单的配置，就可以让你的接口及时同步后端更新，并且拥有丝滑的传参和回参提示，甚至还有后端的字段注释也可以展示。还等什么呢，让我们开始吧。

## 快速上手

### 安装 api-typing

```bash
pnpm i api-typing
```

### 设置更新类型的脚本

在`package.json`的`scripts`字段中添加如下内容

```bash
"get-types": "get-types \"https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json\" \"./api-typing-meta.d.ts\""
```

你的`package.json`整体预览解析

```json
{
  "name": "api-typing",
  "version": "0.1.1",
  "description": "Axios based HTTP client with type hint",
  "scripts": {
    "get-types": "get-types @arg1 @arg2"
  },
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}
```

| 脚本参数                                 | 类型                        | 必须 | 默认值               |
| ---------------------------------------- | --------------------------- | ---- | -------------------- |
| @arg1(你项目的 openapi 的 json 导出地址) | string (http 或 https 链接) | 是   | 无                   |
| @arg2(生成的 ts 类型文件名)              | string                      | 否   | api-typing-meta.d.ts |

注意这里的`@arg1` 和`@arg2` 都要使用`""`包裹起来，两个参数中间是有空格的。

这里提供两种常用的 openapi json`(@arg1)` 文档的地址获取方式

1. 如果后端项目用了 swagger 可以在 swagger-ui 的页面中找到

2. 如果项目用的 apifox 则 openapi 的导出路径打开方式为`项目设置` > `导出数据` > `打开URL`

   ​ ![apifox export openapi](https://github.com/yinzhenyu-su/api-typing/blob/main/apifox-openapi.png?raw=true")

### 执行 get-types

在终端中运行以下命令

```bash
pnpm run get-types
```

然后检查项目的根目录有没有生成 api-typing-meta.d.ts，如果没有请检查上一步是否出错。

### 配置 tsconfig.json

确保 api-typing-meta.d.ts 在根目录成功生成后，将该文件添加到 tsconfig.json 的 **include** 字段中

**tsconfig.json**

```json
{
  "include": ["api-typing-meta.d.ts"]
}
```

### 开始使用吧

```typescript
import { createHTTPClient } from "api-typing"
// 这里createHTTPClient生成的是继承自 axios instance 的实例，你可以像使用axios一样添加你自己的interceptor
createHTTPClient({ baseURL: "your baseURL" })
  // post 的 url无需手动填写，会根据你的项目自动提示可用的url，其他的请求方式同理
  .post("choose/url/with/hint", {
    /**
     * 入参也会自动提示
     */
  })
  .then((d) => {
    /**
     * 这里的d同样继承自axiosresponse，d.data为接口返回的数据
     */
  })
```
