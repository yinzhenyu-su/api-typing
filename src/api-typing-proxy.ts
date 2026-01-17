import type { AxiosRequestConfig } from "axios"
import qs, { type IStringifyOptions } from "qs"
import type { MockOptions } from "./core-type"

export type Parsable = Record<string, string | number>

export const replacerFactory = (obj?: Parsable) => {
  return (match: string, p1: string, p2: string, p3: string) => {
    return obj === undefined ? match : `${obj[p2]}`
  }
}

export type ProxyConfig = AxiosRequestConfig & {
  query?: any
  params?: any
  __is_config?: boolean
  __is_data?: boolean
} & MockOptions & { stringifyOptions?: IStringifyOptions }

export const requestProxyHandler = {
  apply: function (target: any, thisArg: any, argumentList: ProxyConfig[]) {
    const requestOption = argumentList[0]!
    if (!requestOption.url) {
      requestOption.url = ""
    }

    const params = requestOption.params as Parsable | undefined
    if (params) {
      const replacer = replacerFactory(params)
      requestOption.url = requestOption.url.replace(/({)(.*?)(})/g, replacer)
    }

    if (requestOption.query) {
      requestOption.url = `${requestOption.url}?${qs.stringify(
        requestOption.query,
        requestOption.stringifyOptions,
      )}`
    }

    if (requestOption.mockBaseURL && requestOption.mock) {
      requestOption.baseURL = requestOption.mockBaseURL
    }

    delete requestOption?.params
    delete requestOption?.query
    delete requestOption?.mock
    delete requestOption?.mockBaseURL
    delete requestOption?.__is_config
    delete requestOption?.__is_data
    delete requestOption?.stringifyOptions

    return target(requestOption)
  },
}
