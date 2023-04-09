<<<<<<< HEAD
# 简单的 HTTP Web 服务器
=======
# Simple HTTP Web Server
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

## 概念

- 使用 Deno 集成的 HTTP 服务器运行你自己的 Web 服务器。

## 概述

只需几行代码，你就可以运行自己的 HTTP Web 服务器，并控制响应状态、请求头等。

## 示例 Web 服务器

在此示例中，将客户端的 User-Agent 返回给客户端：

**webserver.ts**：

```ts
// 开始在 localhost 的 8080 端口上监听。
const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

// 连接服务器将作为异步可迭代项产生。
for await (const conn of server) {
  // 为了不阻塞，我们需要分别处理每个连接，而不需要等待函数。
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  // 这将把一个网络连接升级为一个 HTTP 连接。
  const httpConn = Deno.serveHttp(conn);
  // 每个通过 HTTP 连接发送的请求将从 HTTP 连接中作为异步迭代器产生。
  for await (const requestEvent of httpConn) {
    // 原生的 HTTP 服务器使用 Web 标准的 Request 和 Response 对象。
    const body = `Your user-agent is:\n\n${
      requestEvent.request.headers.get("user-agent") ?? "Unknown"
    }`;
    // 请求事件的 .respondWith() 方法是我们将响应发送回客户端的方式。
    requestEvent.respondWith(
      new Response(body, {
        status: 200,
      }),
    );
  }
}
```

然后使用以下命令运行：

```shell
deno run --allow-net webserver.ts
```

然后在浏览器中导航到 `http://localhost:8080/` 。

### 使用 `std/http` 库

> ℹ️ 从 `^1.13.x` 版本开始，由于 _原生_ HTTP 绑定的稳定化， std/http 现在支持从
> `^0.107.0` 起的 _原生_ HTTP 服务器。 从 0.117.0 版本起删除了旧的服务器模块。

**webserver.ts**：

```ts
import { serve } from "https://deno.land/std@$STD_VERSION/http/server.ts";

const port = 8080;

const handler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
```

然后使用以下命令运行：

```shell
deno run --allow-net webserver.ts
```
