<<<<<<< HEAD
# 第一步
=======
# First Steps
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

本页包含一些示例，以教授 Deno 的基础知识。

本文假定您具有某些 JavaScript
的先前知识，尤其是关于`async`/`await`的知识。如果您没有 JavaScript
的先前知识，您可能想在尝试开始学习 Deno 之前先查阅 JavaScript 基础知识的指南。

## Hello World

Deno 是一个 JavaScript/TypeScript 的运行时，它试图在可能的情况下具有 Web
兼容性并使用现代功能。

<<<<<<< HEAD
浏览器兼容性意味着在 Deno 中的“Hello World”程序与您在浏览器中运行的程序相同。

在本地创建一个名为 `first_steps.ts` 的文件，然后复制并粘贴下面的代码行：
=======
Browser compatibility means a `Hello World` program in Deno is the same as the
one you can run in the browser.

Create a file locally called `first_steps.ts` and copy and paste the code line
below:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
console.log("Welcome to Deno!");
```

<<<<<<< HEAD
## 运行 Deno 程序

现在，从终端运行该程序：
=======
## Running Deno programs

Now to run the program from the terminal:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell
deno run first_steps.ts
```

<<<<<<< HEAD
Deno 还具有从 URL 执行脚本的能力。Deno
宿主库中有一个包含示例代码的库，其中一个示例是“Hello
World”程序。要运行托管的代码，请执行以下操作：
=======
Deno also has the ability to execute scripts from URLs. Deno
[hosts a library](https://deno.land/std@$STD_VERSION/examples) of example code,
one of which is a `Hello World` program. To run that hosted code, do:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell
deno run https://deno.land/std@$STD_VERSION/examples/welcome.ts
```

<<<<<<< HEAD
## 进行 HTTP 请求

许多程序使用 HTTP 请求从 Web
服务器获取数据。让我们编写一个小型程序，该程序获取文件并将其内容打印到终端上。就像在浏览器中一样，您可以使用
Web 标准中的
[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API 进行
HTTP 调用。

在上面创建的 `first_steps.ts` 文件中，粘贴以下代码：
=======
## Making an HTTP request

Many programs use HTTP requests to fetch data from a web server. Let's write a
small program that fetches a file and prints its contents out to the terminal.
Just like in the browser you can use the web standard
[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API to
make HTTP calls.

In the `first_steps.ts` file you created above, paste the code below:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
const res = await fetch("https://deno.land");
const body = await res.text();
console.log(body);
```

让我们分步讲解一下该应用程序的操作：

<<<<<<< HEAD
1. 我们向 `https://deno.land` 发送请求，等待响应，并将其存储在常量 `res` 中。
2. 我们将响应主体解析为文本并存储在常量 `body` 中。
3. 我们将 `body` 常量的内容写入控制台。
=======
1. We make a request to the `https://deno.land`, await the response, and store
   it in the `res` constant.
1. We parse the response body as a text and store in the `body` constant.
1. We write the contents of the `body` constant to the console.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

尝试一下：

```shell
deno run first_steps.ts
```

<<<<<<< HEAD
或尝试托管在 `https://deno.land/std/$STD_VERSION/examples/curl.ts` 中的脚本：

```shell
deno run https://deno.land/std@$STD_VERSION/examples/curl.ts https://deno.land
```

您将看到该程序返回关于网络访问的错误，那么我们做错了什么？您可能还记得介绍中提到的
Deno
是默认情况下安全的运行时。这意味着您需要明确地赋予程序执行某些“特权”操作的权限，例如访问网络。

再次尝试并给予正确的权限标志：
=======
Or, try this script hosted at
`https://deno.land/std@$STD_VERSION/examples/curl.ts`:

```shell
deno run https://deno.land/std@$STD_VERSION/examples/curl.ts https://deno.land
```

You will see this program returns an error regarding network access so what did
we do wrong? You might remember from the introduction that Deno is a runtime
that is secure by default. This means you need to explicitly give programs
permission to do certain 'privileged' actions, such as access the network.

Try it out again with the correct permission flag:

```shell
deno run --allow-net=deno.land first_steps.ts
```

Or, try this script hosted at
`https://deno.land/std@$STD_VERSION/examples/curl.ts`:

```shell
deno run --allow-net=deno.land https://deno.land/std@$STD_VERSION/examples/curl.ts https://deno.land
```

## Reading a file

Deno also provides APIs that do not come from the web. These are all contained
in the `Deno` global. You can find documentation for these built-in APIs here at
[`/api`](/api).
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell
deno run --allow-net=deno.land first_steps.ts
```

<<<<<<< HEAD
或尝试托管在 `https://deno.land/std/$STD_VERSION/examples/curl.ts` 中的脚本：

```shell
deno run --allow-net=deno.land https://deno.land/std@$STD_VERSION/examples/curl.ts https://deno.land
```

## 读取一个文件

Deno 还提供了来自 Web 的 API。它们都包含在 `Deno` 全局中。您可以在
[`/api`](/api) 中找到这些内置 API 的文档。

例如，文件系统 API 没有 Web 标准形式，因此 Deno 提供了自己的 API。

在此程序中，每个命令行参数都被假定为是一个文件名，文件已打开，并打印到 stdout
中。
=======
In this program, each command-line argument is assumed to be a filename, the
file is opened, and printed to stdout.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  await file.readable.pipeTo(Deno.stdout.writable, { preventClose: true });
}
```

<<<<<<< HEAD
这里的 `ReadableStream.pipeTo(writable)`
方法实际上不做多余的内核→用户态→内核的拷贝。也就是说，从文件中读取数据的内存与写入
stdout 的内存是相同的。这说明了 Deno 中 I/O 流的一个通用设计目标。
=======
The `ReadableStream.pipeTo(writable)` method here actually makes no more than
the necessary kernel→userspace→kernel copies. That is, the same memory from
which data is read from the file is written to stdout. This illustrates a
general design goal for I/O streams in Deno.

Again, here, we need to give --allow-read access to the program.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

同样，在这里我们需要给该程序 --allow-read 访问权限。

尝试运行该程序：

```shell
# macOS / Linux
deno run --allow-read https://deno.land/std@$STD_VERSION/examples/cat.ts /etc/hosts

# Windows
deno run --allow-read https://deno.land/std@$STD_VERSION/examples/cat.ts "C:\Windows\System32\Drivers\etc\hosts"
```

<<<<<<< HEAD
## 将所有内容整合到一个 HTTP 服务器中

Deno 最常见的用例之一是构建 HTTP 服务器。

创建一个名为 `http_server.ts` 的新文件，并复制并粘贴以下代码：
=======
## Putting it all together in an HTTP server

One of the most common use cases for Deno is building an HTTP Server.

Create a new file called `http_server.ts` and copy and paste the code below:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
import { serve } from "https://deno.land/std@$STD_VERSION/http/server.ts";

const handler = async (_request: Request): Promise<Response> => {
  const resp = await fetch("https://api.github.com/users/denoland", {
<<<<<<< HEAD
    // 这里的 init 对象具有包含指定响应类型的标头信息的 headers 对象。
    // 我们不指定 method 字段，因为默认情况下 fetch 会发出 GET 请求。
=======
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
    headers: {
      accept: "application/json",
    },
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "content-type": "application/json",
    },
  });
};

serve(handler);
```

<<<<<<< HEAD
让我们分步讲解一下该程序的操作。

1. 从 `std/http`（标准库）导入 HTTP 服务器。
2. HTTP 服务器需要一个处理程序函数。该函数在每个请求到达时被调用。它必须返回
   `Response`。该处理程序函数可以是异步的（它可以返回一个 `Promise`）。
3. 使用 `fetch` 获取 url。
4. 将 GitHub 的响应作为处理程序的响应返回。
5. 最后，为了在默认端口上启动服务器，请使用处理程序调用 `serve`。

现在运行服务器。请注意，您需要给予网络权限。
=======
Let's walk through what this program does.

1. Import the http server from `std/http` (standard library)
2. HTTP servers need a handler function. This function is called for every
   request that comes in. It must return a `Response`. The handler function can
   be asynchronous (it may return a `Promise`).
3. Use `fetch` to fetch the url.
4. Return the GitHub response as a response to the handler.
5. Finally, to start the server on the default port, call `serve` with the
   handler.

Now run the server. Note that you need to give network permissions.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell
deno run --allow-net http_server.ts
```

<<<<<<< HEAD
在服务器侦听端口 `8000` 上，向该端点进行 GET 请求。
=======
With the server listening on port `8000`, make a GET request to that endpoint.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell
curl http://localhost:8000
```

<<<<<<< HEAD
您将看到来自 Deno GitHub 页面的 JSON 响应。

## 更多示例

您可以在 [示例](../examples) 章节中和
[Deno by Example](https://examples.deno.land/) 中找到更多示例。
=======
You will see a JSON response from the Deno GitHub page.

## More examples

You can find more examples in the [Examples](../examples) chapter and at
[Deno by Example](https://examples.deno.land/).
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
