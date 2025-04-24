import type { Equal } from "@/src/util/type-util"
import type {
  Extract200JSON,
  ExtractMethodResponseStatusContentJSON,
} from "@/src/index"

import { createHTTPClient } from "../index"
import { it, expectTypeOf, describe } from "vitest"
import type {
  GetArgs,
  PostArgs,
  PutArgs,
  PatchArgs,
  DelArgs,
} from "../core-type"

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

describe("test core types", () => {
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

describe("api-typing-meta 路径参数测试", () => {
  // 测试宠物API的GET请求参数
  it("应该支持 GET 请求的参数类型", () => {
    // GET /pets
    const args = ["/pets"] as GetArgs<"/pets">

    expectTypeOf(args).toExtend<GetArgs<"/pets">>()

    // GET /pets/{id}
    type PetByIdPathGet = "/pets/{id}"
    const argsWithPathParam: GetArgs<PetByIdPathGet> = [
      "/pets/{id}",
      {
        params: {
          id: 123,
        },
      },
    ]
    expectTypeOf(argsWithPathParam).toExtend<GetArgs<PetByIdPathGet>>()
  })

  // 测试宠物API的POST请求参数
  it("应该支持 POST 请求的参数类型", () => {
    // POST /pets
    type PetsPathPost = "/pets"
    const newPet = {
      name: "Fluffy",
      tag: "cat",
    }

    const args: PostArgs<PetsPathPost> = ["/pets", newPet]
    expectTypeOf(args).toExtend<PostArgs<PetsPathPost>>()
  })

  // 测试宠物API的PUT请求参数
  it("应该支持 PUT 请求的参数类型", () => {
    // PUT /pets/{id}
    type PetUpdatePath = "/pets/{id}"
    const updatedPet = {
      name: "NewName",
      tag: "updated",
    }

    const args: PutArgs<PetUpdatePath> = [
      "/pets/{id}",
      updatedPet,
      {
        params: {
          id: 456,
        },
      },
    ]

    expectTypeOf(args).toExtend<PutArgs<PetUpdatePath>>()
  })

  // 测试宠物API的PATCH请求参数
  it("应该支持 PATCH 请求的参数类型", () => {
    // PATCH /pets/{id}
    type PetPatchPath = "/pets/{id}"
    const patchData = {
      name: "PatchedName",
    }

    const args: PatchArgs<PetPatchPath> = [
      "/pets/{id}",
      patchData,
      {
        params: {
          id: 789,
        },
      },
    ]

    expectTypeOf(args).toExtend<PatchArgs<PetPatchPath>>()
  })

  // 测试宠物API的DELETE请求参数
  it("应该支持 DELETE 请求的参数类型", () => {
    // 通过路径参数删除
    type PetDeletePath = "/pets/{id}"
    const deleteByPathArgs: DelArgs<PetDeletePath> = [
      "/pets/{id}",
      {
        params: {
          id: 999,
        },
        __is_config: true,
      },
    ]

    expectTypeOf(deleteByPathArgs).toExtend<DelArgs<PetDeletePath>>()

    // 通过查询参数删除
    type PetDeleteByQueryPath = "/pets"
    const deleteByQueryArgs: DelArgs<PetDeleteByQueryPath> = [
      "/pets",
      {
        query: {
          id: 888,
        },
        __is_config: true,
      },
    ]

    expectTypeOf(deleteByQueryArgs).toExtend<DelArgs<PetDeleteByQueryPath>>()
  })
})
