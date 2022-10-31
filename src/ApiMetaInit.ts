import path from "path"
import { writeFileSync } from "fs"
import axios from "axios"
import openapiTs from "openapi-typescript"

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
const importTemplate = `import "api-typing"`
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
  let schemas = await axios.get(jsonSchemaPath).then((res) => res.data)
  schemas = JSON.parse(decodeURI(JSON.stringify(schemas)))
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
