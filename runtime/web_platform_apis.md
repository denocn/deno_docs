# Web 平台 APIs {#web-platform-apis}

Deno 旨在使用 web 平台的 API（如 `fetch`），而不是新发明一个有意义的特有 API 。这些 API 通常遵循规范，而且应该与 Chrome
和 Firefox 中的实现相匹配。在某些情况下，因为 Deno 有着不同的安全模式，所以稍微偏离规范是有意义的。

以下是 Deno web 平台 API 的实现列表：

- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)
- [Channel Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API)
- [Compression Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API)
- [Console](https://developer.mozilla.org/en-US/docs/Web/API/Console)
- [DOM `CustomEvent`, `EventTarget` and `EventListener`](#customevent-eventtarget-and-eventlistener)
- [Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API)
- [Fetch API](#fetch-api)
- [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [Location API](./location_api.md)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [`setTimeout`, `setInterval`, `clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)
- [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
- [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Web Storage API](./web_storage_api.md)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Worker)
- [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## `fetch` API

### 概述 {#overview}

`fetch` API 可以用来发送 HTTP 请求。 它是按照
[WHATWG `fetch` 规范](https://fetch.spec.whatwg.org/)中的规定实现的。

你可以在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 中找到关于
`fetch` API 的文档。

### 偏离规范 {#spec-deviations}

- The Deno user agent does not have a cookie jar. As such, the `set-cookie`
  header on a response is not processed, or filtered from the visible response
  headers.
- Deno does not follow the same-origin policy, because the Deno user agent
  currently does not have the concept of origins, and it does not have a cookie
  jar. This means Deno does not need to protect against leaking authenticated
  data cross origin. Because of this Deno does not implement the following
  sections of the WHATWG `fetch` specification:
  - Section `3.1. 'Origin' header`.
  - Section `3.2. CORS protocol`.
  - Section `3.5. CORB`.
  - Section `3.6. 'Cross-Origin-Resource-Policy' header`.
  - `Atomic HTTP redirect handling`.
  - The `opaqueredirect` response type.
- A `fetch` with a `redirect` mode of `manual` will return a `basic` response
  rather than an `opaqueredirect` response.
- The specification is vague on how
  [`file:` URLs are to be handled](https://fetch.spec.whatwg.org/#scheme-fetch).
  Firefox is the only mainstream browser that implements fetching `file:` URLs,
  and even then it doesn't work by default. As of Deno 1.16, Deno supports
  fetching local files. See the next section for details.
- The `request` and `response` header guards are implemented, but unlike
  browsers do not have any constraints on which header names are allowed.
- The `referrer`, `referrerPolicy`, `mode`, `credentials`, `cache`, `integrity`,
  `keepalive`, and `window` properties and their relevant behaviours in
  `RequestInit` are not implemented. The relevant fields are not present on the
  `Request` object.
- Request body upload streaming is supported (on HTTP/1.1 and HTTP/2). Unlike
  the current fetch proposal, the implementation supports duplex streaming.
- The `set-cookie` header is not concatenated when iterated over in the
  `headers` iterator. This behaviour is in the
  [process of being specified](https://github.com/whatwg/fetch/pull/1346).

### Fetching local files

As of Deno 1.16, Deno supports fetching `file:` URLs. This makes it easier to
write code that uses the same code path on a server as local, as well as easier
to author code that works both with the Deno CLI and Deno Deploy.

Deno only supports absolute file URLs, this means that `fetch("./some.json")`
will not work. It should be noted though that if
[`--location`](./location_api.md) is specified, relative URLs use the
`--location` as the base, but a `file:` URL cannot be passed as the
`--location`.

To be able to fetch some resource, relative to the current module, which would
work if the module is local or remote, you would want to use `import.meta.url`
as the base. For example, something like:

```js
const response = await fetch(new URL("./config.json", import.meta.url));
const config = await response.json();
```

Notes on fetching local files:

- Permissions are applied to reading resources, so an appropriate `--allow-read`
  permission is needed to be able to read a local file.
- Fetching locally only supports the `GET` method, and will reject the promise
  with any other method.
- A file that does not exists simply rejects the promise with a vague
  `TypeError`. This is to avoid the potential of fingerprinting attacks.
- No headers are set on the response. Therefore it is up to the consumer to
  determine things like the content type or content length.
- Response bodies are streamed from the Rust side, so large files are available
  in chunks, and can be cancelled.

## `CustomEvent`, `EventTarget` 和 `EventListener` {#customevent-eventtarget-and-eventlistener}

### 概述 {#overview}

DOM 事件 API 可以用来调度和监听应用程序中发生的事件。 它是按照
[WHATWG DOM 规范](https://dom.spec.whatwg.org/#events)中的规定实现的。

你可以在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 里找到关于
`EventTarget` API 的文档。

### 偏离规范 {#spec-deviations}

- 没有冒泡事件，因为 Deno 没有 DOM 层次结构，所以没有树状的事件可以冒泡/捕获。

---

## Typings {#typings}

用 TypeScript 实现定义的 web APIs
能够在[`lib.deno.shared_globals.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.shared_globals.d.ts)
和
[`lib.deno.window.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.window.d.ts)
文件中查看。

关于 workers 的具体定义可以在
[`lib.deno.worker.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.worker.d.ts)
文件中查看。
