# Multiple OpenAPI Documents Support

API-Typing now supports merging multiple OpenAPI documents into a single type-safe HTTP client.

## Usage

### CLI Command

You can now pass multiple OpenAPI schema paths separated by commas:

```bash
# Single schema (existing functionality)
get-types ./api1.json ./api-typing-meta.d.ts

# Multiple schemas (new functionality)
get-types ./api1.json,./api2.json ./api-typing-meta.d.ts

# Multiple remote schemas
get-types http://api1.com/schema.json,http://api2.com/schema.json ./api-typing-meta.d.ts

# Mixed local and remote schemas
get-types ./local-api.json,http://remote-api.com/schema.json ./api-typing-meta.d.ts
```

### Programmatic Usage

```typescript
import { getDefinition } from 'api-typing'

// Single schema (backward compatible)
await getDefinition({
  jsonSchemaPath: './api.json',
  definitionPath: './api-typing-meta.d.ts'
})

// Multiple schemas (new functionality)
await getDefinition({
  jsonSchemaPaths: ['./api1.json', './api2.json'],
  definitionPath: './api-typing-meta.d.ts'
})
```

## How It Works

When multiple OpenAPI schemas are provided:

1. **Schema Loading**: Each schema is loaded independently (from files or URLs)
2. **Path Merging**: All paths from all schemas are combined into a single paths object
3. **Component Merging**: Components (schemas, responses, parameters, etc.) are merged
4. **Metadata Merging**: Tags, servers, and other metadata are combined
5. **Type Generation**: A single TypeScript definition file is generated with all merged types

## Schema Merging Rules

- **Paths**: All paths from all schemas are included. If the same path exists in multiple schemas, the HTTP methods are merged
- **Components**: All components are merged by name. Conflicts are resolved by the last schema in the list
- **Info**: The title is combined from all schemas (e.g., "API1 & API2")
- **Tags**: All unique tags are included
- **Servers**: All unique servers are included

## Example

Given two schemas:

**api1.json** (Pet Store API):
```json
{
  "paths": {
    "/pets": { "get": {...}, "post": {...} },
    "/pets/{id}": { "get": {...}, "put": {...} }
  }
}
```

**api2.json** (User API):
```json
{
  "paths": {
    "/users": { "get": {...}, "post": {...} },
    "/users/{id}": { "get": {...}, "put": {...} }
  }
}
```

**Merged Result**:
```json
{
  "paths": {
    "/pets": { "get": {...}, "post": {...} },
    "/pets/{id}": { "get": {...}, "put": {...} },
    "/users": { "get": {...}, "post": {...} },
    "/users/{id}": { "get": {...}, "put": {...} }
  }
}
```

## Type Safety

The generated types will include all endpoints from all schemas:

```typescript
import { createHTTPClient } from 'api-typing'

const client = createHTTPClient({
  baseURL: 'https://api.example.com'
})

// Types for both APIs are available
await client.get('/pets/{id}', { params: { id: 1 } })    // Pet API
await client.get('/users/{id}', { params: { id: 1 } })   // User API
```

## Backward Compatibility

All existing functionality remains unchanged. Single schema usage continues to work exactly as before.