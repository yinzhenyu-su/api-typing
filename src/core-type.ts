import { AxiosNamespace } from "@/src/lib"
import type {
  ExtractParamPath,
  ExtractParamQuery,
  ExtractRequestBodyJSON,
  Method,
  PathKeyOfMethod,
} from "./api-helper"

export type ApiTypingRequestRaw = Omit<
  AxiosNamespace.AxiosRequestConfig,
  "params"
> & {
  // TODO动态require
  /**
   * 查询参数
   */
  query?: any
  /**
   * 路径参数
   */
  params?: any
}

type DynamicType<M extends Method, T extends PathKeyOfMethod<M>> = {
  query: keyof ExtractParamQuery<M, T> extends never
    ? undefined
    : ExtractParamQuery<M, T>
  params: keyof ExtractParamPath<M, T> extends never
    ? undefined
    : ExtractParamPath<M, T>
}

type OmitByType<T, U> = {
  [k in keyof T as T[k] extends U ? never : k]: T[k]
}

export type ApiTypingRequestConfig<
  M extends Method,
  T extends PathKeyOfMethod<M>,
> = Omit<AxiosNamespace.AxiosRequestConfig, "params" | "method" | "url"> &
  OmitByType<DynamicType<M, T>, undefined>

type Last<T extends any[]> = T extends [...infer V, infer L] ? L : never

type HasParamsOrQuery<T, TRUE, FALSE> = "params" extends keyof T
  ? "query" extends keyof T
    ? TRUE
    : TRUE
  : FALSE

// if no params and query ApiRequestConfig is not required, vice versa.

export type GetArgs<T extends PathKeyOfMethod<"get">> = HasParamsOrQuery<
  ApiTypingRequestConfig<"get", T>,
  [T, ApiTypingRequestConfig<"get", T>],
  [T, ApiTypingRequestConfig<"get", T>?]
>

export type PostArgs<T extends PathKeyOfMethod<"post">> = HasParamsOrQuery<
  ApiTypingRequestConfig<"post", T>,
  [T, ExtractRequestBodyJSON<"post", T>, ApiTypingRequestConfig<"post", T>],
  [T, ExtractRequestBodyJSON<"post", T>, ApiTypingRequestConfig<"post", T>?]
>

export type PutArgs<T extends PathKeyOfMethod<"put">> = HasParamsOrQuery<
  ApiTypingRequestConfig<"put", T>,
  [T, ExtractRequestBodyJSON<"put", T>, ApiTypingRequestConfig<"put", T>],
  [T, ExtractRequestBodyJSON<"put", T>, ApiTypingRequestConfig<"put", T>?]
>

export type PatchArgs<T extends PathKeyOfMethod<"patch">> = HasParamsOrQuery<
  ApiTypingRequestConfig<"patch", T>,
  [T, ExtractRequestBodyJSON<"patch", T>, ApiTypingRequestConfig<"patch", T>],
  [T, ExtractRequestBodyJSON<"patch", T>, ApiTypingRequestConfig<"patch", T>?]
>

export type DelArgs<T extends PathKeyOfMethod<"delete">> = HasParamsOrQuery<
  ApiTypingRequestConfig<"delete", T>,
  [T, ExtractRequestBodyJSON<"delete", T>, ApiTypingRequestConfig<"delete", T>],
  [T, ExtractRequestBodyJSON<"delete", T>, ApiTypingRequestConfig<"delete", T>?]
>

export type HeadArgs<T extends PathKeyOfMethod<"head">> = HasParamsOrQuery<
  ApiTypingRequestConfig<"head", T>,
  [T, ApiTypingRequestConfig<"head", T>],
  [T, ApiTypingRequestConfig<"head", T>?]
>

export type OptionsArgs<T extends PathKeyOfMethod<"options">> =
  HasParamsOrQuery<
    ApiTypingRequestConfig<"options", T>,
    [T, ApiTypingRequestConfig<"options", T>],
    [T, ApiTypingRequestConfig<"options", T>?]
  >

/**
 * 创建api-typing实例的参数
 */
export type CreateHTTPClientConfig = Pick<
  AxiosNamespace.AxiosRequestConfig,
  | "baseURL"
  | "transformRequest"
  | "transformResponse"
  | "headers"
  | "paramsSerializer"
  | "timeout"
  | "timeoutErrorMessage"
  | "withCredentials"
  | "adapter"
  | "auth"
  | "responseType"
  | "responseEncoding"
  | "xsrfCookieName"
  | "xsrfHeaderName"
  | "onUploadProgress"
  | "onDownloadProgress"
  | "maxContentLength"
  | "validateStatus"
  | "maxBodyLength"
  | "maxRedirects"
  | "beforeRedirect"
  | "socketPath"
  | "httpAgent"
  | "httpsAgent"
  | "proxy"
  | "cancelToken"
  | "decompress"
  | "transitional"
  | "signal"
  | "insecureHTTPParser"
  | "env"
>
