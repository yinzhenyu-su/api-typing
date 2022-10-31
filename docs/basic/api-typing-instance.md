# ApiTypingInstance

## 创建 ApiTypingInstance

```ts
import { create } from "api-typing"
// 调用create接口会创建ApiTypingInstance
// ApiTypingInstance 可以用来发送请求，设置当前请求参数等
const instance = create()
```

## ApiTypingInstance 的属性和方法

instance#get(url[, config])

instance#delete(url[, config])

instance#head(url[, config])

instance#options(url[, config])

instance#post(url[, data[, config]])

instance#put(url[, data[, config]])

instance#patch(url[, data[, config]])

instance#defaults

instance#interceptors

instance#cancelToken()

如果你用过 axios 就会发现这里的属性和方法与 axios 非常相似，实际上这就是继承自 AxiosInstance 的。
