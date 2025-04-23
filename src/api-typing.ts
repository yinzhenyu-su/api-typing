import axios, {
  type AxiosResponse,
  type AxiosRequestConfig,
  isAxiosError,
  type AxiosInstance,
} from "axios"

import type {
  ExtractMethodResponseStatusContentJSON,
  PathKeyOfMethod,
  StatusOfPathKeyOfMethod,
} from "./api-helper"
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
  MockOptions,
} from "./core-type"
import { GlobalStatus } from "./global-status"
import type { IStringifyOptions } from "qs"

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
 * Creates a type-safe HTTP client with enhanced features based on axios.
 *
 * This function returns an extended axios instance with type-checking capabilities
 * for API endpoints defined in your OpenAPI/Swagger specifications. It adds request
 * and response interceptors for tracking request counts, handles mock configurations,
 * and provides strongly-typed methods for all HTTP verbs.
 *
 * @param config - Optional configuration for the HTTP client
 * @returns An enhanced axios instance with type-checked HTTP methods
 *
 * @example
 * ```typescript
 * // Create a basic client
 * const api = createHTTPClient();
 *
 * // Create a client with custom configuration
 * const api = createHTTPClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 5000,
 *   mock: true,
 *   mockBaseURL: 'https://mock-api.example.com'
 * });
 *
 * // Make type-safe API calls
 * const response = await api.get('/users/{id}', {
 *   params: { id: 123 },
 *   query: { include: 'profile' }
 * });
 * ```
 */
export const createHTTPClient = <T extends CreateHTTPClientConfig>(
  config?: T,
) => {
  const rootConfig = config || ({} as T)
  const modifiedAxios =
    config?.axiosFactory?.(axios.create(config)) || axios.create(config)
  const api = modifiedAxios

  let originApi = null as null | AxiosInstance
  if (config?.createNoTypeHTTPClient) {
    originApi = modifiedAxios
  }

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
  ): AxiosRequestConfig &
    MockOptions & { stringifyOptions?: IStringifyOptions } => {
    let options: Record<string, any> = { method, url }

    // 合并参数
    if (data !== undefined) {
      if (isConfig(data)) {
        options = { ...data, ...options }
      } else {
        options.data = data
      }
    }
    if (config !== undefined) {
      options = { ...config, ...options }
    }

    // 添加 mock 配置
    const { mock = false, mockBaseURL = "", stringifyOptions = {} } = rootConfig
    return { mock, mockBaseURL, stringifyOptions, ...options }
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
    /**
     * axios instance
     */
    axiosInstance: api,
    /**
     * http get request with type check
     * @example
     * ```ts
     * const { data } = await client.get("https://some/url/with/{id}", { params: { id: 1 }, query: { limit: 10 }})
     * ```
     */
    get,
    /**
     * http post request with type check
     * @example
     * ```ts
     * const { data } = await client.post("https://some/url/with/{id}", { some: { data: {}}}, { params: { id: 1 }, query: { limit: 10 }, __is_config: true })
     * ```
     */
    post,
    /**
     * http put request with type check
     * @example
     * ```ts
     * const { data } = await client.put("https://some/url/with/{id}", { some: { data: {}}}, { params: { id: 1 }, query: { limit: 10 }, __is_config: true })
     * ```
     */
    put,
    /**
     * http patch request with type check
     * @example
     * ```ts
     * const { data } = await client.patch("https://some/url/with/{id}", { some: { data: {}}}, { params: { id: 1 }, query: { limit: 10 }, __is_config: true })
     * ```
     */
    patch,
    /**
     * http head request with type check
     * @example
     * ```ts
     * const { data } = await client.post("https://some/url/with/{id}", { params: { id: 1 }, query: { limit: 10 } })
     * ```
     */
    head,
    /**
     * http options request with type check
     * @example
     * ```ts
     * const { data } = await client.options("https://some/url/with/{id}", { params: { id: 1 }, query: { limit: 10 } })
     * ```
     */
    options,
    /**
     * http delete request with type check
     * @example
     * ```ts
     * const { data } = await client.delete("https://some/url/with/{id}", { params: { id: 1 }, query: { limit: 10 } })
     * ```
     */
    delete: del,
    /**
     * cancel token
     * @example
     * ```ts
     * cancelToken.cancel("cancel message")
     * ```
     */
    cancelToken,
    /**
     * global request count status
     */
    globalStatus: counterInstance,
    /**
     * axios instance without type check, use this instance when you don't need type check.
     * this instance use the same config with the main instance
     */
    noTypeHTTPClient: originApi,
  }

  return apiTyping
}
/**
 * ApiTypingInstance
 */
export type ApiTypingInstance = ReturnType<typeof createHTTPClient>
