interface ApiTyping {
  paths: {}
  components: {}
  operations: {}
  external: {}
}

export declare interface ApiTypingMeta extends ApiTyping {}

type paths = ApiTypingMeta["paths"]
type components = ApiTypingMeta["components"]
type operations = ApiTypingMeta["operations"]
type external = ApiTypingMeta["external"]

type Paths<T = paths> = T

type Components<T = components> = T

type Operations<T = operations> = T

type External<T = external> = T

/**
 * 根据 http method 获取对应的urlkey
 */
export type PathKeyOfMethod<R extends Method> = {
  [Key in keyof Paths]: Paths[Key] extends {
    // eslint-disable-next-line no-unused-vars
    [k in R]: any
  }
    ? Key
    : never
}[keyof Paths]

type PathKeyUnion =
  | PathKeyOfMethod<"get">
  | PathKeyOfMethod<"post">
  | PathKeyOfMethod<"put">
  | PathKeyOfMethod<"delete">
  | PathKeyOfMethod<"patch">
  | PathKeyOfMethod<"head">
  | PathKeyOfMethod<"options">

/**
 * 从urlkey 中选定一个url
 */
type PathKey<T extends Method, R extends PathKeyOfMethod<T>> = Extract<
  PathKeyOfMethod<T>,
  R
>

type A<T extends PathKeyUnion> = Paths[T]

type Get<T extends PathKeyUnion> = Extract<keyof A<T>, "get">
type Post<T extends PathKeyUnion> = Extract<keyof A<T>, "post">
type Put<T extends PathKeyUnion> = Extract<keyof A<T>, "put">
type Patch<T extends PathKeyUnion> = Extract<keyof A<T>, "patch">
type Delete<T extends PathKeyUnion> = Extract<keyof A<T>, "delete">
type Head<T extends PathKeyUnion> = Extract<keyof A<T>, "head">
type Options<T extends PathKeyUnion> = Extract<keyof A<T>, "options">

export type Method =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options"

// 根据 method 获取url
type ExtractMethod<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = A<R>[Extract<keyof A<R>, T>]

/**
 *
 */
type ExtractMethodParam<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethod<T, R>[Extract<keyof ExtractMethod<T, R>, "parameters">]

/**
 * 根据 url 和 http method 提取request path 传参
 */
export type ExtractParamPath<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodParam<T, R>[Extract<keyof ExtractMethodParam<T, R>, "path">]

/**
 * 根据 url 和 http method 提取request query 传参
 */
export type ExtractParamQuery<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodParam<T, R>[Extract<keyof ExtractMethodParam<T, R>, "query">]

/**
 * 根据 url 和 http method 提取request body 传参
 */
export type ExtractMethodRequestBody<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethod<T, R>[Extract<keyof ExtractMethod<T, R>, "requestBody">]

export type ExtractMethodRequestBodyContent<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExcludeUndefinedExtractMethodRequestBody<T, R>[Extract<
  keyof ExcludeUndefinedExtractMethodRequestBody<T, R>,
  "content"
>]

type ExcludeUndefinedExtractMethodRequestBody<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = Exclude<ExtractMethodRequestBody<T, R>, undefined>

export type ExtractMethodRequestBodyContentJSONOrForm<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodRequestBodyContent<T, R>[Extract<
  keyof ExtractMethodRequestBodyContent<T, R>,
  "application/json" | "multipart/form-data"
>]

/**
 * 根据http method 和 url 提取requestBody json
 */
export type ExtractRequestBodyJSON<
  T extends Exclude<Method, "get" | "head" | "options">,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodRequestBodyContentJSONOrForm<T, R>

type ExtractMethodResponse<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethod<T, R>[Extract<keyof ExtractMethod<T, R>, "responses">]

export type ExtractMethodResponseAuto<
  M extends Method,
  R extends PathKeyOfMethod<M>,
> = ExtractMethodResponse<M, R>[Extract<
  keyof ExtractMethodResponse<M, R>,
  "default"
>]

// TODO 根据response code获取对应数据
type ExtractMethodResponse200<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodResponse<T, R>[Extract<keyof ExtractMethodResponse<T, R>, 200>]

// type StatusCode = 200 | 201 | 304 | 401 | 403 | 500 | 502 | 'default'
// type ExtractStatusCode<T extends Method, R extends PathKeyOfMethod<T>> = Extract<keyof ExtractMethodResponse<T, R>, StatusCode> extends never ? never : Extract<keyof ExtractMethodResponse<T, R>, StatusCode>

// type B<T extends Method, R extends PathKeyOfMethod<T>> = ExtractMethodResponse<T, R>[Extract<keyof ExtractMethodResponse<T, R>, ExtractStatusCode<T, R>>]

type ExtractMethodResponse200Content<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodResponse200<T, R>[Extract<
  keyof ExtractMethodResponse200<T, R>,
  "content"
>]

type ExtractMethodResponse200ContentJSON<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodResponse200Content<T, R>[Extract<
  keyof ExtractMethodResponse200Content<T, R>,
  "application/json"
>]

/**
 * 根据 http method 和 url 提取200响应JSON数据
 */
export type Extract200JSON<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodResponse200ContentJSON<T, R>

/**
 * 提取required字段
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K
}[keyof T]

/**
 * 判断是否有必填字段
 */
export type HasRequiredField<T> = RequiredKeys<T> extends never ? false : true

/**
 * omit by type
 */
type OmitByType<T, U> = {
  [k in keyof T as T[k] extends U ? never : k]: T[k]
}
