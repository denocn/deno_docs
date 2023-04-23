<<<<<<< HEAD
# 在 Deno 中使用 Twind
=======
# Using Twind with Deno
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

[Twind](https://twind.dev/) 是一种 _tailwind-in-js_ 的解决方案，用于使用
[Tailwind](https://tailwindcss.com/)。在 Deno 的服务器环境中，Twind
特别有用，在那里 Tailwind 和 CSS 可以很容易地在服务器端呈现，生成动态，高效的
CSS，同时具有使用 Tailwind 进行样式设置的可用性。

<<<<<<< HEAD
## 基本示例
=======
## Basic example
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

在以下示例中，我们将使用 twind 服务器端呈现 HTML
页面并将其记录到控制台中。它演示了使用 `tw` 函数指定分组的 tailwind
类，并仅使用文档中指定的样式呈现，而不需要客户端 JavaScript 来实现
_tailwind-in-js_：

```ts
import { setup, tw } from "https://esm.sh/twind@0.16.16";
import { getStyleTag, virtualSheet } from "https://esm.sh/twind@0.16.16/sheets";

const sheet = virtualSheet();

setup({
  theme: {
    fontFamily: {
      sans: ["Helvetica", "sans-serif"],
      serif: ["Times", "serif"],
    },
  },
  sheet,
});

function renderBody() {
  return `
    <h1 class="${tw`text(3xl blue-500)`}">Hello from Deno</h1>
    <form>
      <input name="user">
      <button class="${tw`text(2xl red-500)`}">
        Submit
      </button>
    </form>
  `;
}

function ssr() {
  sheet.reset();
  const body = renderBody();
  const styleTag = getStyleTag(sheet);

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Hello from Deno</title>
        ${styleTag}
      </head>
      <body>
        ${body}
      </body>
    </html>`;
}

console.log(ssr());
```
