#!/usr/bin/env node
import { getDefinition } from '../outdir/api-meta-init.mjs'

const argv = process.argv.slice(2);
if (!argv.length) {
  console.log('info: please define a jsonSchemaPath.')
  process.exit();
}
async function run() {
  return await getDefinition({ jsonSchemaPath: argv[0], definitionPath: argv[1] })
}
run();