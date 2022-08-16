## Location API {#location-api}

Deno 支持从网络获取全局
[`location`](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)。请往下看。

### Location 标志 {#location-flag}

在 Deno 的流程中，没有基于 location URL 的“网页”。相反，我们允许用户通过使用 `--location` 标志在 CLI
上指定一个文档位置来模拟文档位置。 它可以是 `http` 或 `https` 的 URL。

```ts
// deno run --location https://example.com/path main.ts

console.log(location.href);
// "https://example.com/path"
```

您必须通过 `--location <href>` 才能起作用。如果不这样做，则对 `location` 全局的任何访问都会引发错误。

```ts
// deno run main.ts

console.log(location.href);
// error: Uncaught ReferenceError: Access to "location", run again with --location <href>.
```

设置 `location` 或其任何字段通常会导致在浏览器中导航。这在 Deno 中不适用，因此将在这种情况下抛出异常。

```ts
// deno run --location https://example.com/path main.ts

location.pathname = "./foo";
// error: Uncaught NotSupportedError: Cannot set "location.pathname".
```

### 扩展使用 {#extended-usage}

在网络上，资源解析（不包括模块）通常使用 `location.href` 的值作为任何相对 URL 所基于的根。这会影响 Deno 采用的某些 Web API。

#### Fetch API {#fetch-api}

```ts
// deno run --location https://api.github.com/ --allow-net main.ts

const response = await fetch("./orgs/denoland");
// Fetches "https://api.github.com/orgs/denoland".
```

如果没有传递 `--location` 标志，则上面的 `fetch()` 调用将抛出异常，因为没有 web-analogous location
的这个基础依赖。

#### Worker modules {#worker-modules}

```ts
// deno run --location https://example.com/index.html --allow-net main.ts

const worker = new Worker("./workers/hello.ts", { type: "module" });
// Fetches worker module at "https://example.com/workers/hello.ts".
```

### 仅在必要时使用 {#only-use-if-necessary}

上面的例子，最好是传递完整的 URL，而不是依赖于 `--location`。如果需要，您可以使用 URL 构造函数手动建立相对 URL。

`--location` 标志用于那些出于某些特定目的模拟一个文档的 location 并且意识到仅在应用程序级别起作用的场景。
当然，您也可以使用它来消除粗暴访问 `location` 全局依赖项的错误。
