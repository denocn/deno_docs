<<<<<<< HEAD
# 迁移到和从 JavaScript 迁移

Deno 的一个优点是它将 TypeScript 和 JavaScript
看得一样重要。这可能意味着你想要从 JavaScript 迁移到 TypeScript，甚至从
TypeScript 迁移到 JavaScript。Deno 有几个功能可以帮助解决这个问题。

## JavaScript 类型检查

你可能有一些 JavaScript
代码，想要确保它具有更高的类型可靠性，但又不想在任何地方添加类型注释。

Deno 支持使用 TypeScript 类型检查器来检查 JavaScript 的类型。你可以通过添加检查
JavaScript pragma 将任何单个文件标记为类型检查：
=======
# Migrating to and from JavaScript

One of the advantages of Deno is that it treats TypeScript and JavaScript pretty
equally. This might mean that transitioning from JavaScript to TypeScript or
even from TypeScript to JavaScript is something you want to accomplish. There
are several features of Deno that can help with this.

## Type checking JavaScript

You might have some JavaScript that you would like to ensure is more type sound
but you don't want to go through a process of adding type annotations
everywhere.

Deno supports using the TypeScript type checker to type check JavaScript. You
can mark any individual file by adding the check JavaScript pragma to the file:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```js
// @ts-check
```

<<<<<<< HEAD
这将使类型检查器推断出关于 JavaScript
代码的类型信息，并提出任何问题作为诊断问题。

通过提供启用了 check JS 选项的配置文件，可以为程序中的所有 JavaScript
文件打开这些选项：
=======
This will cause the type checker to infer type information about the JavaScript
code and raise any issues as diagnostic issues.

These can be turned on for all JavaScript files in a program by providing a
configuration file with the check JS option enabled:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

<<<<<<< HEAD
并在命令行上设置 `--config` 选项。

## 在 JavaScript 中使用 JSDoc

如果你正在检查 JavaScript，甚至将 JavaScript 导入 TypeScript，可以在 JavaScript
中使用 JSDoc 表达更多类型信息，而不仅仅是从代码本身推断出来的信息。Deno
支持这种方法，无需任何额外的配置，你只需要与支持的
[TypeScript JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
行内注释代码即可。例如，要设置数组的类型：
=======
And setting the `--config` option on the command line.

## Using JSDoc in JavaScript

If you are type checking JavaScript, or even importing JavaScript into
TypeScript you can use JSDoc in JavaScript to express more types information
than can just be inferred from the code itself. Deno supports this without any
additional configuration, you simply need to annotate the code in line with the
supported
[TypeScript JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).
For example to set the type of an array:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```js
/** @type {string[]} */
const a = [];
```

<<<<<<< HEAD
## 跳过类型检查

你可能有一些 TypeScript
代码正在尝试使用，其中语法是有效的但并不完全类型安全。你可以通过传递
`--no-check` 来跳过整个程序的类型检查。

你也可以通过使用 no-check pragma 跳过整个文件的类型检查，包括启用了 check JS 的
JavaScript：
=======
## Skipping type checking

You might have TypeScript code that you are experimenting with, where the syntax
is valid but not fully type safe. You can always bypass type checking for a
whole program by passing the `--no-check`.

You can also skip whole files being type checked, including JavaScript if you
have check JS enabled, by using the no-check pragma:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```js
// @ts-nocheck
```

<<<<<<< HEAD
## 仅将 JS 文件重命名为 TS 文件

虽然这在某些情况下可能有效，但在 Deno
中却有一些严重的限制。这是因为默认情况下，Deno
在所谓的严格模式下运行类型检查。这意味着许多不清楚或模糊的情况，在非严格模式下没有被捕获，将导致产生诊断信息，而
JavaScript 在类型方面什么都不清楚和模糊。
=======
## Just renaming JS files to TS files

While this might work in some cases, it has some severe limits in Deno. This is
because Deno, by default, runs type checking in what is called _strict mode_.
This means a lot of unclear or ambiguous situations where are not caught in
non-strict mode will result in diagnostics being generated, and JavaScript is
nothing but unclear and ambiguous when it comes to types.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
