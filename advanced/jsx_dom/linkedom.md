<<<<<<< HEAD
# 在 Deno 中使用 LinkeDOM

[LinkeDOM](https://github.com/WebReflection/linkedom) 是一个类 DOM
命名空间，用于在不支持 DOM 的环境中使用，比如 Deno。

LinkeDOM 专注于速度和服务器端渲染的有用功能的实现。这可能使您执行无效的 DOM
操作。[deno-dom](./deno_dom.md) 和 [jsdom](./jsdom.md)
则专注于正确性。虽然目前在某些情况下 deno-dom 比 LinkeDOM 慢，但两者都比 jsdom
快得多，因此，如果您需要正确性或与服务器端渲染无关的特性，请考虑使用 deno-dom。

虽然 LinkeDOM 可在 Deno CLI 下运行，但它不支持类型检查。虽然提供的类型在使用诸如
VSCode 的编辑器时工作良好，但是像 Deno
一样严格检查类型会导致运行时失败。如果您尝试使用 `tsc`
进行类型检查，则也会出现相同情况。LinkeDOM 的维护者已提示他们不感兴趣
[解决此问题](https://github.com/WebReflection/linkedom/issues/87)。这意味着对于
Deno，您需要使用 `--no-check=remote` 来避免诊断停止程序的运行。

LinkeDOM 与 deno_dom 一起运行在 Deno Deploy 上，但是 jsdom 不行。

## 基本示例

此示例将接受一个测试字符串并将其解析为 HTML，然后基于该字符串生成一个 DOM
结构。然后，它将查询该 DOM 结构，提取遇到的第一个标题并打印该标题的文本内容：
=======
# Using LinkeDOM with Deno

[LinkeDOM](https://github.com/WebReflection/linkedom) is a DOM-like namespace to
be used in environments, like Deno, which don't implement the DOM.

LinkeDOM focuses on being fast and implementing features useful for server side
rendering. It may allow you to do things that are invalid DOM operations.
[deno-dom](./deno_dom.md) and [jsdom](./jsdom.md) focus on correctness. While
currently deno-dom is slower than LinkeDOM in some cases, both are significantly
faster than jsdom, so if you require correctness or features not related to
server side rendering, consider deno-dom.

While LinkeDOM works under the Deno CLI, it does not type check. While the
provided types work well when using an editor like VSCode, attempting to
strictly type check them, like Deno does by default, at runtime, it will fail.
This is the same if you were to use `tsc` to type check the code. The maintainer
has indicated they aren't interested in
[fixing this issue](https://github.com/WebReflection/linkedom/issues/87). This
means for Deno, you need to use the `--no-check=remote` to avoid diagnostics
stopping the execution of your programme.

LinkedDOM runs under Deno Deploy, along with deno_dom, but jsdom does not.

## Basic example

This example will take a test string and parse it as HTML and generate a DOM
structure based on it. It will then query that DOM structure, picking out the
first heading it encounters and print out the text content of that heading:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
import { DOMParser } from "https://esm.sh/linkedom";
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

<<<<<<< HEAD
## 替代 API

对于某些 SSR 工作负载，`parseHTML()` 可能更适合。这类似于 jsdom 的 `JSDOM()`
函数，因为它给您一个“沙箱” `window` 作用域，您可以使用它来访问超出 `document`
范围的 API。例如：
=======
## Alternative API

For the `parseHTML()` can be better suited for certain SSR workloads. This is
similar to jsdom's `JSDOM()` function, in the sense it gives you a "sandbox" of
a `window` scope you can use to access API's outside of the scope of the
`document`. For example:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
import { parseHTML } from "https://esm.sh/linkedom";

const { document, customElements, HTMLElement } = parseHTML(`<!DOCTYPE html>
<<<<<<< HEAD
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
                        </html>`);
=======
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
  </html>`);
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

customElements.define(
  "custom-element",
  class extends HTMLElement {
    connectedCallback() {
      console.log("it works 🥳");
    }
  },
);

document.body.appendChild(document.createElement("custom-element"));

<<<<<<< HEAD
document.toString(); //the string of the document, ready to send to a client
=======
document.toString(); // the string of the document, ready to send to a client
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
```
