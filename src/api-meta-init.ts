import path from "path"
import { readFileSync, writeFileSync } from "node:fs"
import axios from "axios"
import openapiTs from "openapi-typescript"
import { deepDel } from "./util/deep"

export interface InitOptions {
  /**
   * openapi json url
   */
  jsonSchemaPath: string
  /**
   * auto generated openapi-ts definition path
   * @default ./api-typing-meta.d.ts
   */
  definitionPath?: string
  /**
   * auto generated openapi json cache path
   * @default ./api-typing-meta.openapi.json
   */
  jsonCachePath?: string
}
const importTemplate = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
import "api-typing"`
const declareTemplate = `declare module "api-typing" {
  export interface ApiTypingMeta {
    paths: paths;
    components: components;
    operations: operations;
    external: external;
  }
}

export {}`

/**
 * get api definition from url
 * @param param0 @link InitOptions
 * @returns Promise
 */
export const getDefinition = async ({
  jsonSchemaPath,
  definitionPath = "./api-typing-meta.d.ts",
  jsonCachePath = "./api-typing-meta.openapi.json",
}: InitOptions) => {
  // remove unnecessary properties for apifox
  let schemas = {} as any
  if (jsonSchemaPath.startsWith("http")) {
    schemas = await axios
      .get(jsonSchemaPath)
      .then((res) =>
        deepDel(
          res.data,
          "x-apifox-folder",
          "x-apifox-status",
          "x-apifox-refs",
          "x-apifox-orders",
          "x-apifox-overrides",
          "x-apifox-ignore-properties",
        ),
      )
    // 保存 openapi json 到本地
    writeFileSync(
      path.join(path.dirname("."), jsonCachePath),
      JSON.stringify(schemas, null, 2),
      { encoding: "utf8" },
    )
  } else {
    const str = readFileSync(path.join(path.dirname("."), jsonSchemaPath), {
      encoding: "utf8",
    })
    schemas = JSON.parse(str)
  }

  const output = await openapiTs(schemas)
  let success = false
  const tryDecodeURIComponent = (str: string) => {
    try {
      return decodeURIComponent(str)
    } catch (e) {
      console.log("decodeURIComponent error: ", e)
      return str
    }
  }
  writeFileSync(
    path.join(path.dirname("."), `${definitionPath}`),
    tryDecodeURIComponent(`${importTemplate}\n${output}\n${declareTemplate}`),
    {
      encoding: "utf8",
    },
  )
  success = true
  return Promise.resolve(success)
}
