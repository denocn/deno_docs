<<<<<<< HEAD
# 重新加载模块

默认情况下，缓存中的模块将被重用而不需要获取或重新编译它。有时这并不理想，你可以强制
deno 重新获取和重新编译模块到缓存中。您可以使用 `deno cache` 子命令的 `--reload`
标志来使本地 `DENO_DIR` 缓存失效。其用法如下：

## 重新加载所有内容
=======
# Reloading Modules

By default, a module in the cache will be reused without fetching or
re-compiling it. Sometimes this is not desirable and you can force deno to
refetch and recompile modules into the cache. You can invalidate your local
`DENO_DIR` cache using the `--reload` flag of the `deno cache` subcommand. It's
usage is described below:

## To reload everything
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```bash
deno cache --reload my_module.ts
```

<<<<<<< HEAD
## 重新加载特定模块

有时我们只想升级一些模块。可以通过向 `--reload` 标志传递参数来控制它。

要重新加载所有 \$STD_VERSION 标准模块：
=======
## To reload specific modules

Sometimes we want to upgrade only some modules. You can control it by passing an
argument to a `--reload` flag.

To reload all \$STD_VERSION standard modules:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```bash
deno cache --reload=https://deno.land/std@$STD_VERSION my_module.ts
```

<<<<<<< HEAD
要重新加载特定模块（在本例中为颜色和文件系统复制），请使用逗号分隔的 URL。
=======
To reload specific modules (in this example - colors and file system copy) use a
comma to separate URLs.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```bash
deno cache --reload=https://deno.land/std@$STD_VERSION/fs/copy.ts,https://deno.land/std@$STD_VERSION/fmt/colors.ts my_module.ts
```

<<<<<<< HEAD
<!-- 是否应该成为示例的一部分？-->
=======
<!-- Should this be part of examples? -->
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
