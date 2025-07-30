interface ApiTyping {
  paths: Record<string, any>
  components: Record<string, any>
  operations: Record<string, any>
  external: Record<string, any>
}

export type { ApiTyping }

// Default ApiTypingMeta interface (for backward compatibility)
export declare interface ApiTypingMeta extends ApiTyping {}

type Paths<T extends ApiTyping = ApiTypingMeta> = T["paths"]

/**
 * 根据 http method 获取对应的urlkey
 */
export type PathKeyOfMethod<
  R extends Method,
  T extends ApiTyping = ApiTypingMeta,
> = {
  [Key in keyof Paths<T>]: Paths<T>[Key] extends {
    // eslint-disable-next-line no-unused-vars
    [k in R]: any
  }
    ? Key
    : never
}[keyof Paths<T>]

/**
 * 定义有效HTTP方法的类型，这些方法基于PathKeyOfMethod泛型函数的返回值来决定是否包含某个方法
 * @example
 * ```
 * type ValidMethods = "get" | "post" | "put" | "delete" | "patch" | "head" | "options"
 * ```
 */
export type ValidMethods<T extends ApiTyping = ApiTypingMeta> =
  | (PathKeyOfMethod<"get", T> extends never ? never : "get")
  | (PathKeyOfMethod<"post", T> extends never ? never : "post")
  | (PathKeyOfMethod<"put", T> extends never ? never : "put")
  | (PathKeyOfMethod<"delete", T> extends never ? never : "delete")
  | (PathKeyOfMethod<"patch", T> extends never ? never : "patch")
  | (PathKeyOfMethod<"head", T> extends never ? never : "head")
  | (PathKeyOfMethod<"options", T> extends never ? never : "options")

export type PathKeyUnion<T extends ApiTyping = ApiTypingMeta> =
  | PathKeyOfMethod<"get", T>
  | PathKeyOfMethod<"post", T>
  | PathKeyOfMethod<"put", T>
  | PathKeyOfMethod<"delete", T>
  | PathKeyOfMethod<"patch", T>
  | PathKeyOfMethod<"head", T>
  | PathKeyOfMethod<"options", T>

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
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = Paths<T>[R][Extract<keyof Paths<T>[R], M>]

// 定义一个类型 ExtractMethodParam，用于从给定的方法类型 T 中提取特定路径键 R 对应的参数类型
type ExtractMethodParam<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethod<M, R, T>[Extract<keyof ExtractMethod<M, R, T>, "parameters">]

/**
 * 根据 url 和 http method 提取request path 传参
 */
export type ExtractParamPath<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodParam<M, R, T>[Extract<
  keyof ExtractMethodParam<M, R, T>,
  "path"
>]

/**
 * 根据 url 和 http method 提取request query 传参
 */
export type ExtractParamQuery<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodParam<M, R, T>[Extract<
  keyof ExtractMethodParam<M, R, T>,
  "query"
>]

// ---------------------- request body start ----------------------
/**
 * 根据 url 和 method 提取 request body 数据类型
 */
export type ExtractMethodRequestBody<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethod<M, R, T>[Extract<keyof ExtractMethod<M, R, T>, "requestBody">]

export type ExtractMethodRequestBodyContent<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExcludeUndefinedExtractMethodRequestBody<M, R, T>[Extract<
  keyof ExcludeUndefinedExtractMethodRequestBody<M, R, T>,
  "content"
>]

type ExcludeUndefinedExtractMethodRequestBody<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = Exclude<ExtractMethodRequestBody<M, R, T>, undefined>

/**
 * 根据 method 和 url 提取 requestBody JSON 数据类型和 form 数据类型
 */
export type ExtractMethodRequestBodyContentJSONOrForm<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodRequestBodyContent<M, R, T>[Extract<
  keyof ExtractMethodRequestBodyContent<M, R, T>,
  "application/json" | "multipart/form-data"
>]

/**
 * 根据 method 和 url 提取 requestBody JSON 数据类型和 form 数据类型
 * get, head, options 方法没有requestBody
 */
export type ExtractRequestBodyJSON<
  M extends Exclude<Method, "get" | "head" | "options">,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodRequestBodyContentJSONOrForm<M, R, T>
// ---------------------- request body end ----------------------

type ExtractMethodResponse<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethod<M, R, T>[Extract<keyof ExtractMethod<M, R, T>, "responses">]

// ---------------------- status response start ----------------------
/**
 * 根据 method 和 url 以及状态码提取响应数据类型
 */
export type StatusOfPathKeyOfMethod<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = Extract<keyof ExtractMethodResponse<M, R, T>, number | string>

type ExtractMethodResponseStatus<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  S extends StatusOfPathKeyOfMethod<M, R, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodResponse<M, R, T>[S]

type ExtractMethodResponseStatusContent<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  S extends StatusOfPathKeyOfMethod<M, R, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodResponseStatus<M, R, S, T>[Extract<
  keyof ExtractMethodResponseStatus<M, R, S, T>,
  "content"
>]

/**
 * 根据 method 和 url 以及状态码提取响应JSON数据类型
 */
export type ExtractMethodResponseStatusContentJSON<
  M extends Method,
  S extends StatusOfPathKeyOfMethod<M, R, T>,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodResponseStatusContent<M, R, S, T>[Extract<
  keyof ExtractMethodResponseStatusContent<M, R, S, T>,
  "application/json"
>]

/**
 * 根据 method 和 url 以及状态码提取响应JSON数据类型
 */
export type D<
  M extends Method,
  S extends StatusOfPathKeyOfMethod<M, R, T>,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodResponseStatusContent<M, R, S, T>[Extract<
  keyof ExtractMethodResponseStatusContent<M, R, S, T>,
  "application/json"
>]

// ---------------------- status response end ----------------------

// ---------------------- 200 response start ----------------------
type ExtractMethodResponse200<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodResponse<M, R, T>[Extract<
  keyof ExtractMethodResponse<M, R, T>,
  200
>]

type ExtractMethodResponse200Content<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodResponse200<M, R, T>[Extract<
  keyof ExtractMethodResponse200<M, R, T>,
  "content"
>]

type ExtractMethodResponse200ContentJSON<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodResponse200Content<M, R, T>[Extract<
  keyof ExtractMethodResponse200Content<M, R, T>,
  "application/json"
>]

/**
 * 根据 method 和 url 提取200响应JSON数据类型
 */
export type Extract200JSON<
  M extends Method,
  R extends PathKeyOfMethod<M, T>,
  T extends ApiTyping = ApiTypingMeta,
> = ExtractMethodResponse200ContentJSON<M, R, T>
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
