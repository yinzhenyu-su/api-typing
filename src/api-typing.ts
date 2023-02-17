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

  // TODO 区分不同的请求方法，获取 data 和 config 对象
  // FIXME 有点 hack，需要优化
  const isConfig = (obj: any) => {
    if (obj === null || obj === undefined) return false
    if (typeof obj !== "object") return false
    return Object.keys(obj).some((key) =>
      AxiosRequestConfigKeys.concat(["params", "query"] as any).includes(
        key as any,
      ),
    )
  }

  const post = <T extends PathKeyOfMethod<"post">>(
    ...[url, data, config]: PostArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"post", T>>> => {
    let options = {
      method: "post",
      url,
    } as AxiosRequestConfig

    // 如果只有两个参数，则需要判断第二个参数是不是 config
    // 如果有三个参数，就直接赋值
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
    return api.request(options)
  }

  const put = <T extends PathKeyOfMethod<"put">>(
    ...[url, data, config]: PutArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"put", T>>> => {
    let options = {
      method: "put",
      url,
    } as AxiosRequestConfig
    // 如果只有两个参数，则需要判断第二个参数是不是 config
    // 如果有三个参数，就直接赋值
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
    return api.request(options)
  }

  const patch = <T extends PathKeyOfMethod<"patch">>(
    ...[url, data, config]: PatchArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"patch", T>>> => {
    let options = {
      method: "patch",
      url,
    } as AxiosRequestConfig
    // 如果只有两个参数，则需要判断第二个参数是不是 config
    // 如果有三个参数，就直接赋值
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
    return api.request(options)
  }

  const del = <T extends PathKeyOfMethod<"delete">>(
    ...[url, data, config]: DelArgs<T>
  ): Promise<AxiosResponse<Extract200JSON<"delete", T>>> => {
    let options = {
      method: "delete",
      url,
    } as AxiosRequestConfig
    // 如果只有两个参数，则需要判断第二个参数是不是 config
    // 如果有三个参数，就直接赋值
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
    return api.request(options)
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
