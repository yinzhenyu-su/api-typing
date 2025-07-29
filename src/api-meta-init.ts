import path from "path"
import { readFileSync, writeFileSync } from "node:fs"
import axios from "axios"
import openapiTs, { astToString } from "openapi-typescript"
import { deepDel } from "./util/deep"

export interface InitOptions {
  /**
   * openapi json url or array of urls
   */
  jsonSchemaPath?: string
  /**
   * array of openapi json urls/paths (supports multiple schemas)
   */
  jsonSchemaPaths?: string[]
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
 * Merge multiple OpenAPI schemas into a single schema
 */
const mergeOpenAPISchemas = (schemas: any[]): any => {
  if (schemas.length === 1) {
    return schemas[0]
  }

  const mergedSchema: any = {
    openapi: schemas[0]?.openapi || "3.0.0",
    info: {
      title: "Merged API",
      version: "1.0.0",
      description: "Merged from multiple OpenAPI schemas"
    },
    paths: {},
    components: {
      schemas: {},
      responses: {},
      parameters: {},
      examples: {},
      requestBodies: {},
      headers: {},
      securitySchemes: {},
      links: {},
      callbacks: {}
    },
    tags: [],
    servers: []
  }

  // Merge each schema
  schemas.forEach((schema, index) => {
    if (!schema) return

    // Merge paths
    if (schema.paths) {
      Object.keys(schema.paths).forEach(pathKey => {
        if (mergedSchema.paths[pathKey]) {
          // Path already exists, merge the methods
          Object.assign(mergedSchema.paths[pathKey], schema.paths[pathKey])
        } else {
          mergedSchema.paths[pathKey] = schema.paths[pathKey]
        }
      })
    }

    // Merge components
    if (schema.components) {
      Object.keys(schema.components).forEach(componentType => {
        if (schema.components[componentType] && typeof schema.components[componentType] === 'object') {
          Object.assign(
            mergedSchema.components[componentType] || {},
            schema.components[componentType]
          )
        }
      })
    }

    // Merge tags
    if (schema.tags && Array.isArray(schema.tags)) {
      schema.tags.forEach((tag: any) => {
        if (!mergedSchema.tags.find((existingTag: any) => existingTag.name === tag.name)) {
          mergedSchema.tags.push(tag)
        }
      })
    }

    // Merge servers
    if (schema.servers && Array.isArray(schema.servers)) {
      schema.servers.forEach((server: any) => {
        if (!mergedSchema.servers.find((existingServer: any) => existingServer.url === server.url)) {
          mergedSchema.servers.push(server)
        }
      })
    }

    // Use info from first non-empty schema, but allow title to be combined
    if (index === 0 && schema.info) {
      mergedSchema.info = { ...schema.info }
    } else if (schema.info && schema.info.title) {
      if (mergedSchema.info.title === "Merged API") {
        mergedSchema.info.title = schema.info.title
      } else {
        mergedSchema.info.title += ` & ${schema.info.title}`
      }
    }
  })

  return mergedSchema
}

/**
 * Load a single OpenAPI schema from file or URL
 */
const loadSchema = async (schemaPath: string): Promise<any> => {
  if (schemaPath.startsWith("http")) {
    const response = await axios.get(schemaPath)
    return deepDel(
      response.data,
      "x-apifox-folder",
      "x-apifox-status",
      "x-apifox-refs",
      "x-apifox-orders",
      "x-apifox-overrides",
      "x-apifox-ignore-properties",
    )
  } else {
    const str = readFileSync(path.join(path.dirname("."), schemaPath), {
      encoding: "utf8",
    })
    return JSON.parse(str)
  }
}

/**
 * get api definition from url(s)
 * @param param0 @link InitOptions
 * @returns Promise
 */
export const getDefinition = async ({
  jsonSchemaPath,
  jsonSchemaPaths,
  definitionPath = "./api-typing-meta.d.ts",
  jsonCachePath = "./api-typing-meta.openapi.json",
}: InitOptions) => {
  try {
    // Handle backward compatibility: if jsonSchemaPath is provided, use it
    const schemaPaths = jsonSchemaPaths || (jsonSchemaPath ? [jsonSchemaPath] : [])
    
    if (schemaPaths.length === 0) {
      throw new Error("No schema paths provided")
    }

    console.log(`Loading ${schemaPaths.length} OpenAPI schema(s)...`)
    
    // Load all schemas
    const schemas = await Promise.all(
      schemaPaths.map(async (schemaPath, index) => {
        console.log(`Loading schema ${index + 1}/${schemaPaths.length}: ${schemaPath}`)
        return await loadSchema(schemaPath)
      })
    )

    // Merge schemas if multiple, or use single schema
    const finalSchema = schemas.length > 1 ? mergeOpenAPISchemas(schemas) : schemas[0]

    // Save merged openapi json to local
    writeFileSync(
      path.join(path.dirname("."), jsonCachePath),
      JSON.stringify(finalSchema, null, 2),
      { encoding: "utf8" },
    )
    console.log(`Merged OpenAPI JSON saved to ${jsonCachePath}`)

    const output = await openapiTs(finalSchema)
    const content = `${importTemplate}\n${astToString(output)}\n${declareTemplate}`
    const finalContent = tryDecodeURIComponent(content)

    writeFileSync(
      path.join(path.dirname("."), `${definitionPath}`),
      finalContent,
      {
        encoding: "utf8",
      },
    )

    console.log(`TypeScript definitions generated to ${definitionPath}`)
    return Promise.resolve(true)
  } catch (error) {
    console.error("Error during getDefinition:", error)
    return Promise.reject(error)
  }
}

const tryDecodeURIComponent = (str: string) => {
  try {
    return decodeURIComponent(encodeURIComponent(str))
  } catch (e) {
    console.log("decodeURIComponent error: ", e)
    return str
  }
}
