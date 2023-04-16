<<<<<<< HEAD
# TCP 回声服务器
=======
# TCP echo Server
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

## 概念

<<<<<<< HEAD
- 使用 [Deno.listen](/api?s=Deno.listen) 监听 TCP 端口连接。
- 使用 [Deno.Conn.readable](/api?s=Deno.Conn#prop_readable) 和
  [Deno.Conn.writable](/api?s=Deno.Conn#prop_writable)
  获取传入的数据并将其重定向为传出的数据。
=======
- Listening for TCP port connections with [Deno.listen](/api?s=Deno.listen).
- Use [Deno.Conn.readable](/api?s=Deno.Conn#prop_readable) and
  [Deno.Conn.writable](/api?s=Deno.Conn#prop_writable) to take inbound data and
  redirect it to be outbound data.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

## 示例

以下是一个服务器示例，它在端口 8080
上接受连接，并将客户端发送的任何内容返回给客户端。

```ts
/**
 * echo_server.ts
 */
const listener = Deno.listen({ port: 8080 });
console.log("listening on 0.0.0.0:8080");
for await (const conn of listener) {
  conn.readable.pipeTo(conn.writable);
}
```

使用以下命令运行：

```shell
deno run --allow-net echo_server.ts
```

要测试它，请使用 [netcat](https://en.wikipedia.org/wiki/Netcat)
发送数据到它上面（仅限 Linux/MacOS）。下面的 `'hello world'`
被发送到连接上，然后被回显回到用户：

```shell
$ nc localhost 8080
hello world
hello world
```

<<<<<<< HEAD
就像 [cat.ts 示例](./unix_cat.md) 一样，这里的 `pipeTo()`
方法也没有进行不必要的内存拷贝。它接收来自内核的数据包并将其发送回去，没有更复杂的过程。
=======
Like the [cat.ts example](./unix_cat.md), the `pipeTo()` method here also does
not make unnecessary memory copies. It receives a packet from the kernel and
sends back, without further complexity.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
