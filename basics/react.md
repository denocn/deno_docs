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
