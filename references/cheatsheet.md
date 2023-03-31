# Node.js -> Deno 速查表

| Node.js                                | Deno                                           |
| -------------------------------------- | ---------------------------------------------- |
| `node file.js`                         | `deno run file.js`                             |
| `ts-node file.ts`                      | `deno run file.ts`                             |
| `node -e`                              | `deno eval`                                    |
| `npm i -g`                             | `deno install`                                 |
| `npm i` / `npm install`                | _n/a_ ¹                                        |
| `npm run`                              | `deno task`                                    |
| `eslint`                               | `deno lint`                                    |
| `prettier`                             | `deno fmt`                                     |
| `package.json`                         | `deno.json` / `deno.jsonc` / `import_map.json` |
| `tsc`                                  | `deno check` ²                                 |
| `typedoc`                              | `deno doc`                                     |
| `jest` / `ava` / `mocha` / `tap` / etc | `deno test`                                    |
| `nodemon`                              | `deno run/lint/test --watch`                   |
| `nexe` / `pkg`                         | `deno compile`                                 |
| `npm explain`                          | `deno info`                                    |
| `nvm` / `n` / `fnm`                    | `deno upgrade`                                 |
| `tsserver`                             | `deno lsp`                                     |
| `nyc` / `c8` / `istanbul`              | `deno coverage`                                |
| benchmarks                             | `deno bench`                                   |

¹ 参见 [模块](../basics/modules.md)，运行时会在第一次使用时下载和缓存代码。

² 类型检查自动进行，TypeScript 编译器内置于 `deno` 二进制文件中。
