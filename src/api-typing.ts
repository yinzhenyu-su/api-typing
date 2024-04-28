import axios, {
  type AxiosResponse,
  type AxiosRequestConfig,
  isAxiosError,
} from "axios"

import type {
  ExtractMethodResponseStatusContentJSON,
  PathKeyOfMethod,
  StatusOfPathKeyOfMethod,
} from "./api-helper"
import { requestProxyHandler } from "./api-typing-proxy"
import {
  CreateHTTPClientConfig,
  PostArgs,
  GetArgs,
  PutArgs,
  PatchArgs,
  DelArgs,
  HeadArgs,
  OptionsArgs,
  MockOptions,
} from "./core-type"
import { GlobalStatus } from "./global-status"

/**
 * judge any is config object
 * @param obj any
 * @returns boolean
 */
export const isConfig = (obj: any) => {
  // 判断任意对象是不是 config 对象
  // 如果对象的 keys 包含 CreateHTTPClientConfig 的 key 并且不包含 __is_data 则判断为 config 对象
  // 如果是 config 对象，则返回 true
  if (obj === null || obj === undefined) return false
  // if obj is form data return false
  if (obj instanceof FormData) return false
  // if obj is not object return false
  if (typeof obj !== "object") return false
  const keys = Object.keys(obj)
  if (keys.includes("__is_data")) return false
  return keys.some((key) => ["__is_config"].includes(key as any))
}

const counterInstance = GlobalStatus.getInstance()
/**
 * createHTTPClient api-typing instance
 * @param config CreateHTTPClientConfig
 * @returns ApiTypingInstance
 */
export const createHTTPClient = (config?: CreateHTTPClientConfig) => {
  const rootConfig = config || {}
  const api = axios.create(config)

  api.interceptors.request.use((config) => {
    if (config.url) {
      counterInstance.incrementRequestCount(config.url)
    }
    return config
  })
  api.interceptors.response.use(
    (fullfill) => {
      if (fullfill.config.url) {
        counterInstance.decrementRequestCount(fullfill.config.url)
      }
      return fullfill
    },
    (error) => {
      if (isAxiosError(error) && error.config && error.config.url) {
        counterInstance.decrementRequestCount(error.config.url)
      }
      // https://github.com/axios/axios/issues/5412
      return Promise.reject(error)
    },
  )

  const { CancelToken } = axios
  const cancelToken = CancelToken.source()
  const proxy = new Proxy(api.request, requestProxyHandler)
  api.request = proxy

  const getOptions = (
    method: string,
    url: string,
    data: any,
    config: any,
  ): AxiosRequestConfig & MockOptions => {
    let options = { method, url } as Record<string, any>
    // 如果只有两个参数，则需要判断第二个参数是不是 config
    // 如果有三个参数，就直接赋值
    if (data !== undefined && config !== undefined) {
      options = {
        ...config,
        ...options,
        data,
      }
    } else if (data !== undefined) {
      if (isConfig(data)) {
        options = {
          ...data,
          ...options,
        }
      } else {
        options = {
          ...options,
          data,
        }
      }
    } else if (config !== undefined) {
      options = {
        ...config,
        ...options,
      }
    }

    const { mock = false, mockBaseURL = "" } = rootConfig
    const mockOptions = { mock, mockBaseURL, ...options }
    return mockOptions
  }

  const post = <
    T extends PathKeyOfMethod<"post">,
    S extends StatusOfPathKeyOfMethod<"post", T> = Extract<
      StatusOfPathKeyOfMethod<"post", T>,
      200
    >,
  >(
    ...[url, data, config]: PostArgs<T>
  ): Promise<
    AxiosResponse<ExtractMethodResponseStatusContentJSON<"post", S, T>>
  > => {
    return api.request(getOptions("post", url, data, config))
  }

  const put = <
    T extends PathKeyOfMethod<"put">,
    S extends StatusOfPathKeyOfMethod<"put", T> = Extract<
      StatusOfPathKeyOfMethod<"put", T>,
      200
    >,
  >(
    ...[url, data, config]: PutArgs<T>
  ): Promise<
    AxiosResponse<ExtractMethodResponseStatusContentJSON<"put", S, T>>
  > => {
    return api.request(getOptions("put", url, data, config))
  }

  const patch = <
    T extends PathKeyOfMethod<"patch">,
    S extends StatusOfPathKeyOfMethod<"patch", T> = Extract<
      StatusOfPathKeyOfMethod<"patch", T>,
      200
    >,
  >(
    ...[url, data, config]: PatchArgs<T>
  ): Promise<
    AxiosResponse<ExtractMethodResponseStatusContentJSON<"patch", S, T>>
  > => {
    return api.request(getOptions("patch", url, data, config))
  }

  const del = <
    T extends PathKeyOfMethod<"delete">,
    S extends StatusOfPathKeyOfMethod<"delete", T> = Extract<
      StatusOfPathKeyOfMethod<"delete", T>,
      200
    >,
  >(
    ...[url, data, config]: DelArgs<T>
  ): Promise<
    AxiosResponse<ExtractMethodResponseStatusContentJSON<"delete", S, T>>
  > => {
    return api.request(getOptions("delete", url, data, config))
  }

  const get = <
    T extends PathKeyOfMethod<"get">,
    S extends StatusOfPathKeyOfMethod<"get", T> = Extract<
      StatusOfPathKeyOfMethod<"get", T>,
      200
    >,
  >(
    ...[url, config]: GetArgs<T>
  ): Promise<
    AxiosResponse<ExtractMethodResponseStatusContentJSON<"get", S, T>>
  > => api.request(getOptions("get", url, undefined, config))

  const head = <
    T extends PathKeyOfMethod<"head">,
    S extends StatusOfPathKeyOfMethod<"head", T> = Extract<
      StatusOfPathKeyOfMethod<"head", T>,
      200
    >,
  >(
    ...[url, config]: HeadArgs<T>
  ): Promise<
    AxiosResponse<ExtractMethodResponseStatusContentJSON<"head", S, T>>
  > => api.request(getOptions("head", url, undefined, config))

  const options = <
    T extends PathKeyOfMethod<"options">,
    S extends StatusOfPathKeyOfMethod<"options", T> = Extract<
      StatusOfPathKeyOfMethod<"options", T>,
      200
    >,
  >(
    ...[url, config]: OptionsArgs<T>
  ): Promise<
    AxiosResponse<ExtractMethodResponseStatusContentJSON<"options", S, T>>
  > => api.request(getOptions("options", url, undefined, config))

  const apiTyping = {
    ...api,
    get,
    post,
    put,
    patch,
    head,
    options,
    delete: del,
    cancelToken,
    globalStatus: counterInstance,
  }

  return apiTyping
}
/**
 * ApiTypingInstance
 */
export type ApiTypingInstance = ReturnType<typeof createHTTPClient>
