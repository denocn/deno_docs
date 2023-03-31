# 在 Deno 中使用 deno-dom

[deno-dom](https://deno.land/x/deno_dom) 是在 Deno 中实现的 DOM 和 HTML
解析器。它是通过 Rust (通过 Wasm) 和 TypeScript
实现的。它还有一个“本地”实现，利用了 FFI 接口。

deno-dom 的目标是遵循规范，类似于 jsdom，但不同于
LinkeDOM。目前，对于解析数据结构之类的操作，deno-dom 比 LinkeDOM
慢，但在某些操作上更快。deno-dom 和 LinkeDOM 都比 jsdom 快得多。

截至 deno_dom v0.1.22-alpha，支持在 Deno Deploy
上运行。因此，如果您想严格遵循标准，请考虑使用 deno-dom 而不是 LinkeDOM。

## 基本示例

此示例将获取一个测试字符串，并将其解析为 HTML 并生成基于其的 DOM
结构。它将查询该 DOM 结构，挑选出遇到的第一个标题，并打印出该标题的文本内容:

```ts
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { assert } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";

const document = new DOMParser().parseFromString(
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Hello from Deno</title>
    </head>
    <body>
      <h1>Hello from Deno</h1>
      <form>
        <input name="user">
        <button>
          Submit
        </button>
      </form>
    </body>
  </html>`,
  "text/html",
);

assert(document);
const h1 = document.querySelector("h1");
assert(h1);

console.log(h1.textContent);
```

> 注意: 该示例使用了 `deno_land/x`
> 的未固定版本，您可能不想这样做，因为版本可能会更改并导致意外结果。您应该使用最新版本的
> [deno-dom](https://deno.land/x/deno_dom)。

## 更快的启动

仅导入 `deno-dom-wasm.ts` 文件将通过 top level await 触发 Wasm
代码的引导。问题在于 top level await 会阻止模块加载过程。特别是对于大型 Wasm
项目，初始化 Wasm 比模块加载完成后更具性能。

_deno-dom_有解决方案，它们提供了一个不自动初始化 Wasm
的库的替代版本，并要求您在代码中完成初始化:

```ts
import {
  DOMParser,
  initParser,
} from "https://deno.land/x/deno_dom/deno-dom-wasm-noinit.ts";

(async () => {
  // 在需要时初始化，但不在顶层
  await initParser();

  const doc = new DOMParser().parseFromString(
    `<h1>Lorem ipsum dolor...</h1>`,
    "text/html",
  );
})();
```

此外，使用 `deno-dom-native.ts` (需要 `--allow-ffi` 标志)
也将绕过启动惩罚，同时也不需要 `init()` 启动时间。这仅适用于 Deno CLI 而不是
Deploy。
