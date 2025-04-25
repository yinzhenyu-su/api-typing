import { describe, it, expect } from "vitest"
import { getDefinition } from "../api-meta-init"

describe("test api-meta-init", () => {
  it("getDefinition", async () => {
    const jsonSchemaPath = "./assets/pet.json"
    const definitionPath = "./api-typing-meta.d.ts"
    const jsonCachePath = "./api-typing-meta.openapi.json"

    const resolve = await getDefinition({
      jsonSchemaPath,
      definitionPath,
      jsonCachePath,
    })
    expect(resolve).toBeTruthy()
  })
})
