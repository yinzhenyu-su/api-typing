import { AxiosNamespace } from "./lib"
import type {
  ExtractParamPath,
  ExtractParamQuery,
  ExtractRequestBodyJSON,
  Method,
  PathKeyOfMethod,
  RequiredKeys,
} from "./api-helper"
import type { IStringifyOptions } from "qs"

type ConfigType = { __is_config: true }

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

type DynamicKeys<M extends Method, T extends PathKeyOfMethod<M>> =
  ExtractParamPath<M, T> extends never | undefined
    ? ExtractParamQuery<M, T> extends never | undefined
      ? never | undefined
      : RequiredKeys<ExtractParamQuery<M, T>> extends never | undefined
        ? { query?: ExtractParamQuery<M, T> }
        : { query: ExtractParamQuery<M, T> }
    : ExtractParamQuery<M, T> extends never | undefined
      ? RequiredKeys<ExtractParamPath<M, T>> extends never | undefined
        ? { params?: ExtractParamPath<M, T> }
        : { params: ExtractParamPath<M, T> }
      : { params: ExtractParamPath<M, T>; query: ExtractParamQuery<M, T> }

export type ApiTypingRequestConfig<
  M extends Method,
  T extends PathKeyOfMethod<M>,
> =
  DynamicKeys<M, T> extends never
    ? CreateHTTPClientConfig
    : CreateHTTPClientConfig & DynamicKeys<M, T>

// if no params and query ApiRequestConfig is not required, vice versa.

/**
 * Post request args
 * @param T request path
 */
export type PostArgs<T extends PathKeyOfMethod<"post">> =
  DynamicKeys<"post", T> extends never | undefined
    ? ExtractRequestBodyJSON<"post", T> extends never | undefined
      ? [T, (ApiTypingRequestConfig<"post", T> & ConfigType)?]
      : [
          T,
          ExtractRequestBodyJSON<"post", T>,
          ApiTypingRequestConfig<"post", T>?,
        ]
    : ExtractRequestBodyJSON<"post", T> extends never | undefined
      ? [T, ApiTypingRequestConfig<"post", T> & ConfigType]
      : [
          T,
          ExtractRequestBodyJSON<"post", T>,
          ApiTypingRequestConfig<"post", T>,
        ]

/**
 * Put request args
 * @param T request path
 */
export type PutArgs<T extends PathKeyOfMethod<"put">> =
  DynamicKeys<"put", T> extends never | undefined
    ? ExtractRequestBodyJSON<"put", T> extends never | undefined
      ? [T, (ApiTypingRequestConfig<"put", T> & ConfigType)?]
      : [T, ExtractRequestBodyJSON<"put", T>, ApiTypingRequestConfig<"put", T>?]
    : ExtractRequestBodyJSON<"put", T> extends never | undefined
      ? [T, ApiTypingRequestConfig<"put", T> & ConfigType]
      : [T, ExtractRequestBodyJSON<"put", T>, ApiTypingRequestConfig<"put", T>]

/**
 * Patch request args
 * @param T request path
 */
export type PatchArgs<T extends PathKeyOfMethod<"patch">> =
  DynamicKeys<"patch", T> extends never | undefined
    ? ExtractRequestBodyJSON<"patch", T> extends never | undefined
      ? [T, (ApiTypingRequestConfig<"patch", T> & ConfigType)?]
      : [
          T,
          ExtractRequestBodyJSON<"patch", T>,
          ApiTypingRequestConfig<"patch", T>?,
        ]
    : ExtractRequestBodyJSON<"patch", T> extends never | undefined
      ? [T, ApiTypingRequestConfig<"patch", T> & ConfigType]
      : [
          T,
          ExtractRequestBodyJSON<"patch", T>,
          ApiTypingRequestConfig<"patch", T>,
        ]

/**
 * Delete request args
 * @param T request path
 */
export type DelArgs<T extends PathKeyOfMethod<"delete">> =
  DynamicKeys<"delete", T> extends never | undefined
    ? ExtractRequestBodyJSON<"delete", T> extends never | undefined
      ? [T, (ApiTypingRequestConfig<"delete", T> & ConfigType)?]
      : [
          T,
          ExtractRequestBodyJSON<"delete", T>,
          ApiTypingRequestConfig<"delete", T>?,
        ]
    : ExtractRequestBodyJSON<"delete", T> extends never | undefined
      ? [T, ApiTypingRequestConfig<"delete", T> & ConfigType]
      : [
          T,
          ExtractRequestBodyJSON<"delete", T>,
          ApiTypingRequestConfig<"delete", T>,
        ]

/**
 * Get request args
 * @param T request path
 */
export type GetArgs<T extends PathKeyOfMethod<"get">> =
  DynamicKeys<"get", T> extends never | undefined
    ? [T, ApiTypingRequestConfig<"get", T>?]
    : [T, ApiTypingRequestConfig<"get", T>]

/**
 * Head request args
 * @param T request path
 */
export type HeadArgs<T extends PathKeyOfMethod<"head">> =
  DynamicKeys<"head", T> extends never | undefined
    ? [T, ApiTypingRequestConfig<"options", T>?]
    : [T, ApiTypingRequestConfig<"head", T>]

/**
 * Options request args
 * @param T request path
 */
export type OptionsArgs<T extends PathKeyOfMethod<"options">> =
  DynamicKeys<"options", T> extends never | undefined
    ? [T, ApiTypingRequestConfig<"options", T>?]
    : [T, ApiTypingRequestConfig<"options", T>]

export const AxiosRequestConfigKeys = [
  "adapter",
  "auth",
  "baseURL",
  "beforeRedirect",
  "cancelToken",
  // "data",
  "decompress",
  "env",
  "formSerializer",
  "headers",
  "httpAgent",
  "httpsAgent",
  "insecureHTTPParser",
  "maxBodyLength",
  "maxContentLength",
  "maxRate",
  "maxRedirects",
  // "method",
  "onDownloadProgress",
  "onUploadProgress",
  // "params",
  "paramsSerializer",
  "proxy",
  "responseEncoding",
  "responseType",
  "signal",
  "socketPath",
  "timeout",
  "timeoutErrorMessage",
  "transformRequest",
  "transformResponse",
  "transitional",
  // "url",
  "validateStatus",
  "withCredentials",
  "xsrfCookieName",
  "xsrfHeaderName",
] as const

export type Optional<T> = { [k in keyof T]?: T[k] }

export type MockOptions = { mock?: boolean; mockBaseURL?: string }

/**
 * 创建api-typing实例的参数
 */
export type CreateHTTPClientConfig = Optional<
  Pick<
    AxiosNamespace.AxiosRequestConfig,
    (typeof AxiosRequestConfigKeys)[number]
  > &
    MockOptions & {
      /**
       * qs序列化query参数
       */
      stringifyOptions?: IStringifyOptions
      /**
       * 是否创建没有类型的校验的HTTPClient
       */
      createNoTypeHTTPClient?: boolean
    }
>
