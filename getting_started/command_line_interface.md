## 命令行接口 {#command-line-interface}

Deno 是一个命令行程序。到目前为止，你应该熟悉一些简单的命令，并且已经了解了 shell 使用的基本知识。

这是查看主要帮助文档的几种方式:

```shell
# 使用子命令
deno help

# 使用短选项 -- 输出和上面一样
deno -h

# 使用长选项 -- 输出更详细的帮助文本（如有）
deno --help
```

Deno 的 CLI 是基于子命令的。上面提到的帮助命令展示了一个子命令列表，比如 `deno bundle`。 如果你想查看 `bundle`
特定子命令，可以类比帮助文档的命令行，运行以下命令其中的一种：

```shell
deno help bundle
deno bundle -h
deno bundle --help
```

在[这里](../tools.md)你能够找到各个子命令更详细的指南。

### 脚本来源 {#script-source}

Deno 能够从多个来源抓取脚本，比如一个文件名、一个 URL，或者是 "-"，表示从标准输入（stdin）读取。最后一项与其他应用集成时很有用。

```shell
deno run main.ts
deno run https://mydomain.com/main.ts
cat main.ts | deno run -
```

### 脚本参数 {#script-arguments}

通过在脚本名称后指定参数，您可以将用户空间参数放在**最后面**以传递给要运行的脚本，这些参数与 Deno 运行时选项区分开。

```shell
deno run main.ts a b -c --quiet
```

```ts
// main.ts
console.log(Deno.args); // [ "a", "b", "-c", "--quiet" ]
```

**请注意，在脚本名称之后传递的所有内容都将作为脚本参数传递，而不会用作 Deno 运行时选项。** 这将导致以下陷阱：

```shell
# 正常情况：我们给 net_client.ts 授予网络权限。
deno run --allow-net net_client.ts

# 错误情况：--allow-net 传递为 Deno.args，引发网络权限错误。
deno run net_client.ts --allow-net
```

有人认为这打破了常规：

> 一个非位置选项的解析方式会根据位置变化。

然而:

1. 这是区分运行时选项和脚本参数的最合乎逻辑的方法。
2. 实际上，这和其他流行的运行时具有相同的行为。
   - 试试 `node -c index.js` 和 `node index.js -c`. 第一个只会根据`-c`选项对 `index.js`
     做语法检查. 而第二个会 _执行_ `index.js`，将`-c` 传递为`require("process").argv`。

---

存在一些有逻辑的选项组，它们在相关的子命令之间共享。 接下来我们将会讨论。

### 观察模式 {#watch-mode}

你可以在 `deno run`、`deno test`、`deno bundle` 和 `deno fmt` 后面应用 `--watch`
选项，启用内置的文件观察器。当 Deno 用这个选项启动时，它会监视：

- for `deno run`, `deno test`, and `deno bundle` the entrypoint, and all local
  files the entrypoint(s) statically import(s) will be watched.
- for `deno fmt` all local files and directories specified as command line
  arguments (or the working directory if no specific files/directories is
  passed) are watched.

Whenever one of the watched files is changed on disk, the program will
automatically be restarted / formatted / tested / bundled.

```shell
deno run --watch main.ts
deno test --watch
deno fmt --watch
```

### Integrity flags (lock files)

Affect commands which can download resources to the cache: `deno cache`,
`deno run`, `deno test`, `deno bundle`, `deno doc`, and `deno compile`. >>>>>>>
20b3c6f375ccdd16ab16c341e4e8604ff344e7c1

```terminal
--lock <FILE>    检查指定的锁文件
--lock-write     写入锁文件. 和 --lock 一起使用.
```

更多信息在[这里](../linking_to_external_code/integrity_checking.md).

### 缓存和编译选项 {#cache-and-compilation-flags}

Affect commands which can populate the cache: `deno cache`, `deno run`,
`deno test`, `deno bundle`, `deno doc`, and `deno compile`. As well as the flags
above, this includes those which affect module resolution, compilation
configuration etc.

```terminal
--config <FILE>               加载配置文件
--import-map <FILE>           加载导入映射文件
--no-remote                   不要解析远程模块
--reload=<CACHE_BLOCKLIST>    重新加载源代码缓存（重新编译 TypeScript）
--unstable                    启用不稳定 API
```

### 运行时选项 {#runtime-flags}

对运行用户代码有影响的命令: `deno run` 和 `deno test`. 这些包括以上所有和以下内容。

#### Type checking flags

You can type-check your code (without executing it) using the command:

```shell
> deno check main.ts
```

You can also type-check your code before execution by using the `--check`
argument to deno run:

```shell
> deno run --check main.ts
```

This flag affects `deno run`, `deno eval`, `deno repl` and `deno cache`. The
following table describes the type-checking behavior of various subcommands.
Here "Local" means that only errors from local code will induce type-errors,
modules imported from https URLs (remote) may have type errors that are not
reported. (To turn on type-checking for all modules, use `--check=all`.)

| Subcommand     | Type checking mode |
| -------------- | ------------------ |
| `deno bench`   | 📁 Local            |
| `deno bundle`  | 📁 Local            |
| `deno cache`   | ❌ None             |
| `deno check`   | 📁 Local            |
| `deno compile` | 📁 Local            |
| `deno eval`    | ❌ None             |
| `deno repl`    | ❌ None             |
| `deno run`     | ❌ None             |
| `deno test`    | 📁 Local            |

#### Permission flags

[这里](./permissions.md#permissions-list)列出了所有权限选项

#### 其他运行时选项 {#other-runtime-flags}

对运行环境有影响的更多选项：

```terminal
--cached-only                要求远程依赖已经被缓存
--inspect=<HOST:PORT>        在 host:port 启动检查器
--inspect-brk=<HOST:PORT>    在 host:port 启动检查器并且暂停执行
--location <HREF>            Value of 'globalThis.location' used by some web APIs
--seed <NUMBER>              指定 Math.random() 的随机种子
--v8-flags=<v8-flags>        设置 V8 命令行选项
```
