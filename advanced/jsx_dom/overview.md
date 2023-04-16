<<<<<<< HEAD
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
=======
# Overview of JSX and DOM in Deno

One of the common use cases for Deno is to handle workloads as part of web
applications. Because Deno includes many of the browser APIs built-in, there is
a lot of power in being able to create isomorphic code that can run both in Deno
and in the browser. A powerful workload that can be handled by Deno is
performing _server side rendering_ (SSR), where application state is used
_server side_ to dynamically render HTML and CSS to be provided to a client.

Server side rendering, when used effectively, can dramatically increase the
performance of a web application by offloading heavy calculations of dynamic
content to a server process allowing an application developer to minimize the
JavaScript and application state that needs to be shipped to the browser.

A web application is generally made up of three key technologies:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

- JavaScript
- HTML
- CSS

<<<<<<< HEAD
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
=======
As well as increasingly, [Web Assembly](../../runtime/webassembly.md) might play
a part in a web application.

These technologies combine to allow a developer to build an application in a
browser using the web platform. While Deno supports a lot of web platform APIs,
it generally only supports web APIs that are usable in a _server-side_ context,
but in a client/browser context, the main "display" API is the Document Object
Model (or DOM). There are APIs that are accessible to application logic via
JavaScript that manipulate the DOM to provide a desired outcome, as well as HTML
and CSS are used to structure and style the _display_ of a web application.

In order to facilitate manipulation of the DOM server side and the ability to
generate HTML and CSS dynamically, there are some key technologies and libraries
that can be used with Deno to achieve this, which we will explore in this
chapter.

We will be exploring fairly low-level enabling libraries and technologies,
versus a full solution or framework for server side generation of websites.

## JSX

Created by the React team at Facebook, JSX is a popular DSL (domain specific
language) for embedding HTML-like syntax in JavaScript. The TypeScript team also
added support for the JSX syntax into TypeScript. JSX has become popular with
developers as it allows mixing imperative programming logic with a declarative
syntax that looks a lot like HTML.

An example of what a JSX "component" might look like:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```jsx
export function Greeting({ name }) {
  return (
    <div>
      <h1>Hello {name}!</h1>
    </div>
  );
}
```

<<<<<<< HEAD
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
=======
The main challenge with JSX is that it isn't JavaScript nor is it HTML. It
requires transpiling to pure JavaScript before it can be used in a browser,
which then has to process that logic to manipulate the DOM in the browser. This
is probably less efficient than having a browser render static HTML.

This is where Deno can play a role. Deno supports JSX in both `.jsx` and `.tsx`
modules and combined with a JSX runtime, Deno can be used to dynamically
generate HTML to be sent to a browser client, without the need of shipping the
un-transpiled source file, or the JSX runtime library to the browser.

Read the [Configuring JSX in Deno](./jsx.md) section for information on how to
customize the configuration of JSX in Deno.

## Document Object Model (DOM)

The DOM is the main way a user interface is provided in a browser, and it
exposes a set of APIs that allow it to be manipulated via JavaScript, but also
allows the direct use of HTML and CSS.

While Deno has a lot of web platform APIs, it does not support most of the DOM
APIs related to visual representation. Having said that though, there are a few
libraries that provide a lot of the APIs needed to take code that was designed
to run in a web browser to be able to run under Deno, in order to generate HTML
and CSS which can be shipped to a browser "pre-rendered". We will cover those in
the following sections:

- [Using LinkeDOM with Deno](./linkedom.md)
- [Using deno-dom with Deno](./deno_dom.md)
- [Using jsdom with Deno](./jsdom.md)

## CSS

Cascading Style Sheets (CSS) provide styling for HTML within the DOM. There are
tools which make working with CSS in a server side context easier and powerful.

- [Parsing and stringifying CSS](./css.md)
- [Using Twind with Deno](./twind.md)
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
