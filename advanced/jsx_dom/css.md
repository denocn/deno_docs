<<<<<<< HEAD
# 解析和生成 CSS

如果您想将 CSS 解析为抽象语法树（AST），则可以考虑两种解决方案：
=======
# Parsing and Stringifying CSS

If you want to parse CSS to a abstract syntax tree (AST) then there are two
solutions you might want to consider:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

- [reworkcss/css](https://github.com/reworkcss/css)
- [deno_css](https://deno.land/x/css)

<<<<<<< HEAD
`reworkcss/css` 最初是为 Node.js 编写的，但在从 CDN 消费时表现良好。从 `esm.sh`
导入还会自动组合来自 DefinitelyTyped 的类型定义。但需要注意的是，DefinitelyTyped
上的类型并不是非常好，因为许多应被标记为联合类型的联合类型都仅是联合类型，这使得类型非常模糊，并需要大量的类型转换。

另外，如果您想将 AST 转换为 CSS，`reworkcss/css` 还提供了将其生成的 AST 转换为
CSS 的功能。

`deno_css` 是 TypeScript 中专门为 Deno 编写的，并可在 `deno.land/x` 上获得。

## `reworkcss/css` 的基本示例

在此示例中，我们将解析一些 CSS 成 AST，并修改 `body` 规则中的 `background`
声明，将颜色更改为 `white`。然后，我们将字符串化修改后的 CSS AST
并将其输出到控制台：
=======
`reworkcss/css` was written originally for Node.js but work well when consumed
from a CDN. Importing from `esm.sh` also automatically combines the type
definitions from DefinitelyTyped. It should be noted though that types on
DefinitelyTyped are not _very good_ as many union types that should be tagged
union types are just union types which leave the types very ambiguous and
require a lot of type casting.

Also, if you want to take an AST and generate CSS, `reworkcss/css` also provides
capability to stringify the AST it generates.

`deno_css` is authored in TypeScript specifically for Deno and is available on
`deno.land/x`.

## Basic example with `reworkcss/css`

In this example, we will parse some CSS into an AST and make a modification to
the `background` declaration of the `body` rule, to change the color to `white`.
Then we will stringify the modified CSS AST and output it to the console:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```ts, ignore
import * as css from "https://esm.sh/css@3.0.0";
import { assert } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";

declare global {
  interface AbortSignal {
    reason: unknown;
  }
}

const ast = css.parse(`
body {
  background: #eee;
  color: #888;
}
<<<<<<< HEAD
`); 
=======
`);
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

assert(ast.stylesheet);
const body = ast.stylesheet.rules[0] as css.Rule;
assert(body.declarations);
const background = body.declarations[0] as css.Declaration;
background.value = "white";

console.log(css.stringify(ast));
```

<<<<<<< HEAD
## `deno_css` 的基本示例

在此示例中，我们将解析一些 CSS 成 AST，并将 `body` 规则的 `background`
声明记录到控制台。
=======
## A basic example with `deno_css`

In this example, we will parse some CSS into an AST and log out the `background`
declaration of the `body` rule to the console.
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```ts
import * as css from "https://deno.land/x/css@0.3.0/mod.ts";

const ast = css.parse(`
body {
  background: #eee;
  color: #888;
}
`);

const [body] = ast.stylesheet.rules;
const [background] = body.declarations;

console.log(JSON.stringify(background, undefined, "  "));
```
