import path from "path"
import { writeFileSync } from "fs"
import axios from "axios"
import openapiTs from "openapi-typescript"
import { deepDel } from "@/util/deep"

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
}: InitOptions) => {
  // remove unnecessary properties for apifox
  const schemas = await axios
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
  const output = await openapiTs(schemas)
  let success = false
  writeFileSync(
    path.join(path.dirname("."), `${definitionPath}`),
    `${importTemplate}\n${output}\n${declareTemplate}`,
    {
      encoding: "utf8",
    },
  )
  success = true
  return Promise.resolve(success)
}
