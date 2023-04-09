<<<<<<< HEAD
# TCP 服务器

这是一个示例服务器，它在端口 8080 上接受连接，并返回客户端发送的任何内容。
=======
# TCP server

This is an example of a server which accepts connections on port 8080, and
returns to the client anything it sends.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
const hostname = "0.0.0.0";
const port = 8080;
const listener = Deno.listen({ hostname, port });
console.log(`Listening on ${hostname}:${port}`);
for await (const conn of listener) {
  conn.readable.pipeTo(conn.writable);
}
```

<<<<<<< HEAD
出于安全原因，Deno
不允许程序在没有明确许可的情况下访问网络。要允许访问网络，请使用命令行标志：
=======
For security reasons, Deno does not allow programs to access the network without
explicit permission. To allow accessing the network, use a command-line flag:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell
deno run --allow-net https://deno.land/std@$STD_VERSION/examples/echo_server.ts
```

<<<<<<< HEAD
要测试它，请使用 `netcat`（或者 Windows 上的 `telnet`）向其发送数据：

> Windows 用户请注意：netcat 在 Windows 上不可用。您可以使用内置的 telnet
> 客户端。但默认情况下，Windows 中的 telnet
> 客户端是禁用的。不过可以轻松启用它：只需按照
> [Microsoft TechNet 上的说明](https://social.technet.microsoft.com/wiki/contents/articles/38433.windows-10-enabling-telnet-client.aspx)
> 操作即可。

```shell
# Windows 用户请注意：将下面的 `nc` 替换为 `telnet`
=======
To test it, try sending data to it with `netcat` (or `telnet` on Windows):

> Note for Windows users: netcat is not available on Windows. Instead you can
> use the built-in telnet client. The telnet client is disabled in Windows by
> default. It is easy to enable however: just follow the instructions
> [on Microsoft TechNet](https://social.technet.microsoft.com/wiki/contents/articles/38433.windows-10-enabling-telnet-client.aspx)

```shell
# Note for Windows users: replace the `nc` below with `telnet`
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
$ nc localhost 8080
hello world
hello world
```

<<<<<<< HEAD
与 `cat.ts` 示例一样，`pipeTo(writable)`
方法不会复制数据。数据直接从可读流写入可写流。
=======
Like the `cat.ts` example, the `pipeTo(writable)` method does not make a copy of
the data. The data is directly written from the readable stream to the writable
stream.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
