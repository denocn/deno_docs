## 前言 {#first-steps}

这个页面包含了一些例子，来带您学习 Deno 的基础知识。

本文档假设您对 JavaScript 有一定的了解，特别是异步编程 `async`/`await`。如果您是首次接触 JavaScript，在您尝试使用
Deno 之前，您需要先学习掌握
[JavaScript 基础](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)。

### Hello World {#hello-world}

Deno 是 JavaScript/TypeScript 的运行时，它试图与web兼容，并尽可能使用现代功能。

与浏览器环境兼容，就是说 Deno 中的一个 `Hello World` 程序，与在浏览器中运行结果是相同的。

> 您可以在浏览器的 dev 面板 Console 里边执行

```ts
console.log("Welcome to Deno!");
```

命令行执行

```shell
deno run https://deno.land/std@$STD_VERSION/examples/welcome.ts
```

### 发送 HTTP 请求 {#making-an-http-request}

许多程序使用 HTTP 从 Web 服务器获取数据。让我们写一段代码，来获取一个文件并把文件内容打印到终端上。

与在浏览器环境一样，您可以使用 WEB 标准 API
[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 来发送 HTTP
请求：

```ts
const url = Deno.args[0];
const res = await fetch(url);

const body = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(body);
```

我们来逐步分析下这段代码:

1. 我们将得到的第一个参数存储在 `url` 这个常量中
2. 我们向指定的 `url` 发出请求，等待响应，并将响应结果存储在 `res` 常量中
3. 我们将响应体解析为
   [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)，等待响应，并将其转换为
   [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
   以存储在 `body` 常量中
4. 我们将 `body` 常量的内容写入 `stdout`

试试看:

```shell
deno run https://deno.land/std@$STD_VERSION/examples/curl.ts https://example.com
```

你会看到这个程序返回一个关于网络访问的错误，问题出在哪儿呢？您可能还记得在介绍中说过，Deno 是一个默认安全的运行时。所谓
“默认安全”，就是说您需要显式地授予程序执行某些操作的权限，例如访问网络。

带上授权标志，重试一下:

```shell
deno run --allow-net=example.com https://deno.land/std@$STD_VERSION/examples/curl.ts https://example.com
```

### 读取文件 {#reading-a-file}

Deno 还提供了不是来自 web 的 api。这些都包含在 `Deno` global 中。您可以在
[doc.deno.land](https://doc.deno.land/deno/stable/~/Deno) 上找到这些 API 的文档。

例如，文件系统API没有web标准表单，因此Deno提供了自己的API。

在下面这个程序中，每个命令行参数都假定为一个文件名，打开文件并打印到stdout。

```ts
import { copy } from "https://deno.land/std@$STD_VERSION/streams/conversion.ts";
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  await copy(file, Deno.stdout);
  file.close();
}
```

这里的 `copy()` 函数实际上只生成必要的内核→用户空间→内核副本.
也就是说，从文件中读取数据的内存被写入标准输出。这说明了Deno中I/O流的通用设计目标。

试试这个:

```shell
# macOS / Linux
deno run --allow-read https://deno.land/std@$STD_VERSION/examples/cat.ts /etc/hosts

# Windows
deno run --allow-read https://deno.land/std@$STD_VERSION/examples/cat.ts "C:\Windows\System32\Drivers\etc\hosts"
```

### TCP服务器 {#tcp-server}

这是一个服务器的例子，它接受端口 8080 上的连接，并向客户机返回它发送的任何内容。

```ts
import { copy } from "https://deno.land/std@$STD_VERSION/streams/conversion.ts";
const hostname = "0.0.0.0";
const port = 8080;
const listener = Deno.listen({ hostname, port });
console.log(`Listening on ${hostname}:${port}`);
for await (const conn of listener) {
  copy(conn, conn);
}
```

出于安全原因，Deno 不允许程序在没有明确许可的情况下访问网络。要允许访问网络，请使用命令行标志:

```shell
deno run --allow-net https://deno.land/std@$STD_VERSION/examples/echo_server.ts
```

要测试它，请尝试用 `netcat` 向它发送数据(Windows 系统使用 `telnet`):

> Note for Windows users: netcat is not available on Windows. Instead you can
> use the built-in telnet client. The telnet client is disabled in Windows by
> default. It is easy to enable however: just follow the instructions
> [on Microsoft TechNet](https://social.technet.microsoft.com/wiki/contents/articles/38433.windows-10-enabling-telnet-client.aspx)

```shell
# Note for Windows users: replace the `nc` below with `telnet`
$ nc localhost 8080
hello world
hello world
```

与 `cat.ts` 示例一样，这里的 `copy()` 函数也不会复制不必要的内存。 它从内核接收一个数据包并将其发回，仅此而已。

### 更多例子 {#more-examples}

您可以在[示例](../examples) 一章中找到更多示例，如：HTTP文件服务器。
