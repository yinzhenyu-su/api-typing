# Query 参数序列化

在发送 HTTP 请求时，我们经常需要在 URL 中包含查询参数。api-typing 使用 [qs](https://github.com/ljharb/qs) 库来序列化这些参数，并通过 `stringifyOptions` 提供了灵活的配置选项。

## 基本用法

`stringifyOptions` 可以在两个层级进行配置：

1. 全局配置：在创建客户端实例时设置
2. 请求级配置：在单个请求中设置

```ts
// 1. 全局配置
const client = createHTTPClient({
  stringifyOptions: {
    arrayFormat: "comma",
    encode: false,
  },
})

// 2. 请求级配置（优先级高于全局配置）
client.get("/api/users", {
  query: { ids: [1, 2, 3] },
  stringifyOptions: { arrayFormat: "comma" },
})
```

## 常用配置选项

### arrayFormat

控制数组参数的序列化格式。

```ts
// 1. brackets - 使用方括号
stringifyOptions: {
  arrayFormat: "brackets"
}
// ids=[1,2,3] => ids[]=1&ids[]=2&ids[]=3

// 2. comma - 使用逗号分隔
stringifyOptions: {
  arrayFormat: "comma"
}
// ids=[1,2,3] => ids=1,2,3

// 3. repeat - 重复参数名
stringifyOptions: {
  arrayFormat: "repeat"
}
// ids=[1,2,3] => ids=1&ids=2&ids=3

// 4. indices - 使用索引
stringifyOptions: {
  arrayFormat: "indices"
}
// ids=[1,2,3] => ids[0]=1&ids[1]=2&ids[2]=3
```

### encode

控制是否对参数值进行 URL 编码。

```ts
// 默认：true
stringifyOptions: {
  encode: true
}
// q=hello world => q=hello%20world

// 不编码
stringifyOptions: {
  encode: false
}
// q=hello world => q=hello world
```

### delimiter

自定义参数之间的分隔符。

```ts
stringifyOptions: {
  delimiter: ";"
}
// name=john&age=25 => name=john;age=25
```

### skipNulls

是否跳过值为 null 的参数。

```ts
stringifyOptions: {
  skipNulls: true
}
// name=john&age=null&city=beijing => name=john&city=beijing
```

### sort

自定义参数的排序方式。

```ts
stringifyOptions: {
  sort: (a, b) => a.localeCompare(b)
}
// c=3&a=1&b=2 => a=1&b=2&c=3
```

### serializeDate

自定义日期类型的序列化方式。

```ts
stringifyOptions: {
  serializeDate: (d: Date) => d.toISOString()
}
// date=2024-03-06T12:00:00.000Z
```

## 实际应用场景

### 1. RESTful API 查询

```ts
// GET /api/users?status=active&sort=name,age&fields=id,name,email
client.get("/api/users", {
  query: {
    status: "active",
    sort: ["name", "age"],
    fields: ["id", "name", "email"],
  },
  stringifyOptions: {
    arrayFormat: "comma",
    encode: false,
  },
})
```

### 2. 过滤条件

```ts
// GET /api/products?category=electronics&price[gte]=100&price[lte]=1000
client.get("/api/products", {
  query: {
    category: "electronics",
    price: {
      gte: 100,
      lte: 1000,
    },
  },
  stringifyOptions: {
    encode: false,
    allowDots: false,
  },
})
```

### 3. 分页查询

```ts
// GET /api/posts?page=1&pageSize=10&orderBy=createdAt&order=desc
client.get("/api/posts", {
  query: {
    page: 1,
    pageSize: 10,
    orderBy: "createdAt",
    order: "desc",
  },
})
```

## 注意事项

1. 请求级的 `stringifyOptions` 配置会覆盖全局配置
2. 某些特殊字符（如 `+`, `=`, `&`）在不同的 `encode` 设置下可能需要特别处理
3. 在处理复杂的嵌套对象时，建议使用 `allowDots` 或适当的 `arrayFormat` 配置
4. 对于特定的 API 要求，可能需要调整序列化配置以匹配后端期望的格式
