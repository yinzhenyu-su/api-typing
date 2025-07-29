#!/usr/bin/env node
import { getDefinition } from "../outdir/api-meta-init.js"

const argv = process.argv.slice(2)
const envJsonSchemaPath = process.env.API_TYPING_JSON_SCHEMA_PATH
if (!envJsonSchemaPath && !argv.length) {
  console.log(`info: please define a jsonSchemaPath.\n
  Usage: get-types <jsonSchemaPath> <definitionPath> \n
         get-types <jsonSchemaPath1,jsonSchemaPath2,...> <definitionPath> \n
  Example: \n
    get-types ./schema.json ./api-typing-meta.d.ts\n
    get-types http://test.com/schema.json ./api-typing-meta.d.ts\n
    get-types ./schema1.json,./schema2.json ./api-typing-meta.d.ts\n
    get-types http://api1.com/schema.json,http://api2.com/schema.json ./api-typing-meta.d.ts\n`)
  process.exit()
}
async function run() {
  const jsonSchemaPathInput = argv[0] || envJsonSchemaPath
  // Support multiple schemas separated by comma
  const jsonSchemaPaths = jsonSchemaPathInput.includes(',') 
    ? jsonSchemaPathInput.split(',').map(path => path.trim())
    : [jsonSchemaPathInput]
    
  return await getDefinition({
    jsonSchemaPaths,
    definitionPath: argv[1],
  })
}
run()