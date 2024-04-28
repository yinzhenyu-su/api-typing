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

export type PathKeyUnion =
  | PathKeyOfMethod<"get">
  | PathKeyOfMethod<"post">
  | PathKeyOfMethod<"put">
  | PathKeyOfMethod<"delete">
  | PathKeyOfMethod<"patch">
  | PathKeyOfMethod<"head">
  | PathKeyOfMethod<"options">

type A<T extends PathKeyUnion> = Paths[T]

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

// ---------------------- request body start ----------------------
/**
 * 根据 url 和 method 提取 request body 数据类型
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
 * 根据 method 和 url 提取 requestBody JSON 数据类型和 form 数据类型
 * get, head, options 方法没有requestBody
 */
export type ExtractRequestBodyJSON<
  T extends Exclude<Method, "get" | "head" | "options">,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodRequestBodyContentJSONOrForm<T, R>
// ---------------------- request body end ----------------------

type ExtractMethodResponse<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethod<T, R>[Extract<keyof ExtractMethod<T, R>, "responses">]

// ---------------------- status response start ----------------------
type StatusOfPathKeyOfMethod<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = Extract<keyof ExtractMethodResponse<T, R>, number>

type ExtractMethodResponseStatus<
  T extends Method,
  R extends PathKeyOfMethod<T>,
  S extends StatusOfPathKeyOfMethod<T, R>,
> = ExtractMethodResponse<T, R>[S]

type ExtractMethodResponseStatusContent<
  T extends Method,
  R extends PathKeyOfMethod<T>,
  S extends StatusOfPathKeyOfMethod<T, R>,
> = ExtractMethodResponseStatus<T, R, S>[Extract<
  keyof ExtractMethodResponseStatus<T, R, S>,
  "content"
>]

/**
 * 根据 method 和 url 以及状态码提取响应JSON数据类型
 */
export type ExtractMethodResponseStatusContentJSON<
  T extends Method,
  R extends PathKeyOfMethod<T>,
  S extends StatusOfPathKeyOfMethod<T, R>,
> = ExtractMethodResponseStatusContent<T, R, S>[Extract<
  keyof ExtractMethodResponseStatusContent<T, R, S>,
  "application/json"
>]

// ---------------------- status response end ----------------------

// ---------------------- 200 response start ----------------------
type ExtractMethodResponse200<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodResponse<T, R>[Extract<keyof ExtractMethodResponse<T, R>, 200>]

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
 * 根据 method 和 url 提取200响应JSON数据
 */
export type Extract200JSON<
  T extends Method,
  R extends PathKeyOfMethod<T>,
> = ExtractMethodResponse200ContentJSON<T, R>
// ------------------------ 200 response end ------------------------

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
