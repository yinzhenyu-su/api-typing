import type { Equal } from "@/src/util/type-util"
import type {
  Extract200JSON,
  ExtractMethodResponseStatusContentJSON,
  PathKeyOfMethod,
  PathKeyUnion,
} from "@/src/index"

import { createHTTPClient } from "../index"

async function getPets() {
  return await createHTTPClient().get("/pets/{id}", {
    params: { id: 0 },
  })
}

async function postPet() {
  return await createHTTPClient().post("/pets", { name: "dog", tag: "pet" })
}

async function deletePet() {
  return await createHTTPClient().delete<"/pets/{id}", 204>("/pets/{id}", {
    params: { id: 1 },
    __is_config: true,
  })
}

async function getPet() {
  return await createHTTPClient().get("/pets/{id}", { params: { id: 0 } })
}

// ----------------------- type test -----------------------
type cases = [
  Equal<
    Awaited<ReturnType<typeof getPets>>["data"],
    Extract200JSON<"get", "/pets/{id}">
  >,
  Equal<
    Awaited<ReturnType<typeof postPet>>["data"],
    ExtractMethodResponseStatusContentJSON<"post", 200, "/pets">
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

const a: ExtractMethodResponseStatusContentJSON<"delete", 204, "/pets/{id}"> =
  null as never

const b: ExtractMethodResponseStatusContentJSON<"get", 200, "/pets/{id}"> = {
  id: 1,
  name: "dog",
  tag: "pet",
}

const c: ExtractMethodResponseStatusContentJSON<"post", 400, "/pets"> = {
  code: 200,
  message: "error",
}

const allPaths: PathKeyOfMethod<"delete"> = "/pets/{id}"

const allPaths2: PathKeyUnion = "/pets/{id}"

// ----------------------- type test end -----------------------
