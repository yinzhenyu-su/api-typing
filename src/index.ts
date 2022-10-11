import { writeFile } from "fs"
import path from "path"
import openapiTs from "openapi-typescript"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

import type {
  Extract200JSON,
  ExtractParamPath,
  ExtractParamQuery,
  ExtractRequestBodyJSON,
  Method,
  PathKeyOfMethod,
} from "./projectApiHelper"
import { requestProxyHandler } from "./proxy"

export type APITypingRequestConfig = Omit<
  AxiosRequestConfig,
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

type ReqParams<M extends Method, T extends PathKeyOfMethod<M>> = Omit<
  AxiosRequestConfig,
  "params"
> & {
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

export const create = (config?: AxiosRequestConfig) => {
  let api = axios.create(config)

  const { CancelToken } = axios
  const cancelToken = CancelToken.source()
  const proxy = new Proxy(api.request, requestProxyHandler)
  api.request = proxy

  const get = <T extends PathKeyOfMethod<"get">>(
    url: T,
    config?: ReqParams<"get", T>,
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
    url: T,
    data: ExtractRequestBodyJSON<"post", T>,
    config?: ReqParams<"post", T>,
  ): Promise<AxiosResponse<Extract200JSON<"post", T>>> =>
    api.request({
      ...config,
      method: "post",
      url,
      data,
    })

  const put = <T extends PathKeyOfMethod<"put">>(
    url: T,
    data?: ExtractRequestBodyJSON<"put", T>,
    config?: ReqParams<"put", T>,
  ): Promise<AxiosResponse<Extract200JSON<"put", T>>> =>
    api.request({
      ...config,
      method: "put",
      url,
      data,
    })

  const patch = <T extends PathKeyOfMethod<"patch">>(
    url: T,
    data?: ExtractRequestBodyJSON<"patch", T>,
    config?: ReqParams<"patch", T>,
  ): Promise<AxiosResponse<Extract200JSON<"patch", T>>> =>
    api.request({
      ...config,
      method: "patch",
      url,
      data,
    })

  const del = <T extends PathKeyOfMethod<"delete">>(
    url: T,
    data?: any,
    config?: ReqParams<"delete", T>,
  ): Promise<AxiosResponse<Extract200JSON<"delete", T>>> =>
    api.request({
      ...config,
      method: "delete",
      url,
      data,
    })

  const head = <T extends PathKeyOfMethod<"head">>(
    url: T,
    data?: any,
    config?: ReqParams<"head", T>,
  ): Promise<AxiosResponse<Extract200JSON<"head", T>>> =>
    api.request({
      ...config,
      method: "head",
      url,
      data,
    })

  const options = <T extends PathKeyOfMethod<"options">>(
    url: T,
    data?: any,
    config?: ReqParams<"options", T>,
  ): Promise<AxiosResponse<Extract200JSON<"options", T>>> =>
    api.request({
      ...config,
      method: "options",
      url,
      data,
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

interface InitOptions {
  /**
   * openapi json url
   */
  jsonSchemaPath: string
  /**
   * auto generated openapi-ts definition path
   * @default ./api-typing.d.ts
   */
  definitionPath?: string
}

export const getDefinition = async ({
  jsonSchemaPath,
  definitionPath = "./api-typing.d.ts",
}: InitOptions) => {
  let schemas = await axios.get(jsonSchemaPath).then((res) => res.data)
  schemas = JSON.parse(decodeURI(JSON.stringify(schemas)))
  const output = await openapiTs(schemas)
  let success = false
  await writeFile(
    path.join(path.dirname("."), `${definitionPath}`),
    output,
    { encoding: "utf8" },
    (err: any) => {
      if (err) {
        throw err
      } else {
        console.log("generate api types success!")
      }
    },
  )
  success = true
  return success
}

export * from "./projectApiHelper"
