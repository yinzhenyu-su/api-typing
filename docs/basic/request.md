# 请求参数

## get

**params**

```ts
// 发送一个get请求 url为 `/v1/users/1`
create().get("/v1/users/{userId}", {
  params: { userId: "1" },
})
```

**query**

```ts
// 发送一个get请求 url为 `/v1/users?age=18`
create().get("/v1/users", {
  query: { age: 18 },
})
```

## post

```ts
// 发送一个 payload 为 { name: "lucky", tag: "husky" } 的post请求, 请求的url为 `/pets`
create().post("/pets", { name: "lucky", tag: "husky" })
```

## put

```ts
// 发送一个 payload 为 { name: "lucky", tag: "husky" } 的put请求, 请求的url为 `/pets/1`
create().put(
  "/pets/{petId}",
  { name: "lucky", tag: "husky" },
  { params: { petId: 1 } },
)
```

## patch

```ts
// 发送一个 payload 为 { name: "lucky" } 的patch请求, 请求的url为 `/pets/1`
create().patch("/pets/{petId}", { name: "lucky" }, { params: { petId: 1 } })
```

## delete

```ts
// 发送一个 delete 请求 url 为 `/pets`
create().delete("/pets")
```

## head

```ts
// 发送一个 head 请求 url 为 `/pets`
create().head("/pets")
```

## options

```ts
// 发送一个 options 请求 url 为 `/pets`
create().options("/pets")
```
