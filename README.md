# api-typing

[![npm version](https://badgen.net/npm/v/api-typing)](https://npm.im/api-typing)

## ![api-typing](https://github.com/yinzhenyu-su/api-typing/blob/main/api-typing.gif?raw=true)

---

English | [简体中文](./README.zh-Hans.md)

## A strong type-hint http client framwork(based on axios).

    Dear front-end colleagues, are you fed up with the interface with the back-end every day, adjusting the interface path and parameter transfer format? Tired of viewing backend documentation? Are you tired of checking and synchronizing the interface field changes after each update? It's time to make these jobs a little easier.

## Install

```bash
pnpm i api-typing
```

## Usage

1.  set a script to run `get-types` in `package.json`

    ```json
    {
      "scripts": {
        "get-types": "get-types \"https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json\" \"./api-typing-meta.d.ts\""
      }
    }
    ```

    the first argument is a openapi definition file, json format.
    the second argument is auto-generated type definetion file name with default value `api-typing-meta.d.ts`

2.  run

    ```bash
    pnpm run get-types
    ```

    the type definition file would be generated in your project root.

3.  declare module 'api-typing' with auto-generated definetions, it is in your project root. make sure your `tsconfig.json` include this declare.

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

4.  import and enjoy it!

    ```ts
    import { create } from "api-typing"
    create({ baseURL: "your baseURL" })
      .post("choose/url/with/hint", {
        /**
         * request field with type-hint
         */
      })
      .then((d) => {
        /**
         * response field with type-hint
         */
      })
    ```
