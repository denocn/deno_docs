<<<<<<< HEAD
#文件服务器
=======
# File Server
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

##概念

<<<<<<< HEAD
- 使用 [Deno.open](/api?s=Deno.open) 以块读取文件内容。
- 将 Deno 文件转换为
  [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)。
- 使用 Deno 集成的 HTTP 服务器运行自己的文件服务器。
=======
- Use [Deno.open](/api?s=Deno.open) to read a file's content in chunks.
- Transform a Deno file into a
  [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).
- Use Deno's integrated HTTP server to run your own file server.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

##概述

<<<<<<< HEAD
通过网络发送文件是一个常见的需求。如在
[获取数据示例](./fetch_data.md)中所示，由于文件的大小可以是任意的，因此使用流防止将整个文件加载到内存中至关重要。
=======
Sending files over the network is a common requirement. As seen in the
[Fetch Data example](./fetch_data.md), because files can be of any size, it is
important to use streams in order to prevent having to load entire files into
memory.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

##示例

**命令:** `deno run --allow-read --allow-net file_server.ts`

```ts
//在本地主机的8080端口上开始监听。
const server = Deno.listen({ port: 8080 });
console.log("文件服务器运行在http://localhost:8080/");

for await (const conn of server) {
  handleHttp(conn).catch(console.error);
}

async function handleHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    // 将请求的路径名用作文件路径
    const url = new URL(requestEvent.request.url);
    const filepath = decodeURIComponent(url.pathname);

    //尝试打开文件
    let file;
    try {
      file = await Deno.open("." + filepath, { read: true });
    } catch {
      //如果无法打开文件，则返回“404 Not Found”响应
      const notFoundResponse = new Response("404 Not Found", { status: 404 });
      await requestEvent.respondWith(notFoundResponse);
      continue;
    }

    //构建可读流，这样我们可以在发送文件时不必完全加载到内存中
    const readableStream = file.readable;

    //构建并发送响应
    const response = new Response(readableStream);
    await requestEvent.respondWith(response);
  }
}
```

##使用 `std/http` 文件服务器

Deno 标准库为您提供了
[file server](https://deno.land/std@$STD_VERSION/http/file_server.ts) ，使
您无需编写自己的服务器。

要使用它，首先将远程脚本安装到本地文件系统。这将 将脚本安装到 Deno 安装根 bin
目录，例如 `/home/alice/.deno/bin/file_server`。

```shell
deno install --allow-net --allow-read https://deno.land/std@$STD_VERSION/http/file_server.ts
```

现在，您可以使用简化的脚本名称运行该脚本。运行它：

```shell
$ file_server .
Downloading https://deno.land/std@$STD_VERSION/http/file_server.ts...
[...]
HTTP server listening on http://0.0.0.0:4507/
```

现在，转到您的 Web 浏览器中的
[http://0.0.0.0:4507/](http://0.0.0.0:4507/)，以查看本地目录内容。

所有选项的完整列表都可通过以下方式获得：

```shell
file_server --help
```

示例输出：

```
Deno File Server
    Serves a local directory in HTTP.
  INSTALL:
    deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts
  USAGE:
    file_server [path] [options]
  OPTIONS:
    -h, --help          Prints help information
    -p, --port <PORT>   Set port
    --cors              Enable CORS via the "Access-Control-Allow-Origin" header
    --host     <HOST>   Hostname (default is 0.0.0.0)
    -c, --cert <FILE>   TLS certificate file (enables TLS)
    -k, --key  <FILE>   TLS key file (enables TLS)
    --no-dir-listing    Disable directory listing
    All TLS options are required when one is provided.
```
