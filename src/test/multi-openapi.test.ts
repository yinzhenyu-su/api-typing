import { describe, it, expect } from "vitest"
import { getDefinition } from "../api-meta-init"
import { existsSync, readFileSync } from "fs"

describe("test multi-openapi support", () => {
  it("should support multiple OpenAPI schemas", async () => {
    const jsonSchemaPaths = ["./assets/pet.json", "./assets/httpbin.json"]
    const definitionPath = "./api-typing-meta-multi-test.d.ts"
    const jsonCachePath = "./api-typing-meta-multi-test.openapi.json"

    const resolve = await getDefinition({
      jsonSchemaPaths,
      definitionPath,
      jsonCachePath,
    })
    
    expect(resolve).toBeTruthy()
    
    // Verify that the generated files exist
    expect(existsSync(definitionPath)).toBeTruthy()
    expect(existsSync(jsonCachePath)).toBeTruthy()
    
    // Verify that the merged schema contains paths from both APIs
    const mergedSchema = JSON.parse(readFileSync(jsonCachePath, 'utf8'))
    expect(mergedSchema.paths).toBeDefined()
    expect(mergedSchema.paths['/pets']).toBeDefined() // from pet.json
    expect(mergedSchema.paths['/absolute-redirect/{n}']).toBeDefined() // from httpbin.json
    
    // Verify the title is combined
    expect(mergedSchema.info.title).toContain('Petstore')
    expect(mergedSchema.info.title).toContain('httpbin')
    
    // Verify the generated types include both APIs
    const generatedTypes = readFileSync(definitionPath, 'utf8')
    expect(generatedTypes).toContain('"/pets"')
    expect(generatedTypes).toContain('"/absolute-redirect/{n}"')
  })

  it("should maintain backward compatibility with single schema", async () => {
    const jsonSchemaPath = "./assets/pet.json"
    const definitionPath = "./api-typing-meta-single-test.d.ts"
    const jsonCachePath = "./api-typing-meta-single-test.openapi.json"

    const resolve = await getDefinition({
      jsonSchemaPath,
      definitionPath,
      jsonCachePath,
    })
    
    expect(resolve).toBeTruthy()
    
    // Verify that the generated files exist
    expect(existsSync(definitionPath)).toBeTruthy()
    expect(existsSync(jsonCachePath)).toBeTruthy()
    
    // Verify that the schema contains only pet API paths
    const schema = JSON.parse(readFileSync(jsonCachePath, 'utf8'))
    expect(schema.paths).toBeDefined()
    expect(schema.paths['/pets']).toBeDefined()
    expect(schema.paths['/absolute-redirect/{n}']).toBeUndefined()
    
    // Verify the original title is preserved
    expect(schema.info.title).toBe('Swagger Petstore')
  })

  it("should handle array with single schema same as single schema", async () => {
    const jsonSchemaPaths = ["./assets/pet.json"]
    const definitionPath = "./api-typing-meta-array-single-test.d.ts"
    const jsonCachePath = "./api-typing-meta-array-single-test.openapi.json"

    const resolve = await getDefinition({
      jsonSchemaPaths,
      definitionPath,
      jsonCachePath,
    })
    
    expect(resolve).toBeTruthy()
    
    // Verify that the schema is identical to single schema approach
    const schema = JSON.parse(readFileSync(jsonCachePath, 'utf8'))
    expect(schema.paths).toBeDefined()
    expect(schema.paths['/pets']).toBeDefined()
    expect(schema.paths['/absolute-redirect/{n}']).toBeUndefined()
    expect(schema.info.title).toBe('Swagger Petstore')
  })

  it("should throw error when no schema paths provided", async () => {
    await expect(getDefinition({})).rejects.toThrow("No schema paths provided")
  })
})