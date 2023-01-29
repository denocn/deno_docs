<<<<<<< HEAD:node/cheatsheet.md
## Node -> Deno 速查表
=======
# Node.js -> Deno cheatsheet
>>>>>>> 269b65fff9d4afd10a59af9d829b8a01ce1884df:references/cheatsheet.md

| Node.js                                | Deno                                           |
| -------------------------------------- | ---------------------------------------------- |
| `node file.js`                         | `deno run file.js`                             |
| `ts-node file.ts`                      | `deno run file.ts`                             |
| `npm i -g`                             | `deno install`                                 |
| `npm i` / `npm install`                | _n/a_ ¹                                        |
| `npm run`                              | `deno task`                                    |
| `eslint`                               | `deno lint`                                    |
| `prettier`                             | `deno fmt`                                     |
| `rollup` / `webpack` / etc             | `deno bundle`                                  |
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

<<<<<<< HEAD:node/cheatsheet.md
¹ 查看 [链接至外部代码](../linking_to_external_code.md)，在首次运行的时候 Deno 会下载并缓存所有代码。
=======
¹ See [Modules](../basics/modules.md), the runtime downloads and caches the code
on first use.
>>>>>>> 269b65fff9d4afd10a59af9d829b8a01ce1884df:references/cheatsheet.md

² 自动进行类型检查，TypeScript 编译器已经内置到了 `deno` 可执行文件中。
