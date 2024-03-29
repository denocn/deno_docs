# Unix "cat" 程序的实现

## 概念

- 使用 Deno 运行时 API 将文件内容输出到控制台。
- [Deno.args](/api?s=Deno.args) 可以访问命令行参数。
- [Deno.open](/api?s=Deno.open) 用于获取文件的句柄。
- [Deno.stdout.writable](/api?s=Deno.stdout.writable)
  用于获取控制台标准输出的可写流。
- [Deno.FsFile.readable](/api?s=Deno.FsFile#prop_readable)
  用于从文件中获取可读流（该可读流在完成读取时关闭文件，因此不需要显式关闭文件）。
- 模块可以直接从远程 URL 运行。

## 示例

在这个程序中，每个命令行参数被假定为一个文件名，文件被打开并打印到
stdout（比如控制台）。

```ts
/**
 * cat.ts
 */
for (const filename of Deno.args) {
  const file = await Deno.open(filename);
  await file.readable.pipeTo(Deno.stdout.writable, { preventClose: true });
}
```

运行程序的方法：

```shell
deno run --allow-read https://deno.land/std@$STD_VERSION/examples/cat.ts /etc/passwd
```
