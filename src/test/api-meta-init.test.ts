import { describe, it, expect } from "vitest"
import { getDefinition } from "../api-meta-init"

describe("test api-meta-init", () => {
  it("getDefinition with single schema (backward compatibility)", async () => {
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
  
  it("getDefinition with multiple schemas", async () => {
    const jsonSchemaPaths = ["./assets/pet.json", "./assets/httpbin.json"]
    const definitionPath = "./api-typing-meta-multi.d.ts"
    const jsonCachePath = "./api-typing-meta-multi.openapi.json"

    const resolve = await getDefinition({
      jsonSchemaPaths,
      definitionPath,
      jsonCachePath,
    })
    expect(resolve).toBeTruthy()
  })
})
