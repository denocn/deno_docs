# 模块

## 概念

- [Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
  允许你包含并使用存放在本地文件系统或远程的其他模块。
- 导入是 URL 或文件系统路径。
- [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
  允许你指定模块的哪些部分可以被导入模块的用户访问。

## 概述

Deno 默认使用 ECMAScript 6 的 `import/export` 标准，以让 JavaScript 和
TypeScript 的模块导入方式标准化。

它采用了类似于浏览器的模块解析规则，意味着文件名必须全部指定，你不能省略文件扩展名，也没有对
`index.js` 的特殊处理。

```js, ignore
import { add, multiply } from "./arithmetic.ts";
```

它也直接导入所有依赖，没有包管理的额外开销。本地模块的导入方式与远程模块完全相同。如下面的例子所示，无论使用本地模块还是远程模块，都可以使用同一种方法实现相同的功能。

## 本地导入

在这个例子中，`add` 和 `multiply` 函数是从一个本地 `arithmetic.ts` 模块导入的。

**命令：** `deno run local.ts`

```ts, ignore
/**
 * local.ts
 */
import { add, multiply } from "./arithmetic.ts";

function totalCost(outbound: number, inbound: number, tax: number): number {
  return multiply(add(outbound, inbound), tax);
}

console.log(totalCost(19, 31, 1.2));
console.log(totalCost(45, 27, 1.15));

/**
 * 输出
 *
 * 60
 * 82.8
 */
```

## 远程导入

在上面的本地导入示例中，从一个本地存储的算术模块导入了 `add` 和 `multiply`
方法。还可以通过从远程模块导入 `add` 和 `multiply` 方法来创建相同的功能。

在这种情况下，引用了 Ramda 模块，包括版本号。还要注意的是，JavaScript
模块直接导入到 TypeScript 模块中，Deno 可以处理。

**命令：** `deno run ./remote.ts`

```ts
/**
 * remote.ts
 */
import {
  add,
  multiply,
} from "https://x.nest.land/ramda@0.27.0/source/index.js";

function totalCost(outbound: number, inbound: number, tax: number): number {
  return multiply(add(outbound, inbound), tax);
}

console.log(totalCost(19, 31, 1.2));
console.log(totalCost(45, 27, 1.15));

/**
 * 输出
 *
 * 60
 * 82.8
 */
```

## Export

在上面的本地导入示例中，从一个本地存储的算术模块导入了 `add` 和 `multiply`
函数。为了实现这一点，必须导出存储在模块中的函数。只需在函数签名的开头添加关键字
`export`，如下所示：

```ts
/**
 * arithmetic.ts
 */
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}
```

内部模块中需要在外部模块中访问的所有函数、类、常量和变量都必须导出。要么在它们前面加上
`export` 关键字，要么在文件底部包含它们在内的一个导出语句。

## 常见问题

### 如何导入模块的特定版本？

在 URL 中指定版本。例如，此 URL
完全指定了要运行的代码：`https://unpkg.com/liltest@0.0.5/dist/liltest.js`。

### 在各处导入 URL 看起来很难管理。

> 如果其中一个 URL 链接到一个不同的库版本会怎样？

> 在大型项目中到处维护 URL 是否容易出错？

解决方法是在一个名为 `deps.ts`
的中心文件中导入和重新导出外部库（该文件的作用类似于 Node 的 `package.json`
文件）。例如，假设你在一个大型项目中使用上面的断言库。你可以在任何地方导入
`deps.ts`，避免多次引用相同的 URL。

**deps.ts**

```ts
export {
  assert,
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
```

在同一个项目中，你可以从 `deps.ts` 中导入，避免许多对同一 URL 的引用：

```ts, ignore
import { assertEquals, runTests, test } from "./deps.ts";
```

这种设计可以回避由包管理软件、集中式代码库和重复的文件格式引发的复杂性。

### 如何信任可能会改变的 URL？

通过使用锁文件（使用 `--lock` 命令行标志），可以确保从 URL
提取的代码与开发期间保持一致。你可以在[这里](./modules/integrity_checking.md)了解更多信息。

### 但如果 URL 的主机关闭了呢？源代码将不再可用。

与上面类似，这是任何远程依赖系统所面临的问题。依赖外部服务器对开发来说很方便，但在生产中很容易出错。生产软件应始终整合其依赖关系。在
Node 中，通过将 `node_modules` 检查到源码控制中来实现。在 Deno 中，使用
[`deno vendor`](../tools/vendor.md) 子命令来实现。
