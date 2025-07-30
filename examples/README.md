# Examples

This directory contains examples demonstrating how to use the new generic support for `ApiTypingMeta`.

## Files

### `simple-example.ts`
A basic example showing:
- How to define custom API types
- Creating a type-safe HTTP client with custom types
- Backward compatibility with default types

### `comprehensive-example.ts`
A complete example demonstrating:
- Complex custom API type definitions
- Type extraction and reuse
- Building a service class with full type safety
- Error handling with typed responses
- Integration with existing code

## Key Features Demonstrated

1. **Custom Type Definitions**: Define your own API structure instead of relying on auto-generated types
2. **Type Safety**: Full IntelliSense and compile-time checking
3. **Backward Compatibility**: Existing code continues to work without changes
4. **Type Extraction**: Reuse and extract types for different parts of your application
5. **Flexible Architecture**: Support for complex, real-world API scenarios

## Quick Start

```typescript
import { createHTTPClient, type ApiTyping } from "api-typing"

// Define your API structure
interface MyApiTypes extends ApiTyping {
  paths: {
    "/endpoint": {
      get: {
        parameters: {}
        responses: {
          200: {
            content: {
              "application/json": { message: string }
            }
          }
        }
      }
    }
  }
  components: {}
  operations: {}
  external: {}
}

// Create type-safe client
const api = createHTTPClient<MyApiTypes>()

// Enjoy full type safety
const response = await api.get("/endpoint")
console.log(response.data.message) // Fully typed!
```

For more details, see the [Generic Support Documentation](../docs/pro/generic-support.md).