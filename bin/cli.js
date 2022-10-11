#!/usr/bin/env node
import { getDefinition } from '../dist/index.js'

const argv = process.argv.slice(2);
if (!argv.length) {
  console.log('info: please define a jsonSchemaPath.')
  process.exit();
}
getDefinition({ jsonSchemaPath: argv[0] });