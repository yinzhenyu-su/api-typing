import type { Equal } from "@/src/util/type-util"
import type {
  Extract200JSON,
  ExtractMethodResponseStatusContentJSON,
} from "@/src/index"

import { createHTTPClient } from "../index"
import { it, expectTypeOf } from "vitest"

const client = createHTTPClient({ baseURL: "https://httpbin.org/anything" })
async function getPets() {
  return await client.get("/pets/{id}", {
    params: { id: 0 },
  })
}

async function postPet() {
  return await client.post("/pets", { name: "dog", tag: "pet" })
}

async function deletePet() {
  return await client.delete<"/pets/{id}", 204>("/pets/{id}", {
    params: { id: 1 },
    __is_config: true,
  })
}

async function getPet() {
  return await client.get("/pets/{id}", { params: { id: 0 } })
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
    ExtractMethodResponseStatusContentJSON<"delete", 204, "/pets/{id}">
  >,
  Equal<
    Awaited<ReturnType<typeof getPet>>["data"],
    Extract200JSON<"get", "/pets/{id}">
  >,
] extends [true, true, true, true]
  ? true
  : false

const testType: cases = true

it("test core types", () => {
  it("response type should match", () => {
    expectTypeOf(testType).toExtend<true>()
  })
  it("shoud match 204", () => {
    const data: ExtractMethodResponseStatusContentJSON<
      "delete",
      204,
      "/pets/{id}"
    > = null as never
    expectTypeOf(data).toEqualTypeOf(data)
  })
  it("shoud match 200", () => {
    const data: ExtractMethodResponseStatusContentJSON<
      "get",
      200,
      "/pets/{id}"
    > = { id: 1, name: "dog" }
    expectTypeOf(data).toEqualTypeOf(data)
  })
  it("shoud match 400", () => {
    const data: ExtractMethodResponseStatusContentJSON<"post", 400, "/pets"> = {
      code: 400,
      message: "",
    }
    expectTypeOf(data).toEqualTypeOf(data)
  })
})
