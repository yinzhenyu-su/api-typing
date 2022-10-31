# 响应参数

## response

```ts
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `api-typing` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

## error

```ts
create.get("/pets").catch(function (error) {
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log(error.request)
  } else {
    // 发送请求时出了点问题
    console.log("Error", error.message)
  }
  console.log(error.config)
})
```

使用 `validateStatus` 配置选项，可以自定义抛出错误的 HTTP code。

```ts
create.get("/pets", {
  validateStatus: function (status) {
    return status < 500 // Resolve only if the status code is less than 500
  },
})
```

使用 `toJSON` 可以获取更多关于 HTTP 错误的信息。

```ts
create.get("/pets").catch(function (error) {
  console.log(error.toJSON())
})
```
