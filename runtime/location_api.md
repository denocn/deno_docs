<<<<<<< HEAD
# 位置 API
=======
# Location API
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

Deno 支持来自 Web 的全局
[`location`](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)。请继续阅读。

<<<<<<< HEAD
## 位置标志
=======
## Location flag
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

在 Deno 进程中，我们无法使用 Web 页面的 URL 作为位置。相反，我们允许用户在 CLI
上使用 `--location` 标志模拟文档位置。它可以是一个 `http` 或 `https` URL。

```ts
// deno run --location https://example.com/path main.ts

console.log(location.href);
// "https://example.com/path"
```

你必须传递 `--location <href>` 才能使其工作。如果不这样做，对 `location`
全局的任何访问都会抛出错误。

```ts
// deno run main.ts

console.log(location.href);
// error: Uncaught ReferenceError: Access to "location", run again with --location <href>.
```

在浏览器中，设置 `location` 或其任何字段通常会导致导航。这在 Deno
中不适用，因此会在此情况下引发错误。

```ts
// deno run --location https://example.com/path main.ts

location.pathname = "./foo";
// error: Uncaught NotSupportedError: Cannot set "location.pathname".
```

<<<<<<< HEAD
## 扩展用法
=======
## Extended usage
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

在 Web 上，资源解析（不包括模块）通常使用 `location.href` 的值作为任何相对 URL
基础的根。这影响到 Deno 采用的一些 Web API。

### Fetch API

```ts
// deno run --location https://api.github.com/ --allow-net main.ts

const response = await fetch("./orgs/denoland");
// 获取 "https://api.github.com/orgs/denoland"。
```

如果不传递 `--location` 标志，上面的 `fetch()` 调用将会抛出异常，因为没有 Web
相似的位置可以基于它。

<<<<<<< HEAD
### Worker 模块
=======
### Worker modules
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```ts
// deno run --location https://example.com/index.html --allow-net main.ts

const worker = new Worker("./workers/hello.ts", { type: "module" });
// 获取位于 "https://example.com/workers/hello.ts" 的工作模块。
```

<<<<<<< HEAD
## 只有在必要时使用
=======
## Only use if necessary
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

对于以上用例，最好传递完整的 URL 而不是依赖 `--location`。如果需要，可以使用
`URL` 构造函数手动基于相对 URL。

`--location`
标志旨在为那些特定于模拟文档位置并且知道这只能在应用程序级别工作的人使用。但是，您也可以使用它来消除一个依赖项从轻率访问
`location` 全局引起的错误。
