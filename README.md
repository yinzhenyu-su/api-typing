# api-typing

[![npm version](https://badgen.net/npm/v/api-typing)](https://npm.im/api-typing)

## Install

```bash
pnpm i api-typing
```


## Usage
![api-typing](/api-typing.gif?raw-true)
1. set a script to run `get-types`
2. declare module 'api-typing' with auto-generated definetions, it is in your project root
    ```ts
     import { paths, components, external, operations } from './api-typing'
      declare module 'api-typing' {
        interface ApiTypingMeta {
          paths: paths,
          components: components,
          external: external,
          operations: operations,
        }
      }
    ```

3. import and enjoy it!
