#!/usr/bin/env node
import { getDefinition } from "../outdir/api-meta-init.js"

const argv = process.argv.slice(2)
const envJsonSchemaPath = process.env.API_TYPING_JSON_SCHEMA_PATH
if (!envJsonSchemaPath && !argv.length) {
  console.log(`info: please define a jsonSchemaPath.\n
  Usage: get-types <jsonSchemaPath> <definitionPath> \n
  Example: \n
    get-types ./schema.json ./api-typing-meta.d.ts\n
    get-types http://test.com/schema.json ./api-typing-meta.d.ts\n`)
  process.exit()
}
async function run() {
  return await getDefinition({
    // read from env or argv
    jsonSchemaPath: argv[0] || envJsonSchemaPath,
    definitionPath: argv[1],
  })
}
run()