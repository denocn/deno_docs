<<<<<<< HEAD
# `node:` 指定符

Deno 支持使用 Node.js 内置模块，如
[fs](https://nodejs.org/api/fs.html#file-system),
[path](https://nodejs.org/api/path.html#path),
[process](https://nodejs.org/api/process.html#process) 等等，通过 `node:`
指定符。
=======
# `node:` specifiers

Deno supports using Node.js built-in modules such as
[fs](https://nodejs.org/api/fs.html#file-system),
[path](https://nodejs.org/api/path.html#path),
[process](https://nodejs.org/api/process.html#process), and many more via
`node:` specifiers.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
import { readFileSync } from "node:fs";

console.log(readFileSync("deno.json", { encoding: "utf8" }));
```

<<<<<<< HEAD
请注意，通过光秃秃的指定符（例如
`import { readFileSync } from "fs";`）不受支持。如果您尝试这样做，并且裸指定符匹配未在导入映射中找到的
Node.js 内置模块，则 Deno 将提供有用的错误消息，询问您是否想要使用 `node:`
前缀导入该模块。此外，LSP 提供了一键修复，以更新为 `node:` 指定符。

如果您同时使用 Deno 和 Node.js 的代码，则 `node:`
方案将在两个运行时中均有效，并建议将其更新为您的 Node.js 代码。
=======
Take note that importing via a bare specifier (ex.
`import { readFileSync } from "fs";`) is not supported. If you attempt to do so
and the bare specifier matches a Node.js built-in module not found in an import
map, Deno will provide a helpful error message asking if you meant to import
with the `node:` prefix. Additionally the LSP provides a quick fix to update to
a `node:` specifier.

If you are using code both with Deno and Node.js, the `node:` scheme will work
in both runtimes and it's recommended to update to them for your Node.js code.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
