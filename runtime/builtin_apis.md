<<<<<<< HEAD
# 内置API

全局的Deno命名空间包含了一些非Web标准的API，包括用于读取文件、打开TCP套接字、提供HTTP服务和执行子进程等API。

有关Deno内置API的完整列表，请参见[参考文献](https://deno.land/api@$CLI_VERSION?s=Deno)。以下是一些最重要的API：

## 错误

Deno运行时自带[20种错误类](https://deno.land/api@$CLI_VERSION#Errors)，可以针对各种情况抛出。

一些示例如下：
=======
# Built-in API

The global Deno namespace contains APIs that are not web standard, including
APIs for reading from files, opening TCP sockets, serving HTTP, and executing
subprocesses, etc.

For a full list of Deno Built-in APIs, see the
[reference](https://deno.land/api@$CLI_VERSION?s=Deno). Below we highlight some
of the most important.

## Errors

The Deno runtime comes with
[20 error classes](https://deno.land/api@$CLI_VERSION#Errors) that can be raised
in response to a number of conditions.

Some examples are:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```sh
Deno.errors.NotFound;
Deno.errors.WriteZero;
```

<<<<<<< HEAD
可以按如下方式使用它们：
=======
They can be used as below:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```ts
try {
  const file = await Deno.open("./some/file.txt");
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
<<<<<<< HEAD
    console.error("未找到文件");
  } else {
    // 否则重新抛出
=======
    console.error("the file was not found");
  } else {
    // otherwise re-throw
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
    throw error;
  }
}
```

<<<<<<< HEAD
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
=======
## File System

The Deno runtime comes with
[various functions for working with files and directories](https://deno.land/api@$CLI_VERSION#File_System).
You will need to use --allow-read and --allow-write permissions to gain access
to the file system.

Refer to the links below for code examples of how to use the file system
functions.

- [Reading files in several different ways](https://examples.deno.land/reading-files)
- [Reading files in streams](../examples/file_server.md)
- [Reading a text file (`Deno.readTextFile`)](../examples/read_write_files.md#reading-a-text-file)
- [Writing a text file (`Deno.writeTextFile`)](../examples/read_write_files.md#writing-a-text-file)

## I/O

The Deno runtime comes with
[built-in functions for working with resources and I/O](https://deno.land/api@$CLI_VERSION#I/O).

Refer to the links below for code examples for common functions.

- [Closing resources (`Deno.close`)](https://doc.deno.land/deno/stable/~/Deno.close)
- [Seeking a certain position within the resource (`Deno.seek`)](https://doc.deno.land/deno/stable/~/Deno.seek)

## Network

The Deno runtime comes with
[built-in functions for dealing with connections to network ports](https://deno.land/api@$CLI_VERSION#Network).

Refer to the links below for code examples for common functions.

- [Connect to the hostname and port (`Deno.connect`)](https://doc.deno.land/deno/stable/~/Deno.connect)
- [Announcing on the local transport address (`Deno.listen`)](https://doc.deno.land/deno/stable/~/Deno.listen)

## Sub Process

The Deno runtime comes with
[built-in functions for spinning up subprocesses](https://deno.land/api@$CLI_VERSION#Sub_Process).

Refer to the links below for code samples of how to create a subprocess.

- [Creating a subprocess (`Deno.run`)](../examples/subprocess.md)
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
