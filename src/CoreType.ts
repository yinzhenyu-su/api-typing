import type { AxiosRequestConfig } from "axios"
import type {
  ExtractParamPath,
  ExtractParamQuery,
  Method,
  PathKeyOfMethod,
} from "./ApiHelper"

export type ApiTypingRequestRaw = Omit<AxiosRequestConfig, "params"> & {
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

export type ApiTypingRequestConfig<
  M extends Method,
  T extends PathKeyOfMethod<M>,
> = Omit<AxiosRequestConfig, "params" | "method" | "url"> & {
  // TODO动态require
  /**
   * 查询参数
   */
  query?: ExtractParamQuery<M, T>
  /**
   * 路径参数
   */
  params?: ExtractParamPath<M, T>
}

/**
 * 创建api-typing实例的参数
 */
export type CreateConfig = Pick<
  AxiosRequestConfig,
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
