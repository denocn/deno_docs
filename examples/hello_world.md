# 你好，世界

## 概念

- Deno 能够直接运行 JavaScript 或 TypeScript，无需额外的工具或配置。

## 概述

Deno 是一个安全的运行时环境，可用于运行 JavaScript 和
TypeScript。如下面的示例所示，JavaScript 和 TypeScript 可以实现相同的功能，而
Deno 都可以执行。

## JavaScript 示例

此 JavaScript 示例将消息“Hello [name]”打印到控制台，并确保提供的名字已大写。

**命令：** `deno run hello-world.js`

```js
/**
 * hello-world.js
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function hello(name) {
  return "Hello " + capitalize(name);
}

console.log(hello("john"));
console.log(hello("Sarah"));
console.log(hello("kai"));

/**
 * 输出：
 *
 * Hello John
 * Hello Sarah
 * Hello Kai
 */
```

## TypeScript 示例

此 TypeScript 示例与上面的 JavaScript
示例完全相同，但代码具有额外的类型信息，TypeScript 支持这些信息。

`deno run` 命令完全相同，只是引用了一个 `*.ts` 文件，而不是 `*.js` 文件。

**命令：** `deno run hello-world.ts`

```ts
/**
 * hello-world.ts
 */
function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function hello(name: string): string {
  return "Hello " + capitalize(name);
}

console.log(hello("john"));
console.log(hello("Sarah"));
console.log(hello("kai"));

/**
 * 输出：
 *
 * Hello John
 * Hello Sarah
 * Hello Kai
 */
```
