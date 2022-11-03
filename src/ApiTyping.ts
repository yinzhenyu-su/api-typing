import axios, { type AxiosResponse } from "axios"

import type {
  Extract200JSON,
  PathKeyOfMethod,
} from "./ApiHelper"
import { requestProxyHandler } from "./ApiTypingProxy"
import type { CreateConfig, PostArgs, GetArgs, PutArgs, PatchArgs, DelArgs, HeadArgs, OptionsArgs } from "./CoreType"

/**
 * create api-typing instance
 * @param config CreateConfig
 * @returns ApiTypingInstance
 */
export const create = (config?: CreateConfig) => {
  const api = axios.create(config)

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
  }
  return apiTyping
}
/**
 * ApiTypingInstance
 */
export type ApiTypingInstance = ReturnType<typeof create>
