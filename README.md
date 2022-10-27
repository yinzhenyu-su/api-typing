# api-typing

[![npm version](https://badgen.net/npm/v/api-typing)](https://npm.im/api-typing)

![api-typing](/api-typing.gif?raw-true)

## Install

```bash
pnpm i api-typing
```

## Usage

1.  set a script to run `get-types`

        ```json
        {
          "scripts": {
            "get-types": "get-types \"http://https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json\" \"./api-typing.d.ts\""
          }
        }
        ```

        the first argument is a openapi definition file, json format.
        the second argument is auto-generated type definetion file name with default value `api-typing.d.ts`

2.  run

        ```bash
        pnpm run get-types
        ```

the type definition file would be generated in your project root.

3. declare module 'api-typing' with auto-generated definetions, it is in your project root. make sure your `tsconfig.json` include this declare.

   ```ts
   import { paths, components, external, operations } from "./api-typing"
   declare module "api-typing" {
     interface ApiTypingMeta {
       paths: paths
       components: components
       external: external
       operations: operations
     }
   }
   ```

4. import and enjoy it!

   ```ts
   import { create } from "api-typing"
   create({ baseURL: "your baseURL" })
     .post("auto/complete/url", {
       /**
        * auto complete request json data
        */
     })
     .then((d) => {
       /**
        * auto complete response json data
        */
     })
   ```
