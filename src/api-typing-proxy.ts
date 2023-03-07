import type { AxiosRequestConfig } from "axios"
import qs from "qs"
import { MockOptions } from "./core-type"

export type Parsable = Record<string, string | number>

export const replacerFactory = (obj?: Parsable) => {
  const replacer = (match: string, p1: string, p2: string, p3: string) => {
    // 如果obj 没有定义则不做替换，返回错误的url
    return obj === undefined ? match : `${obj[p2]}`
  }
  return replacer
}

export const requestProxyHandler = {
  apply: function (
    target: any,
    thisArg: any,
    argumentList: (AxiosRequestConfig & {
      query: any
      params: any
      __is_config?: boolean
      __is_data?: boolean
    } & MockOptions)[],
  ) {
    // replace url with obj attr
    const requestOption = argumentList[0]
    if (requestOption.url === undefined || requestOption.url === null) {
      requestOption.url = ""
    }
    const params = requestOption.params as Parsable
    if (params) {
      const replacer = replacerFactory(params)
      requestOption.url = requestOption.url?.replace(/({)(.*?)(})/g, replacer)
    }

    // transform obj to querystring
    const query = requestOption.query as string | undefined

    if (query) {
      requestOption.url = `${requestOption.url}?${qs.stringify(query)}`
    }

    // use mock url if user want to use mock
    const { mock, mockBaseURL } = requestOption
    if (mockBaseURL && mock) {
      requestOption.baseURL = mockBaseURL
    }

    delete requestOption.params
    delete requestOption.query
    delete requestOption.mock
    delete requestOption.mockBaseURL
    delete requestOption.__is_config
    delete requestOption.__is_data

    return target(requestOption)
  },
}
