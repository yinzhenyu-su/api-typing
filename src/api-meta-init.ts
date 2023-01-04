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
 * recursive delete key in object
 * @param obj origin object
 * @param tobeDelKey tobeDel key
 * @returns object omitted keys
 */
function removeKey(obj: any, tobeDelKey: string): any {
  for (const key in obj) {
    if (key.includes(tobeDelKey)) {
      delete obj[key]
    } else if (typeof obj[key] === "object") {
      removeKey(obj[key], tobeDelKey)
    }
  }
  return obj
}

/**
 * get api definition from url
 * @param param0 @link InitOptions
 * @returns Promise
 */
export const getDefinition = async ({
  jsonSchemaPath,
  definitionPath = "./api-typing-meta.d.ts",
}: InitOptions) => {
  const schemas = await axios
    .get(jsonSchemaPath)
    .then((res) => removeKey(res.data, "apifox"))
  const output = await openapiTs(JSON.parse(decodeURI(JSON.stringify(schemas))))
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
