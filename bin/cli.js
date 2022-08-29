#!/usr/bin/env node
import { init } from '../dist/index.js'

const argv = process.argv.slice(2);
if (!argv.length) {
  console.log('info: please define a jsonSchemaPath.')
  process.exit();
}
init({ jsonSchemaPath: argv[0] });