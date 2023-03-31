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
