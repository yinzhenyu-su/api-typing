import type {
  components,
  paths,
  external,
  operations,
} from "../api-typing-meta.d"

declare module "../src/index" {
  export interface ApiTypingMeta {
    components: components
    paths: paths
    external: external
    operations: operations
  }
}

import { createHTTPClient } from "../src/index"
