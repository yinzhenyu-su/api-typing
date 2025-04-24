import { describe, it, expect } from "vitest"
import { getDefinition } from "../api-meta-init"

describe("test api-meta-init", () => {
  it("getDefinition", () => {
    const jsonSchemaPath = "./assets/pet.json"
    const definitionPath = "./api-typing-meta.d.ts"
    const jsonCachePath = "./api-typing-meta.openapi.json"

    expect(
      getDefinition({
        jsonSchemaPath,
        definitionPath,
        jsonCachePath,
      }),
    ).resolves.toBeTruthy()
  })
})
