<<<<<<< HEAD
# 在 Deno 中使用 React

为了在 Deno 中使用 React，我们推荐使用下面其中一个第三方框架。

如果您想更好地了解 JSX 和 Deno
如何在幕后连接，请继续[这里](../advanced/jsx_dom)。

注意：Fresh 和 Aleph.js 提供了一个用于开发类似 React
的网站的框架，但是使用了一种替代性基础技术 Preact，以提供更好，更高性能的体验。

## Fresh

[Fresh](https://fresh.deno.dev/) 是最流行的适用于 Deno 的 React
框架。它使用一种模式，其中默认情况下不向客户端发送
JavaScript。大部分渲染都在服务器上完成，客户端只负责重新渲染少量的[可交互的“岛屿”](https://jasonformat.com/islands-architecture/)。这意味着开发人员显式地选择特定组件的客户端渲染。

## Aleph

[Aleph.js](https://alephjs.org/docs/get-started) 是第二受欢迎的适用于 Deno 的
React 框架。它为您提供了与 Create-React-App 相同的快速启动 React 的方式。与
Next.js 相似，Aleph 提供 SSR 和 SSG，以便允许开发人员创建 SEO
友好的应用程序。另外，Aleph 还提供了一些在 Next.js
中默认不提供的内置功能，例如：

- 热重载（使用 React 快速刷新）
- ESM 导入语法（无需使用 webpack）
- TypeScript 支持
=======
# Using React with Deno

To use React with Deno, we recommend using one of the third-party frameworks
below.

If you want to better understand how JSX and Deno interface under the hood, read
on [here](../advanced/jsx_dom).

Note:: Fresh and Aleph.js provide a framework for developing React-like
websites, but use an alternative foundational technology, Preact to provide a
better, more performant experience.

## Fresh

[Fresh](https://fresh.deno.dev/) is the most popular React framework for Deno.
It uses a model where you send no JavaScript to clients by default. The majority
of rendering is done on a server, and the client is only responsible for
re-rendering small
[islands of interactivity](https://jasonformat.com/islands-architecture/). This
means the developer explicitly opts in to client side rendering for specific
components.

## Aleph

[Aleph.js](https://alephjs.org/docs/get-started) is the second most popular
React framework for Deno. It gives you the same sort of quick-start with React
as Create-React-App. Like Next.js, Aleph provides SSR and SSG out of the box in
order to allow developers to create SEO-friendly apps. In addition, Aleph
provides some other built-in features that don’t come out of the box in Next.js,
such as:

- Hot Reloading (Using React Fast Refresh)
- ESM Import Syntax (No need for webpack)
- TypeScript-Ready
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
