# JSX 和 DOM 在 Deno 中的概述

Deno 的常见用途之一是作为 Web 应用程序的一部分处理工作负载。因为 Deno
内置了许多浏览器 API，所以能够创建可在 Deno
和浏览器中运行的同构代码非常强大。Deno
可以处理的一个强大的工作负载是执行“服务器端渲染”（SSR），其中应用程序状态用于在“服务器端”动态渲染
HTML 和 CSS 以提供给客户端。

有效使用服务器端渲染可以通过将动态内容的繁重计算卸载到服务器进程中来显著提高 Web
应用程序的性能，从而使应用程序开发人员最小化需要在浏览器中发送的 JavaScript
和应用程序状态。

一个 Web 应用程序通常由三个核心技术组成：

- JavaScript
- HTML
- CSS

此外，[Web Assembly](../../runtime/webassembly.md) 在 Web
应用程序中可能扮演一定角色。

这些技术结合起来允许开发人员在浏览器中使用 Web 平台构建应用程序。虽然 Deno
支持许多 Web 平台 API，但它通常仅支持可在“服务器端”上下文中使用的 Web
API，在客户端/浏览器上下文中，主要的“显示”API 是文档对象模型（Document Object
Model，DOM）。有一些可以通过 JavaScript 访问的 API，用于操作 DOM
以提供所需的结果，同时使用 HTML 和 CSS 来结构化和样式化 Web 应用程序的“显示”。

为了促进 DOM 的服务器端操作和动态生成 HTML 和 CSS
的能力，可以使用一些关键技术和库与 Deno 一起使用，我们将在本章中探讨这些内容。

我们将探讨相对较低级别的支持库和技术，而不是网站服务器端生成的完整解决方案或框架。

## JSX

由 Facebook 的 React 团队创建，JSX 是一种在 JavaScript 中嵌入类似 HTML
语法的流行 DSL（领域特定语言）。TypeScript 团队还将对 JSX 语法的支持添加到了
TypeScript 中。JSX
已经成为开发人员的流行选择，因为它允许将命令式编程逻辑与看起来很像 HTML
的声明式语法混合使用。

JSX “组件”的一个示例可能如下所示：

```jsx
export function Greeting({ name }) {
  return (
    <div>
      <h1>Hello {name}!</h1>
    </div>
  );
}
```

JSX 的主要问题在于它既不是 JavaScript 也不是
HTML。在可以将其用于浏览器之前，它需要被转换为纯
JavaScript，然后浏览器必须处理该逻辑以操纵 DOM。这可能不如浏览器渲染静态 HTML
效率高。

这就是 Deno 可以发挥作用的地方。Deno 支持 `.jsx` 和 `.tsx` 模块中的 JSX，并与
JSX 运行时结合使用，Deno 可以用于动态生成
HTML，以发送到浏览器客户端，而无需在浏览器中发送未转换的源文件或 JSX 运行时库。

阅读[在 Deno 中配置 JSX](./jsx.md) 部分，了解如何自定义 Deno 中 JSX 的配置信息。

## 文档对象模型（DOM）

DOM 是在浏览器中提供用户界面的主要方式，它公开了一组 API，允许通过 JavaScript
进行操作，但也允许直接使用 HTML 和 CSS。

虽然 Deno 拥有大量的 Web 平台 API，但它并不支持大多数与视觉表示相关的 DOM
API。虽然如此，仍有一些库提供了大部分所需的 API，以便将设计用于在 Web
浏览器中运行的代码转换为能够在 Deno 下运行的代码，以生成“预渲染”的 HTML 和
CSS，这将在以下部分中进行介绍：

- [在 Deno 中使用 LinkeDOM](./linkedom.md)
- [在 Deno 中使用 deno-dom](./deno_dom.md)
- [在 Deno 中使用 jsdom](./jsdom.md)

## CSS

层叠样式表（Cascading Style Sheets，CSS）为 DOM 中的 HTML
提供样式。有一些工具使在服务器端环境中使用 CSS 更加容易和强大。

- [解析和字符串化 CSS](./css.md)
- [在 Deno 中使用 Twind](./twind.md)
