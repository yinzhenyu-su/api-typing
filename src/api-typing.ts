import axios, {
  type AxiosResponse,
  type AxiosRequestConfig,
  isAxiosError,
} from "axios"

import type { Extract200JSON, PathKeyOfMethod } from "./api-helper"
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
  AxiosRequestConfigKeys,
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
  if (typeof obj !== "object") return false
  const keys = Object.keys(obj)
  if (keys.length === 0) return true
  return keys.some(
    (key) =>
      AxiosRequestConfigKeys.concat([
        "params",
        "query",
        "mock",
        "mockBaseURL",
        "__is_config",
      ] as any).includes(key as any) && !keys.includes("__is_data"),
  )
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
    if (["post", "patch", "put", "delete"].includes(method)) {
      if (!isConfig(config)) {
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
      } else {
        options = {
          ...config,
          ...options,
          data,
        }
      }
    }

    const { mock = false, mockBaseURL = "" } = rootConfig
    const mockOptions = { mock, mockBaseURL, ...options }
    return mockOptions
  }

  const post = <T extends PathKeyOfMethod<"post">>(
    ...[url, data, config]: PostArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"post", T>>> => {
    return api.request(getOptions("post", url, data, config))
  }

  const put = <T extends PathKeyOfMethod<"put">>(
    ...[url, data, config]: PutArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"put", T>>> => {
    return api.request(getOptions("put", url, data, config))
  }

  const patch = <T extends PathKeyOfMethod<"patch">>(
    ...[url, data, config]: PatchArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"patch", T>>> => {
    return api.request(getOptions("patch", url, data, config))
  }

  const del = <T extends PathKeyOfMethod<"delete">>(
    ...[url, data, config]: DelArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"delete", T>>> => {
    return api.request(getOptions("delete", url, data, config))
  }

  const get = <T extends PathKeyOfMethod<"get">>(
    ...[url, config]: GetArgs<T>
  ) =>
    api.request<
      Extract200JSON<"get", T>,
      AxiosResponse<Extract200JSON<"get", T>>
    >({
      ...config,
      method: "get",
      url,
    })

  const head = <T extends PathKeyOfMethod<"head">>(
    ...[url, config]: HeadArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"head", T>>> =>
    api.request({
      ...config,
      method: "head",
      url,
    })

  const options = <T extends PathKeyOfMethod<"options">>(
    ...[url, config]: OptionsArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"options", T>>> =>
    api.request({
      ...config,
      method: "options",
      url,
    })
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
