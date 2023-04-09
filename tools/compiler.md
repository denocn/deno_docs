<<<<<<< HEAD
# 编译可执行文件
=======
# Compiling Executables
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

`deno compile [--output <OUT>] <SRC>` 命令可将脚本编译成一个自包含的可执行文件。

```
> deno compile https://deno.land/std/examples/welcome.ts
```

如果省略 `OUT` 参数，可推断出可执行文件的名称。

<<<<<<< HEAD
## 标志
=======
## Flags
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

与 [`deno install`](./script_installer.md)
一样，编译时要指定用于执行脚本的运行时标志，包括权限标志。

```
> deno compile --allow-read --allow-net https://deno.land/std/http/file_server.ts
```

可部分嵌入[脚本参数](../getting_started/command_line_interface.md#script-arguments)。

```
> deno compile --allow-read --allow-net https://deno.land/std/http/file_server.ts -p 8080
> ./file_server --help
```

<<<<<<< HEAD
## 交叉编译
=======
## Cross Compilation
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

可通过添加 `--target` 命令行标识符为其他平台编译二进制文件。Deno 目前支持编译到
Windows x64、macOS x64、macOS ARM 和 Linux x64。使用 `deno compile --help`
列出每个编译目标的所有值。

<<<<<<< HEAD
## 不可用于可执行文件中

- [Workers](../runtime/workers.md)
- 动态导入
=======
## Unavailable in executables

>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
- [Web Storage API](../runtime/web_storage_api.md)
