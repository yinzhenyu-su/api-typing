import { AxiosNamespace } from "./lib"
import type { AxiosRequestConfig } from "axios"
import type {
  ExtractParamPath,
  ExtractParamQuery,
  ExtractRequestBodyJSON,
  Method,
  PathKeyOfMethod,
  RequiredKeys,
  ApiTypingMeta,
  ApiTyping,
} from "./api-helper"
import type { IStringifyOptions } from "qs"

type ConfigType = {
  __is_config: true
  /**
   * qs 序列化选项，用于自定义 query 参数的序列化方式
   * @example
   * ```ts
   * // 将数组序列化为逗号分隔的字符串
   * stringifyOptions: { arrayFormat: 'comma' } // ids=[1,2,3] => ids=1,2,3
   *
   * // 不编码特殊字符
   * stringifyOptions: { encode: false } // q=hello world => q=hello world
   *
   * // 自定义分隔符
   * stringifyOptions: { delimiter: ';' } // foo=bar&baz=qux => foo=bar;baz=qux
   * ```
   */
  stringifyOptions?: IStringifyOptions
}

export type ApiTypingRequestRaw = Omit<
  AxiosNamespace.AxiosRequestConfig,
  "params"
> & {
  /**
   * 查询参数
   */
  query?: any
  /**
   * 路径参数
   */
  params?: any
} & MockOptions

// 1. 如果没有params和query，那么ApiRequestConfig是不需要的，反之亦然。
// 2. 如果有params和query，那么ApiRequestConfig是必须的，反之亦然。
// 3. 如果有params，那么ApiRequestConfig必须有params，反之亦然。
// 4. 如果有query，那么ApiRequestConfig必须有query，反之亦然。

type DynamicKeys<
  M extends Method, 
  T extends PathKeyOfMethod<M, TMeta>, 
  TMeta extends ApiTyping = ApiTypingMeta
> =
  ExtractParamPath<M, T, TMeta> extends never | undefined
    ? ExtractParamQuery<M, T, TMeta> extends never | undefined
      ? never | undefined
      : RequiredKeys<ExtractParamQuery<M, T, TMeta>> extends never | undefined
        ? { query?: ExtractParamQuery<M, T, TMeta> } | undefined
        : { query: ExtractParamQuery<M, T, TMeta> }
    : ExtractParamQuery<M, T, TMeta> extends never | undefined
      ? RequiredKeys<ExtractParamPath<M, T, TMeta>> extends never | undefined
        ? { params?: ExtractParamPath<M, T, TMeta> } | undefined
        : { params: ExtractParamPath<M, T, TMeta> }
      : { params: ExtractParamPath<M, T, TMeta>; query: ExtractParamQuery<M, T, TMeta> }

export type ApiTypingRequestConfig<
  M extends Method,
  T extends PathKeyOfMethod<M, TMeta>,
  TMeta extends ApiTyping = ApiTypingMeta,
> =
  DynamicKeys<M, T, TMeta> extends never | undefined
    ? HttpClientRequestConfig
    : HttpClientRequestConfig & DynamicKeys<M, T, TMeta>

// if no params and query ApiRequestConfig is not required, vice versa.

/**
 * Post request args
 * @param T request path
 * @param TMeta ApiTypingMeta type
 */
export type PostArgs<
  T extends PathKeyOfMethod<"post", TMeta>, 
  TMeta extends ApiTyping = ApiTypingMeta
> =
  RequiredKeys<DynamicKeys<"post", T, TMeta>> extends never
    ? ExtractRequestBodyJSON<"post", T, TMeta> extends never | undefined
      ? [T, (ApiTypingRequestConfig<"post", T, TMeta> & ConfigType)?]
      : [
          T,
          ExtractRequestBodyJSON<"post", T, TMeta>,
          ApiTypingRequestConfig<"post", T, TMeta>?,
        ]
    : ExtractRequestBodyJSON<"post", T, TMeta> extends never | undefined
      ? [T, ApiTypingRequestConfig<"post", T, TMeta> & ConfigType]
      : [
          T,
          ExtractRequestBodyJSON<"post", T, TMeta>,
          ApiTypingRequestConfig<"post", T, TMeta>,
        ]

/**
 * Put request args
 * @param T request path
 * @param TMeta ApiTypingMeta type
 */
export type PutArgs<
  T extends PathKeyOfMethod<"put", TMeta>, 
  TMeta extends ApiTyping = ApiTypingMeta
> =
  RequiredKeys<DynamicKeys<"put", T, TMeta>> extends never
    ? ExtractRequestBodyJSON<"put", T, TMeta> extends never | undefined
      ? [T, (ApiTypingRequestConfig<"put", T, TMeta> & ConfigType)?]
      : [T, ExtractRequestBodyJSON<"put", T, TMeta>, ApiTypingRequestConfig<"put", T, TMeta>?]
    : ExtractRequestBodyJSON<"put", T, TMeta> extends never | undefined
      ? [T, ApiTypingRequestConfig<"put", T, TMeta> & ConfigType]
      : [T, ExtractRequestBodyJSON<"put", T, TMeta>, ApiTypingRequestConfig<"put", T, TMeta>]

/**
 * Patch request args
 * @param T request path
 * @param TMeta ApiTypingMeta type
 */
export type PatchArgs<
  T extends PathKeyOfMethod<"patch", TMeta>, 
  TMeta extends ApiTyping = ApiTypingMeta
> =
  RequiredKeys<DynamicKeys<"patch", T, TMeta>> extends never
    ? ExtractRequestBodyJSON<"patch", T, TMeta> extends never | undefined
      ? [T, (ApiTypingRequestConfig<"patch", T, TMeta> & ConfigType)?]
      : [
          T,
          ExtractRequestBodyJSON<"patch", T, TMeta>,
          ApiTypingRequestConfig<"patch", T, TMeta>?,
        ]
    : ExtractRequestBodyJSON<"patch", T, TMeta> extends never | undefined
      ? [T, ApiTypingRequestConfig<"patch", T, TMeta> & ConfigType]
      : [
          T,
          ExtractRequestBodyJSON<"patch", T, TMeta>,
          ApiTypingRequestConfig<"patch", T, TMeta>,
        ]

/**
 * Delete request args
 * @param T request path
 * @param TMeta ApiTypingMeta type
 */
export type DelArgs<
  T extends PathKeyOfMethod<"delete", TMeta>, 
  TMeta extends ApiTyping = ApiTypingMeta
> =
  RequiredKeys<DynamicKeys<"delete", T, TMeta>> extends never
    ? ExtractRequestBodyJSON<"delete", T, TMeta> extends never | undefined
      ? [T, (ApiTypingRequestConfig<"delete", T, TMeta> & ConfigType)?]
      : [
          T,
          ExtractRequestBodyJSON<"delete", T, TMeta>,
          ApiTypingRequestConfig<"delete", T, TMeta>?,
        ]
    : ExtractRequestBodyJSON<"delete", T, TMeta> extends never | undefined
      ? [T, ApiTypingRequestConfig<"delete", T, TMeta> & ConfigType]
      : [
          T,
          ExtractRequestBodyJSON<"delete", T, TMeta>,
          ApiTypingRequestConfig<"delete", T, TMeta>,
        ]

/**
 * Get request args
 * @param T request path
 * @param TMeta ApiTypingMeta type
 */
export type GetArgs<
  T extends PathKeyOfMethod<"get", TMeta>, 
  TMeta extends ApiTyping = ApiTypingMeta
> =
  RequiredKeys<DynamicKeys<"get", T, TMeta>> extends never
    ? [T, ApiTypingRequestConfig<"get", T, TMeta>?]
    : [T, ApiTypingRequestConfig<"get", T, TMeta>]

/**
 * Head request args
 * @param T request path
 * @param TMeta ApiTypingMeta type
 */
export type HeadArgs<
  T extends PathKeyOfMethod<"head", TMeta>, 
  TMeta extends ApiTyping = ApiTypingMeta
> =
  RequiredKeys<DynamicKeys<"head", T, TMeta>> extends never
    ? [T, ApiTypingRequestConfig<"head", T, TMeta>?]
    : [T, ApiTypingRequestConfig<"head", T, TMeta>]

/**
 * Options request args
 * @param T request path
 * @param TMeta ApiTypingMeta type
 */
export type OptionsArgs<
  T extends PathKeyOfMethod<"options", TMeta>, 
  TMeta extends ApiTyping = ApiTypingMeta
> =
  RequiredKeys<DynamicKeys<"options", T, TMeta>> extends never
    ? [T, ApiTypingRequestConfig<"options", T, TMeta>?]
    : [T, ApiTypingRequestConfig<"options", T, TMeta>]

type OmitAxiosRequestConfig<D = any> = Omit<
  AxiosRequestConfig<D>,
  "url" | "params" | "method" | "data"
>

export type Optional<T> = { [k in keyof T]?: T[k] }

export type MockOptions = { mock?: boolean; mockBaseURL?: string }

/**
 * 创建api-typing实例的参数
 */
export type CreateHTTPClientConfig = Optional<
  OmitAxiosRequestConfig &
    MockOptions & {
      /**
       * qs 序列化选项，用于自定义 query 参数的序列化方式
       * @see https://github.com/ljharb/qs#stringifying
       * @example
       * ```ts
       * // 全局配置
       * const client = createHTTPClient({
       *   stringifyOptions: {
       *     arrayFormat: 'comma',     // 数组格式化方式: brackets, repeat, comma
       *     encode: false,            // 是否编码字符
       *     delimiter: '&',           // 参数分隔符
       *     skipNulls: true,         // 跳过 null 值
       *     sort: (a, b) => a.localeCompare(b), // 自定义排序
       *     serializeDate: (d) => d.toISOString(), // 自定义日期序列化
       *   }
       * })
       *
       * // 单次请求配置
       * client.get('/api', {
       *   query: { ids: [1, 2, 3] },
       *   stringifyOptions: { arrayFormat: 'comma' } // ids=1,2,3
       * })
       * ```
       */
      stringifyOptions?: IStringifyOptions
      /**
       * 是否创建没有类型的校验的HTTPClient
       */
      createNoTypeHTTPClient?: boolean
      /**
       * AxiosFactory 用于提供一个自定义的axios实例
       * @description
       * @param axios axiosInstance
       * @return axiosInstance
       */
      axiosFactory?: (
        axios: AxiosNamespace.AxiosInstance,
      ) => AxiosNamespace.AxiosInstance
    }
>

export type HttpClientRequestConfig = Optional<
  OmitAxiosRequestConfig & MockOptions
>
