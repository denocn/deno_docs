<<<<<<< HEAD
# `npm:` 规范

自 Deno 版本 1.28 起，它原生支持导入 npm 包。这是通过使用 `npm:`
规范进行导入实现的。

请看下面的示例：
=======
# `npm:` specifiers

Since version 1.28, Deno has native support for importing npm packages. This is
done by importing using `npm:` specifiers.

The way these work is best described with an example:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
import chalk from "npm:chalk@5";

console.log(chalk.green("Hello!"));
```

<<<<<<< HEAD
使用的 npm 规范的格式如下：
=======
These npm specifiers have the following format:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
npm:<package-name>[@<version-requirement>][/<sub-path>]
```

<<<<<<< HEAD
以下是使用 express 的另一个示例：
=======
Another example with express:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

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

<<<<<<< HEAD
要启动简单的 express 服务器，请执行以下操作：
=======
Then doing the following will start a simple express server:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```sh
$ deno run -A main.js
listening on http://localhost:3000/
```

<<<<<<< HEAD
在此过程中，无需执行 `npm install`，也不会创建 `node_modules`
文件夹。这些包也要与 Deno 应用程序具有相同的权限。

这些特定规格目前适用于所有 `deno` 子命令，不包括 `deno compile` 和
`deno vendor`。

## npm 可执行脚本

带有 `bin` 条目的 npm 包可使用以下格式的规范在命令行上执行，而不需要执行
`npm install`：
=======
When doing this, no `npm install` is necessary and no `node_modules` folder is
created. These packages are also subject to the same permissions as Deno
applications.

These specifiers currently work with all `deno` subcommands, except
`deno compile` and `deno vendor`.

## npm executable scripts

npm packages with `bin` entries can be executed from the command line without an
`npm install` using a specifier in the following format:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
npm:<package-name>[@<version-requirement>][/<binary-name>]
```

<<<<<<< HEAD
例如：
=======
For example:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

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

<<<<<<< HEAD
## TypeScript 类型

许多包都内置了类型，您可以轻松地导入它们并使用它们：
=======
## TypeScript types

Many packages ship with types out of the box, you can import those and use them
with types easily:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
import chalk from "npm:chalk@5";
```

<<<<<<< HEAD
虽然某些包不具备类型，但是您可以使用
[`@deno-types`](../advanced/typescript/types.md) 指令指定其类型。例如，使用一个
[`@types`](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#definitelytyped--types)
包：
=======
Some packages do not though, but you can specify their types with a
[`@deno-types`](../advanced/typescript/types.md) directive. For example, using a
[`@types`](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html#definitelytyped--types)
package:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
// @deno-types="npm:@types/express@^4.17"
import express from "npm:express@^4.17";
```

<<<<<<< HEAD
### 包含 Node 类型

Node 自带许多内置类型，例如 `Buffer`，可能会在 npm
包的类型中进行引用。要加载这些类型，必须向 `@types/node`
包添加一个类型引用指令：
=======
### Including Node types

Node ships with many built-in types like `Buffer` that might be referenced in an
npm package's types. To load these you must add a types reference directive to
the `@types/node` package:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
/// <reference types="npm:@types/node" />
```

<<<<<<< HEAD
请注意，在大多数情况下，不指定此问题的版本是可以的，因为 Deno 将尝试将其与其内部
Node 代码保持同步，但是您可以始终在必要时覆盖使用的版本。

## `--node-modules-dir` 标志

npm 规范将 npm 包解析到一个中央全局 npm
缓存中。在大多数情况下，这很有效，而且是理想的，因为它使用的空间较少，也不需要
`node_modules` 目录。但是，您可能会发现有时会出现 npm 包期望从 `node_modules`
目录执行本身的情况。为了提高兼容性并支持那些包，您可以使用 `--node-modules-dir`
标志。

例如，给定 `main.ts`：
=======
Note that it is fine to not specify a version for this in most cases because
Deno will try to keep it in sync with its internal Node code, but you can always
override the version used if necessary.

## `--node-modules-dir` flag

npm specifiers resolve npm packages to a central global npm cache. This works
well in most cases and is ideal since it uses less space and doesn't require a
node_modules directory. That said, you may find cases where an npm package
expects itself to be executing from a `node_modules` directory. To improve
compatibility and support those packages, you can use the `--node-modules-dir`
flag.

For example, given `main.ts`:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
import chalk from "npm:chalk@5";

console.log(chalk.green("Hello"));
```

<<<<<<< HEAD
以以下方式使用 `--node-modules-dir` 运行此脚本...
=======
Running this script with a `--node-modules-dir` like so...
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```sh
deno run --node-modules-dir main.ts
```

<<<<<<< HEAD
...将在当前目录中创建一个 `node_modules` 文件夹，其类似于 npm 的文件夹结构。

![](../images/node_modules_dir.png)

请注意，这是在调用 `deno run` 时自动完成的，不需要单独的安装命令。

在您想修改 `node_modules` 目录之前，您可以使用 `--node-modules-dir` 运行
`deno cache`，修改其内容，然后再运行脚本。

例如：
=======
...will create a `node_modules` folder in the current directory with a similar
folder structure to npm.

![](../images/node_modules_dir.png)

Note that this is all done automatically when calling deno run and there is no
separate install command necessary.

In the case where you want to modify the contents of the `node_modules`
directory before execution, you can run `deno cache` with `--node-modules-dir`,
modify the contents, then run the script.

For example:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```sh
deno cache --node-modules-dir main.ts
deno run --allow-read=. --allow-write=. scripts/your_script_to_modify_node_modules_dir.ts
deno run --node-modules-dir main.ts
```
