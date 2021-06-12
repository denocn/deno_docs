# Web 平台 APIs {#web-platform-apis}

Deno 旨在使用 web 平台的API（如 `fetch`），而不是新发明一个有意义的特有 API 。这些 API 通常遵循规范，而且应该与 Chrome 和 Firefox 中的实现相匹配。在某些情况下，因为 Deno 有着不同的安全模式，所以稍微偏离规范是有意义的。

以下是 Deno web 平台 API 的实现列表：

## `fetch` API {#fetch-api}

### 概述 {#overview}

`fetch` API 可以用来发送 HTTP 请求。 它是按照 [WHATWG `fetch` 规范](https://fetch.spec.whatwg.org/)中的规定实现的。

你可以在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 中找到关于 `fetch` API 的文档。

### 偏离规范 {#spec-deviations}

-  Deno 的用户代理没有一个cookie jar包。 因此，响应中的 `set-cookie` 头不会被处理，也不会从可见的响应头中被过滤。 
- 因为 Deno 用户代理目前还没有多个源的概念，所以 Deno 没有遵循同源策略, 同时也没有一个 cookie jar 包。 这意味着 Deno 不需要保护认证数据的跨源泄漏。 正因为如此， Deno 没有实现以下 WHATWG `fetch` 规范中的部分： 
  - 第`3.1`节` 'Origin' 头`
  - 第`3.2`节` CORS 协议`
  - 第`3.5`节` CORB`
  - 第`3.6`节` 'Cross-Origin-Resource-Policy' 头`
  - `原子 HTTP 重定向处理`
  -  `opaqueredirect` 响应类型
- 一个 `fetch` 请求的 `redirect` 属性设为 `manual` 将不会返回 `opaqueredirect` 响应，而是返回一个 `basic` 响应。

## `CustomEvent`, `EventTarget` 和 `EventListener` {#customevent-eventtarget-and-eventlistener}

### 概述 {#overview}

 DOM 事件 API 可以用来调度和监听应用程序中发生的事件。 它是按照 [WHATWG DOM 规范](https://dom.spec.whatwg.org/#events)中的规定实现的。

你可以在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) 里找到关于 `EventTarget` API 的文档。

### 偏离规范 {#spec-deviations}

- 没有冒泡事件，因为 Deno 没有 DOM 层次结构，所以没有树状的事件可以冒泡/捕获。

## Web Worker API {#web-worker-api}

### 概述 {#overview}

 WebWorker API可以在一个单独的线程中执行代码。 它是按照 [WHATWG HTML 规范](https://html.spec.whatwg.org/multipage/workers.html#workers)中的规定实现的。

你可以在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Worker)里找到关于 `worker` API 的文档。

### 偏离规范 {#spec-deviations}

- 目前不支持从 blob URLs 创建 worker。
- 目前发布的数据不是结构化的克隆, 而是被序列化为 JSON 。
- 目前，对象的所有权不能在 worker 之间转移

## 其他 APIs {#other-apis}

- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [Console](https://developer.mozilla.org/en-US/docs/Web/API/Console)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [Performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [setTimeout, setInterval, clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

## Typings {#typings}

用 TypeScript 实现定义的 web APIs 能够在[`lib.deno.shared_globals.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.shared_globals.d.ts) 和 [`lib.deno.window.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.window.d.ts) 文件中查看。

关于 workers 的具体定义可以在 [`lib.deno.worker.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.worker.d.ts) 文件中查看。
