import type { Equal, IsFalse, IsTrue } from "../util/type-util"
import type { Extract200JSON, ExtractRequestBodyJSON } from "@/src/index"
import type {
  components,
  paths,
  external,
  operations,
} from "../api-typing-meta.d"

declare module "@/src/index" {
  export interface ApiTypingMeta {
    components: components
    paths: paths
    external: external
    operations: operations
  }
}

import { createHTTPClient } from "../src/index"

async function getPets() {
  return await createHTTPClient().get("/pets", { query: { tags: [""] } })
}

async function postPet() {
  return await createHTTPClient().post("/pets", { name: "", tag: "" })
}

async function deletePet() {
  return await createHTTPClient().delete("/pets/{id}", {
    params: { id: 1 },
  })
}

async function getPet() {
  return await createHTTPClient().get("/pets/{id}", { params: { id: 0 } })
}

type cases = [
  Equal<
    Awaited<ReturnType<typeof getPets>>["data"],
    Extract200JSON<"get", "/pets">
  >,
  Equal<
    Awaited<ReturnType<typeof postPet>>["data"],
    Extract200JSON<"post", "/pets">
  >,
  Equal<
    Awaited<ReturnType<typeof deletePet>>["data"],
    Extract200JSON<"delete", "/pets/{id}">
  >,
  Equal<
    Awaited<ReturnType<typeof getPet>>["data"],
    Extract200JSON<"get", "/pets/{id}">
  >,
] extends [true, true, true, true]
  ? true
  : false

const test: cases = true
