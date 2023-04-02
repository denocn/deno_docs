<<<<<<< HEAD
# 读写文件
=======
# Read and Write Files
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

## 概述

<<<<<<< HEAD
通过标准库和 Deno 运行时 API，与文件系统交互以读取和写入文件是很常见的。如同
[获取数据示例](./fetch_data.md) 中所示，出于安全原因，Deno
默认情况下限制了对输入/输出的访问。因此，在与文件系统交互时，必须使用 `deno run`
命令的 `--allow-read` 和 `--allow-write` 参数。
=======
- Deno's runtime API provides the [Deno.readTextFile](/api?s=Deno.readTextFile)
  and [Deno.writeTextFile](/api?s=Deno.writeTextFile) asynchronous functions for
  reading and writing entire text files.
- Like many of Deno's APIs, synchronous alternatives are also available. See
  [Deno.readTextFileSync](/api?s=Deno.readTextFileSync) and
  [Deno.writeTextFileSync](/api?s=Deno.writeTextFileSync).
- Use `--allow-read` and `--allow-write` permissions to gain access to the file
  system.
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

## 概念

<<<<<<< HEAD
Deno 的运行时 API 提供了异步函数 [Deno.readTextFile](/api?s=Deno.readTextFile)
和
[Deno.writeTextFile](/api?s=Deno.writeTextFile)，用于读取和写入整个文本文件。与许多
Deno 的 API 一样，同步函数的替代方案也可用。请参见
[Deno.readTextFileSync](/api?s=Deno.readTextFileSync) 和
[Deno.writeTextFileSync](/api?s=Deno.writeTextFileSync)。

## 读取文本文件
=======
Interacting with the filesystem to read and write files is a common requirement.
Deno provides a number of ways to do this via the
[standard library](https://deno.land/std) and the [Deno runtime API](/api).

As highlighted in the [Fetch Data example](./fetch_data.md) Deno restricts
access to Input / Output by default for security reasons. Therefore when
interacting with the filesystem the `--allow-read` and `--allow-write` flags
must be used with the `deno run` command.
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

Deno 运行时 API 通过 `Deno.readTextFile()`
方法读取文本文件，只需要一个路径字符串或 URL 对象。该方法返回一个
Promise，可访问文件的文本数据。

**命令：** `deno run --allow-read read.ts`

```typescript
/**
 * read.ts
 */
const text = await Deno.readTextFile("./people.json");
console.log(text);

/**
 * Output:
 *
 * [
 *   {"id": 1, "name": "John", "age": 23},
 *   {"id": 2, "name": "Sandra", "age": 51},
 *   {"id": 5, "name": "Devika", "age": 11}
 * ]
 */
```

## 写入文本文件

Deno 运行时 API 允许开发人员通过 `Deno.writeTextFile()`
方法写入文本到文件中。它只需要一个文件路径和文本字符串。该方法返回一个
Promise，在成功写入文件时解决。

要运行该命令，必须向 `deno run` 命令提供 `--allow-write` 参数。

**命令：** `deno run --allow-write write.ts`

```typescript
/**
 * write.ts
 */
await Deno.writeTextFile("./hello.txt", "Hello World!");
console.log("File written to ./hello.txt");

/**
 * Output: File written to ./hello.txt
 */
```

<<<<<<< HEAD
您可以像这样向文件添加文本：
=======
You can _append_ text to a file like this:

```typescript
await Deno.writeTextFile("./hello.txt", "This text will be appended.", {
  append: true,
});
```

By combining `Deno.writeTextFile` and `JSON.stringify` you can easily write
serialized JSON objects to a file. This example uses synchronous
`Deno.writeTextFileSync`, but this can also be done asynchronously using
`await Deno.writeTextFile`.
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```typescript
await Deno.writeTextFile("./hello.txt", "This text will be appended.", {
  append: true,
});
```

通过将 `Deno.writeTextFile` 和 `JSON.stringify` 结合使用，您可以轻松地将序列化的
JSON 对象写入文件。此示例使用同步 `Deno.writeTextFileSync`，但也可以使用
`await Deno.writeTextFile` 异步执行。要执行代码，`deno run` 命令需要写入标志。

**命令：** `deno run --allow-write write.ts`

```typescript
/**
 * write.ts
 */
function writeJson(path: string, data: object): string {
  try {
    Deno.writeTextFileSync(path, JSON.stringify(data));

    return "Written to " + path;
  } catch (e) {
    return e.message;
  }
}

console.log(writeJson("./data.json", { hello: "World" }));

/**
 * Output: Written to ./data.json
 */
```
