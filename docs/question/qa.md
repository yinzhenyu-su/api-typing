# 问题解答

## 如何解决 query 参数对数组编码的问题？

api-typing 在对 `query` 参数编码时使用了 `qs` 库，所以解决此问题的方式和`qs`库一致,在请求参数中添加 `stringifyOptions` 参数即可

```typescript
createHTTPClient({ query: { ids: [1, 2, 3] } })
// 编码后的query
// "ids%5B0%5D=1&ids%5B1%5D=2&ids%5B2%5D=3"

createHTTPClient({
  query: { ids: [1, 2, 3] },
  stringifyOptions: { arrayFormat: "comma", encode: false },
})
// 未编码的query
// "ids=1,2,3"
```
