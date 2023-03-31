# 稳定性

从 Deno 1.0.0 开始，`Deno` 命名空间的 API 是稳定的。这意味着我们将努力使在 1.0.0
下运行的代码在未来版本中仍然能够工作。

但是，不是所有的 Deno
特性都准备好投入生产使用。那些尚未准备好的特性，因为它们仍处于草案阶段，被锁定在`--unstable`
命令行标志后面。

```shell
deno run --unstable mod_which_uses_unstable_stuff.ts
```

传递这个标志会做几件事：

- 它在运行时启用了不稳定的 API。
- 它将
  [`lib.deno.unstable.d.ts`](https://doc.deno.land/https://raw.githubusercontent.com/denoland/deno/main/cli/tsc/dts/lib.deno.unstable.d.ts)
  文件添加到用于类型检查的 TypeScript 定义列表中。这包括 `deno types` 的输出。

你应该注意到，许多不稳定的 API 没有经过安全审查，很可能在未来发生破坏性的 API
更改，并且还没有准备好投入生产使用。

## 标准模块

Deno
的标准模块（https://deno.land/std@STD_VERSION）尚未稳定。我们当前将标准模块与
CLI 分别进行版本控制以反映这一点。请注意，与 `Deno`
命名空间不同，使用标准模块不需要 `--unstable`
标志（除非标准模块本身使用了不稳定的 Deno 功能）。
