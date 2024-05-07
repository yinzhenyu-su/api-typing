#!/usr/bin/env node
import { getDefinition } from "../outdir/api-meta-init.js"

const argv = process.argv.slice(2)
if (!argv.length) {
  console.log(`info: please define a jsonSchemaPath.\n
  Usage: get-types <jsonSchemaPath> <definitionPath> \n
  Example: \n
    get-types ./schema.json ./types.d.ts\n
    get-types http://test.com/schema.json ./types.d.ts\n`)
  process.exit()
}
async function run() {
  return await getDefinition({
    jsonSchemaPath: argv[0],
    definitionPath: argv[1],
  })
}
run()
