import axios, { type AxiosResponse, isAxiosError } from "axios"

import type { Extract200JSON, PathKeyOfMethod } from "./api-helper"
import { requestProxyHandler } from "./api-typing-proxy"
import type {
  CreateHTTPClientConfig,
  PostArgs,
  GetArgs,
  PutArgs,
  PatchArgs,
  DelArgs,
  HeadArgs,
  OptionsArgs,
} from "./core-type"
import { GlobalStatus } from "./global-status"

const counterInstance = GlobalStatus.getInstance()
/**
 * createHTTPClient api-typing instance
 * @param config CreateHTTPClientConfig
 * @returns ApiTypingInstance
 */
export const createHTTPClient = (config?: CreateHTTPClientConfig) => {
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
      return error
    },
  )

  const { CancelToken } = axios
  const cancelToken = CancelToken.source()
  const proxy = new Proxy(api.request, requestProxyHandler)
  api.request = proxy

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

  const post = <T extends PathKeyOfMethod<"post">>(
    ...[url, data, config]: PostArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"post", T>>> =>
    api.request({
      ...config,
      method: "post",
      url,
      data,
    })

  const put = <T extends PathKeyOfMethod<"put">>(
    ...[url, data, config]: PutArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"put", T>>> =>
    api.request({
      ...config,
      method: "put",
      url,
      data,
    })

  const patch = <T extends PathKeyOfMethod<"patch">>(
    ...[url, data, config]: PatchArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"patch", T>>> =>
    api.request({
      ...config,
      method: "patch",
      url,
      data,
    })

  const del = <T extends PathKeyOfMethod<"delete">>(
    ...[url, config]: DelArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"delete", T>>> =>
    api.request({
      ...config,
      method: "delete",
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
