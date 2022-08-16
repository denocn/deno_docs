# Deno 风格指南 {#deno-style-guide}

> ⚠️ Note that this is the style guide for **internal runtime code** in the Deno
> runtime, and in the Deno standard library. This is not meant as a general
> style guide for users of Deno.

## 版权声明信息 {#copyright-headers}

项目中的大多数模块应有如下版权声明：

```ts
// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
```

如果引用了其他地方的代码，请确保文件有恰当的版权声明。我们只允许使用遵循 MIT、BSD 和 Apache 协议的代码。

## 文件命名时请使用下划线连接，而非连字符 {#use-underscores-not-dashes-in-filenames}

举例: 使用 `file_server.ts` 而不是 `file-server.ts`.

## 增加对新功能的测试 {#add-tests-for-new-features}

每个模块都应包含或附有对其公有功能的测试。

## TODO 注释 {#todo-comments}

TODO 注释通常应该在括号中包含 Issue ID 或作者的 Github 用户名。举例：

```ts
// TODO(ry): Add tests.
// TODO(#123): Support Windows.
// FIXME(#349): Sometimes panics.
```

## 不提倡使用元编程，如 Proxy {#meta-programming-is-discouraged-including-the-use-of-proxy}

即便意味着要写更多的代码，也要明确地表达（代码含义）。

在某些情况下，使用元编程是有意义的，但在绝大多数情况下是毫无意义的。

## 包容性守则 {#inclusive-code}

请遵循以下网址所概述的包容性守则的指导方针
https://chromium.googlesource.com/chromium/src/+/master/styleguide/inclusive_code.md.

## Rust {#rust}

遵循 Rust 的惯例，并与现有代码保持一致。

## TypeScript {#typescript}

代码库中的 TypeScript 部分包括标准库 `std`。

### 使用 TypeScript 而非 JavaScript {#use-typescript-instead-of-javascript}

### 使用术语 "module" 而非 "library" 或 "package". {#use-the-term-module-instead-of-library-or-package}

为了保持清晰性和一致性，请避免使用 "library" 和 "package"。使用 "module" 来指代一个 JS 或 TS 文件，也可以指代一个目录中的
TS/JS 代码。

### 不要用 `index.ts`/`index.js` 当文件名 {#do-not-use-the-filename-indextsindexjs}

Deno 不会对 "index.js" 或 "index.ts" 进行特殊处理。虽然要使用这些文件名，但又不能将它们排除在模块说明符之外，这令人十分困惑。

如果一个代码目录需要一个默认的入口，请使用文件名 `mod.ts`。文件名 `mod.ts` 遵循 Rust 的惯例， 它比 `index.ts`
更短，并且无需事先知道它是如何工作的。

### 导出函数：最多 2 个参数，把其余的参数放入一个配置对象中 {#exported-functions-max-2-args-put-the-rest-into-an-options-object}

当设计函数接口时，应遵循以下规则。

1. 组成公共 API 的函数拥有 0-2 个必选参数，和（如果必要）一个可选对象（总共最多 3 个）。

2. 可选参数一般应放入可选对象中。 仅有一个不在可选对象中的可选参数是可接受的，并且未来不考虑新增可选参数。

3. 可选参数是唯一的参数且是一个常规的对象。

   其他的参数可以是对象，但他们必须能够与普通的对象运行时区分开来，通过拥有以下内容：

   - 可辨识原型（例如：`Array`、`Map`、`Date`、`class MyThing`）。
   - 已知的符号属性 (e.g. an iterable with `Symbol.iterator`).

   这使得 API 即使当选项对象的位置发生变化时，也能以一种向后兼容的方式发展。

```ts, ignore
// BAD: 可选参数不是可选对象的一部分 (#2)
export function resolve(
  hostname: string,
  family?: "ipv4" | "ipv6",
  timeout?: number,
): IPAddress[] {}
```

```ts, ignore
// GOOD.
export interface ResolveOptions {
  family?: "ipv4" | "ipv6";
  timeout?: number;
}
export function resolve(
  hostname: string,
  options: ResolveOptions = {},
): IPAddress[] {}
```

```ts, ignore
export interface Environment {
  [key: string]: string;
}

// BAD: `env` 可以是一个常规的对象因此不能与可选对象区分开来。 (#3)
export function runShellWithEnv(cmdline: string, env: Environment): string {}

// GOOD.
export interface RunShellOptions {
  env: Environment;
}
export function runShellWithEnv(
  cmdline: string,
  options: RunShellOptions,
): string {}
```

```ts
// BAD: 多于 3 个参数 (#1), 且有多个可选参数 (#2).
export function renameSync(
  oldname: string,
  newname: string,
  replaceExisting?: boolean,
  followLinks?: boolean,
) {}
```

```ts
// GOOD.
interface RenameOptions {
  replaceExisting?: boolean;
  followLinks?: boolean;
}
export function renameSync(
  oldname: string,
  newname: string,
  options: RenameOptions = {},
) {}
```

```ts
// BAD: 参数过多 (#1)
export function pwrite(
  fd: number,
  buffer: ArrayBuffer,
  offset: number,
  length: number,
  position: number,
) {}
```

```ts
// BETTER.
export interface PWrite {
  fd: number;
  buffer: ArrayBuffer;
  offset: number;
  length: number;
  position: number;
}
export function pwrite(options: PWrite) {}
```

### 导出所有被依赖的接口 {#export-all-interfaces-that-are-used-as-parameters-to-an-exported-member}

被导出函数签名中所依赖的接口，请一并导出。示例如下：

```ts, ignore
// my_file.ts
export interface Person {
  name: string;
  age: number;
}

export function createPerson(name: string, age: number): Person {
  return { name, age };
}

// mod.ts
export { createPerson } from "./my_file.ts";
export type { Person } from "./my_file.ts";
```

### 最小化依赖; 不要循环导入 {#minimize-dependencies-do-not-make-circular-imports}

虽然 `std` 没有外部依赖关系，但我们仍须注意保持简单的内部依赖关系和可管理性。特别是要注意不要引入循环导入。

### 不要引入下划线开头的文件 {#if-a-filename-starts-with-an-underscore-_foots-do-not-link-to-it}

必要的内部模块有着尚不稳定的 API 或未被链接的情况时常会发生。这种情况下我们会在它前面加上下划线。按照惯例，只有同目录下的文件应能导入它。

### 导出项使用 JSDoc 注释 {#use-jsdoc-for-exported-symbols}

我们力求提供完整的文档。每个导出项最好都有一行文档描述。

尽可能使用单行 JSDoc 注释，举例：

```ts
/** foo does bar. */
export function foo() {
  // ...
}
```

文档易读性是重要的，但也需要提供额外的样式信息，以确保生成的文档是更丰富的文本。因此 JSDoc 一般应遵循 markdown 标记来丰富文本。

虽然 markdown 支持 HTML 标签，但在 JSDoc 块中是被禁止的。

代码字符串应当使用反引号 (\`) 而非引号来表示。举例：

```ts
/** 从 `deno` 模块中导入一些东西 */
```

无需记录函数的参数，除非函数参数无法做到见名知意。（尽管参数做到了见名知意，但最终还应以 API 为准）。因此一般无需使用
`@param`。如果一定要用，它不应当包含 `type`，因为 TypeScript 已经在这方面做的很好了。

```ts
/**
 * 函数参数无法见名知意
 * @param foo Description of non obvious parameter.
 */
```

应尽可能减少垂直间距。因此，单行注释应写成：

```ts
/** 这是一个被提倡的单行 JSDoc 注释 */
```

不要这样做:

```ts
/**
 * 这是一个不被提倡的单行 JSDoc 注释
 */
```

示例代码使用 markdown 格式。举例：

````ts
/** A straightforward comment and an example:
 * ```ts
 * import { foo } from "deno";
 * foo("bar");
 * ```
 */
````

代码示例不应包含额外的注释，也不应该缩进，因为它已经在注释里面了。还需要进一步说明的示例不好。

### 使用指令来解决 linting 问题 {#resolve-linting-problems-using-directives}

在当前的构建过程中，使用 `dlint` 来校验代码中的 linting 问题。 如果任务对 linter 来说是不合格的话，使用
`deno-lint-ignore <code>` 指令来抑制警告。

```typescript
// deno-lint-ignore no-explicit-any
let x: any;
```

这可保证持续集成的过程不会因为 linting 的问题而失败，但应尽量少用。

### 每个模块应附带一个测试模块 {#each-module-should-come-with-a-test-module}

每个具有公共功能的模块 `foo.ts` 都应该有一个测试模块 `foo_test.ts`。 对 `std` 模块的测试应该放在 `std/tests`
中，因为它们拥有不同的上下文，否则它应该只是被测试模块的兄弟。

### 单元测试应该是明确的 {#unit-tests-should-be-explicit}

为了更好地理解测试，函数的名称在整个测试命令中都应有正确的提示。如下：

```
test myTestFunction ... ok
```

测试样例:

```ts, ignore
import { assertEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
import { foo } from "./mod.ts";

Deno.test("myTestFunction", function () {
  assertEquals(foo(), { bar: "bar" });
});
```

### 顶层函数不应使用箭头函数语法。 {#top-level-functions-should-not-use-arrow-syntax}

顶层函数应使用 `function` 关键字。 箭头语法应局限于闭包。

Bad:

```ts
export const foo = (): string => {
  return "bar";
};
```

Good:

```ts
export function foo(): string {
  return "bar";
}
```

### `std` {#std}

#### 不要依赖外部代码 {#do-not-depend-on-external-code}

`https://deno.land/std/` 旨在成为所有 Deno 程序可以依赖的基础。 我们向用户保证，这些代码不包含可能未经审查的第三方代码。

#### 记录并维护浏览器的兼容性 {#document-and-maintain-browser-compatibility}

如果一个模块与浏览器兼容，请在模块顶部的 JSDoc 中加入以下内容。

```ts
// This module is browser-compatible.
```

通过不使用全局的 `Deno` 命名空间或对其进行功能测试来保持这种模块的浏览器兼容性，来确保任何新的依赖项也能与浏览器兼容。
