# `npm:` 规范

自 Deno 版本 1.28 起，它原生支持导入 npm 包。这是通过使用 `npm:`
规范进行导入实现的。

请看下面的示例：

```ts, ignore
import chalk from "npm:chalk@5";

console.log(chalk.green("Hello!"));
```

使用的 npm 规范的格式如下：

```ts, ignore
npm:<package-name>[@<version-requirement>][/<sub-path>]
```

以下是使用 express 的另一个示例：

```js, ignore
// main.js
import express from "npm:express@^4.17";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
console.log("listening on http://localhost:3000/");
```

要启动简单的 express 服务器，请执行以下操作：

```sh
$ deno run -A main.js
listening on http://localhost:3000/
```

在此过程中，无需执行 `npm install`，也不会创建 `node_modules`
文件夹。这些包也要与 Deno 应用程序具有相同的权限。

这些特定规格目前适用于所有 `deno` 子命令，不包括 `deno compile` 和
`deno vendor`。

## npm 可执行脚本

带有 `bin` 条目的 npm 包可使用以下格式的规范在命令行上执行，而不需要执行
`npm install`：

```ts, ignore
npm:<package-name>[@<version-requirement>][/<binary-name>]
```

例如：

```sh
$ deno run --allow-env --allow-read npm:cowsay@1.5.0 Hello there!
 ______________
< Hello there! >
 --------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

$ deno run --allow-env --allow-read npm:cowsay@1.5.0/cowthink What to eat?
 ______________
( What to eat? )
 --------------
        o   ^__^
         o  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## TypeScript 类型

许多包都内置了类型，您可以轻松地导入它们并使用它们：

```ts, ignore
import chalk from "npm:chalk@5";
```

虽然某些包不具备类型，但是您可以使用
[`@deno-types`](../advanced/typescript/types.md) 指令指定其类型。例如，使用一个
[`@types`](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#definitelytyped--types)
包：

```ts, ignore
// @deno-types="npm:@types/express@^4.17"
import express from "npm:express@^4.17";
```

### 包含 Node 类型

Node 自带许多内置类型，例如 `Buffer`，可能会在 npm
包的类型中进行引用。要加载这些类型，必须向 `@types/node`
包添加一个类型引用指令：

```ts, ignore
/// <reference types="npm:@types/node" />
```

请注意，在大多数情况下，不指定此问题的版本是可以的，因为 Deno 将尝试将其与其内部
Node 代码保持同步，但是您可以始终在必要时覆盖使用的版本。

## `--node-modules-dir` 标志

npm 规范将 npm 包解析到一个中央全局 npm
缓存中。在大多数情况下，这很有效，而且是理想的，因为它使用的空间较少，也不需要
`node_modules` 目录。但是，您可能会发现有时会出现 npm 包期望从 `node_modules`
目录执行本身的情况。为了提高兼容性并支持那些包，您可以使用 `--node-modules-dir`
标志。

例如，给定 `main.ts`：

```ts
import chalk from "npm:chalk@5";

console.log(chalk.green("Hello"));
```

以以下方式使用 `--node-modules-dir` 运行此脚本...

```sh
deno run --node-modules-dir main.ts
```

...将在当前目录中创建一个 `node_modules` 文件夹，其类似于 npm 的文件夹结构。

![](../images/node_modules_dir.png)

请注意，这是在调用 `deno run` 时自动完成的，不需要单独的安装命令。

在您想修改 `node_modules` 目录之前，您可以使用 `--node-modules-dir` 运行
`deno cache`，修改其内容，然后再运行脚本。

例如：

```sh
deno cache --node-modules-dir main.ts
deno run --allow-read=. --allow-write=. scripts/your_script_to_modify_node_modules_dir.ts
deno run --node-modules-dir main.ts
```
