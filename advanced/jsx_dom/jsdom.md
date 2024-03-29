# 在 Deno 中使用 jsdom

[jsdom](https://github.com/jsdom/jsdom) 是许多 Web 标准的纯 JavaScript
实现，特别是 WHATWG DOM 和 HTML
标准。其主要目标是全面和符合标准，不特别考虑性能。

如果您对服务器端渲染感兴趣，则 [deno-dom](./deno_dom.md) 和
[LinkeDOM](./linkedom.md)
都是更好的选择。如果您想要在“虚拟”浏览器中运行遵循标准的代码，则 jsdom
可能适合您。

虽然 jsdom 在 Deno CLI 下工作，但它不进行类型检查。这意味着您必须在命令行上使用
`--no-check=remote` 选项，以避免诊断停止程序的执行。

在编辑器中具有良好的类型设置需要一些工作流程的更改，因为提供 jsdom
类型的方式被声明为具有全局命名模块的全局类型定义，并利用内置 DOM 库的内置类型。

这意味着，如果您想在使用 Deno
语言服务器时在编辑器中获得强类型和智能自动完成，则必须执行一些额外的步骤。

### 定义 `import_map.json`

您需要将裸导入符号 `jsdom` 映射到导入版本的 jsdom。这允许 Deno
在指定的方式中正确应用类型到导入。

```json
{
  "jsdom": "https://esm.sh/jsdom"
}
```

### 设置配置文件

您需要在工作区的根目录中设置一个名为 `deno.jsonc` 的配置文件，其中包含
TypeScript 库信息以及指定上面定义的导入映射：

```jsonc
{
  "compilerOptions": {
    "lib": [
      "deno.ns",
      "dom",
      "dom.iterable",
      "dom.asynciterable"
    ]
  },
  "importMap": "./import_map.json"
}
```

> 注意：上面我们使用了一个未固定版本的
> jsdom。您应该考虑将版本固定为您知道要使用的版本。

## 基本示例

此示例将取一个测试字符串，将其解析为 HTML 并生成基于它的 DOM
结构。然后，它将查询该 DOM
结构，选择出它遇到的第一个标题，并打印出该标题的文本内容：

```ts, ignore
import { JSDOM } from "jsdom";
import { assert } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";

const { window: { document } } = new JSDOM(
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
  {
    url: "https://example.com/",
    referrer: "https://example.org/",
    contentType: "text/html",
    storageQuota: 10000000,
  },
);

const h1 = document.querySelector("h1");
assert(h1);

console.log(h1.textContent);
```
