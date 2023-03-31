# 内置API

全局的Deno命名空间包含了一些非Web标准的API，包括用于读取文件、打开TCP套接字、提供HTTP服务和执行子进程等API。

有关Deno内置API的完整列表，请参见[参考文献](https://deno.land/api@$CLI_VERSION?s=Deno)。以下是一些最重要的API：

## 错误

Deno运行时自带[20种错误类](https://deno.land/api@$CLI_VERSION#Errors)，可以针对各种情况抛出。

一些示例如下：

```sh
Deno.errors.NotFound;
Deno.errors.WriteZero;
```

可以按如下方式使用它们：

```ts
try {
  const file = await Deno.open("./some/file.txt");
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
    console.error("未找到文件");
  } else {
    // 否则重新抛出
    throw error;
  }
}
```

## 文件系统

Deno运行时自带[各种用于处理文件和目录的函数](https://deno.land/api@$CLI_VERSION#File_System)。您需要使用--allow-read和--allow-write权限来访问文件系统。

请参阅下面的链接，了解如何使用文件系统功能的代码示例。

- [以几种不同的方式阅读文件](https://examples.deno.land/reading-files)
- [使用流读取文件](../examples/file_server.md)
- [读取文本文件（`Deno.readTextFile`）](../examples/read_write_files.md#reading-a-text-file)
- [写入文本文件（`Deno.writeTextFile`）](../examples/read_write_files.md#writing-a-text-file)

## 输入/输出

Deno运行时自带[内置函数用于处理资源和I/O操作](https://deno.land/api@$CLI_VERSION#I/O)。

请参阅下面的链接，了解常见函数的代码示例。

- [关闭资源（`Deno.close`）](https://doc.deno.land/deno/stable/~/Deno.close)
- [在资源中寻找特定位置（`Deno.seek`）](https://doc.deno.land/deno/stable/~/Deno.seek)

## 网络

Deno运行时自带[内置函数，用于处理与网络端口的连接](https://deno.land/api@$CLI_VERSION#Network)。

请参阅下面的链接，了解常用函数的代码示例。

- [连接主机名和端口（`Deno.connect`）](https://doc.deno.land/deno/stable/~/Deno.connect)
- [在本地传输地址上通告（`Deno.listen`）](https://doc.deno.land/deno/stable/~/Deno.listen)

## 子进程

Deno运行时自带[内置函数用于启动子进程](https://deno.land/api@$CLI_VERSION#Sub_Process)。

请参阅下面的链接，了解如何创建子进程的代码示例。

- [创建子进程（`Deno.run`）](../examples/subprocess.md)
