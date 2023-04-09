<<<<<<< HEAD
# 获取数据
=======
# Fetch Data
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

## 概念

<<<<<<< HEAD
- 和浏览器一样，Deno 实现了 web 标准 API，如
  [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)。
- Deno 默认安全，需要显式授权才能访问网络。
- 也可以查看：Deno 的 [permissions](../basics/permissions.md) 模型。
=======
- Like browsers, Deno implements web standard APIs such as
  [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
- Deno is secure by default, meaning explicit permission must be granted to
  access the network.
- See also: Deno's [permissions](../basics/permissions.md) model.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

## 概述

在构建任何类型的 web 应用程序时，开发人员通常需要从 web
上的其他地方检索数据。这在 Deno 中和在任何其他 JavaScript
应用程序中一样工作，只需调用 `fetch()` 方法即可。有关 fetch 的更多信息，请阅读
[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)。

Deno 的异常发生在运行一个通过 web 进行调用的脚本时。Deno 默认安全，这意味着
IO（输入/输出）的访问是被禁止的。要通过 web 进行调用，必须明确告诉 Deno
允许这样做。这可以通过在 `deno run` 命令中加入 `--allow-net` 标志来实现。

## 示例

**命令：** `deno run --allow-net fetch.ts`

```js
/**
 * 输出：JSON 数据
 */
const jsonResponse = await fetch("https://api.github.com/users/denoland");
const jsonData = await jsonResponse.json();
console.log(jsonData);

/**
 * 输出：HTML 数据
 */
const textResponse = await fetch("https://deno.land/");
const textData = await textResponse.text();
console.log(textData);

/**
 * 输出：错误消息
 */
try {
  await fetch("https://does.not.exist/");
} catch (error) {
  console.log(error);
}
```

## 文件和流

<<<<<<< HEAD
就像在浏览器中一样，发送和接收大文件是可能的，这要归功于
[Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)。[`Deno.FsFile`](https://deno.land/api@$CLI_VERSION?s=Deno.FsFile)
API
提供了两个属性：[`readable`](https://deno.land/api@$CLI_VERSION?s=Deno.FsFile#prop_readable)
和
[`writable`](https://deno.land/api@$CLI_VERSION?s=Deno.FsFile#prop_writable)，可以用来将
Deno 文件转换为可写或可读流。
=======
Like in browsers, sending and receiving large files is possible thanks to the
[Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).
[`Deno.FsFile`](https://deno.land/api@$CLI_VERSION?s=Deno.FsFile) API provides
two properties:
[`readable`](https://deno.land/api@$CLI_VERSION?s=Deno.FsFile#prop_readable) and
[`writable`](https://deno.land/api@$CLI_VERSION?s=Deno.FsFile#prop_writable),
which can be used to convert a Deno file into a writable or readable stream.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

**命令：** `deno run --allow-read --allow-write --allow-net fetch_file.ts`

```ts
/**
 * 接收文件
 */
const fileResponse = await fetch("https://deno.land/logo.svg");

if (fileResponse.body) {
  const file = await Deno.open("./logo.svg", { write: true, create: true });
  await fileResponse.body.pipeTo(file.writable);
}

/**
 * 发送文件
 */
const file = await Deno.open("./logo.svg", { read: true });

await fetch("https://example.com/", {
  method: "POST",
  body: file.readable,
});
```
