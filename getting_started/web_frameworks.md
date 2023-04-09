<<<<<<< HEAD
# Web 框架

如果您正在构建更复杂的应用程序，那么您将通过 Web 框架与 Deno 进行交互。Deno
支持两种类型的 Web 框架：

- **Node.js 本地框架/工具/库。** 例如 esbuild 等一些最受欢迎的工具在显式支持
  Node.js 和 Deno。缺点在于您可能无法获得最佳体验或性能。
- **Deno 本地框架/工具/库。** 下面介绍其中一些。

## Deno 本地框架

### Fresh

[Fresh](https://fresh.deno.dev/) 是 Deno 最受欢迎的 Web
框架，它使用一种模型，其中默认情况下不向客户端发送任何
JavaScript。大多数渲染都在服务器上执行，客户端仅负责重新渲染小的[交互岛](https://jasonformat.com/islands-architecture/)。这意味着开发人员显式选择特定组件的客户端渲染。

### Aleph

[Aleph.js](https://alephjs.org/docs/get-started) 是 Deno 第二受欢迎的 Web
框架。它提供了与 Create-React-App 相同的快速启动 React 的方式。类似于
Next.js，Aleph提供了SSR和SSG，以便允许开发人员创建SEO友好的应用程序。此外，Aleph
在Next.js中不提供的一些其他内置功能，如：

- 热重载（使用React Fast Refresh）
- ESM导入语法（无需Webpack）
- TypeScript 就绪

### Ultra

[Ultra](https://ultrajs.dev/) 是一种现代流媒体 React 框架，为 Deno
提供了另一种选择。它是一种使用 React 构建动态媒体丰富网站的方式，类似于
Next.js。

Deno 本身支持 JSX 和 TypeScript
（因此Ultra也支持），但它们不能在浏览器中工作。Ultra接管了将JSX和TypeScript转译为常规JavaScript的任务。

Ultra的其他亮点包括：

- 使用 Deno编写。
- 由import maps 强力驱动。
- 100% esm。
- 在开发和生产中都使用 import
  maps，这极大地简化了工具链-您不必处理大量的打包和转译。
- 与开发中相同的方式使用导入、导出功能。

### Lume

[Lume](https://lume.land/)
是一款受Jekyll或Eleventy等其他静态站点生成器启发的Deno静态站点生成器。它易于使用和配置，同时也非常灵活。亮点包括：

- 支持多种文件格式，如Markdown、YAML、JavaScript、TypeScript、JSX、Nunjucks。
- 您可以连接任何处理器来转换资产，例如sass或postcss用于CSS。
- 无需在`node_modules`中安装数千个软件包或复杂的绑定器。

### Oak

[Oak](https://deno.land/x/oak) 是一款类似于Node.js中的Express的Deno
Web应用程序框架。

作为中间件框架，Oak 是前端应用程序与潜在数据库或其他数据源（例如REST
API、GraphQL
API）之间的粘合剂。只是为了给您一个想法，以下是构建客户端-服务器架构的常见技术栈列表：

- React.js（前端）+ Oak（后端）+ PostgreSQL（数据库）
- Vue.js（前端）+ Oak（后端）+ MongoDB（数据库）
- Angular.js（前端）+ Oak（后端）+ Neo4j（数据库）

Oak 提供了比本地Deno
HTTP服务器更多的功能，包括基本路由器、JSON解析器、中间件、插件等。
=======
# Web Frameworks

Most likely, if you're building a more complex application, you'll be
interacting with Deno through a web framework. There are two kinds of web
frameworks that Deno supports:

- **Node.js native frameworks/tools/libraries.** Some of the most popular
  tooling, for example esbuild, explicitly supports both Node.js and Deno. The
  drawback here is that you might not get the best experience or performance.
- **Deno native frameworks/tools/libraries.** We present some of these below.

## Deno-native frameworks

### Fresh

[Fresh](https://fresh.deno.dev/) is the most popular web framework for Deno. It
uses a model where you send no JavaScript to clients by default. The majority of
rendering is done on a server, and the client is only responsible for
re-rendering small
[islands of interactivity](https://jasonformat.com/islands-architecture/). This
means the developer explicitly opts in to client side rendering for specific
components.

### Aleph

[Aleph.js](https://alephjs.org/docs/get-started) is the second most popular web
framework for Deno. It gives you the same sort of quick-start with React as
Create-React-App. Like Next.js, Aleph provides SSR and SSG out of the box in
order to allow developers to create SEO-friendly apps. In addition, Aleph
provides some other built-in features that don’t come out of the box in Next.js,
such as:

- Hot Reloading (Using React Fast Refresh)
- ESM Import Syntax (No need for webpack)
- TypeScript-Readys

### Ultra

[Ultra](https://ultrajs.dev/) is a modern streaming React framework for Deno
that is another alternative to Aleph. It's a way to use React to build dynamic
media-rich websites, similar to Next.js.

Deno itself supports JSX and TypeScript out-of-the-box (and therefore Ultra does
as well), but they don't work in the browser. Ultra takes over the task of
transpiling JSX and TypeScript to regular JavaScript.

Other highlights of Ultra include:

- written in Deno.
- powered by import maps.
- 100% esm.
- uses import maps in both development and production, which massively
  simplifies toolchains - you don't have to deal with heaps of bundling and
  transpilation.
- source code is shipped in production, similar to how it's written.
- imports, exports, work as they do in development.

### Lume

[Lume](https://lume.land/) is a static site generator for Deno that is inspired
by other static site generators such Jekyll or Eleventy. It's simple to use and
configure, while being super flexible. Highlights include:

- Support for multiple file formats like Markdown, YAML, JavaScript, TypeScript,
  JSX, Nunjucks.
- You can hook in any processor to transform assets, for example sass or postcss
  for CSS.
- No need to install thousand of packages in `node_modules` or complex bundlers.

### Oak

[Oak](https://deno.land/x/oak) is a web application framework for Deno, similar
to Express in Node.js.

As a middleware framework, Oak is the glue between your frontend application and
a potential database or other data sources (e.g. REST APIs, GraphQL APIs). Just
to give you an idea, the following is a list of common tech stacks to build
client-server architectures:

- React.js (Frontend) + Oak (Backend) + PostgreSQL (Database)
- Vue.js (Frontend) + Oak (Backend) + MongoDB (Database)
- Angular.js (Frontend) + Oak (Backend) + Neo4j (Database)

Oak offers additional functionality over the native Deno HTTP server, including
a basic router, JSON parser, middlewares, plugins, etc.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
