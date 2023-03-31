# 重新加载模块

默认情况下，缓存中的模块将被重用而不需要获取或重新编译它。有时这并不理想，你可以强制
deno 重新获取和重新编译模块到缓存中。您可以使用 `deno cache` 子命令的 `--reload`
标志来使本地 `DENO_DIR` 缓存失效。其用法如下：

## 重新加载所有内容

```bash
deno cache --reload my_module.ts
```

## 重新加载特定模块

有时我们只想升级一些模块。可以通过向 `--reload` 标志传递参数来控制它。

要重新加载所有 \$STD_VERSION 标准模块：

```bash
deno cache --reload=https://deno.land/std@$STD_VERSION my_module.ts
```

要重新加载特定模块（在本例中为颜色和文件系统复制），请使用逗号分隔的 URL。

```bash
deno cache --reload=https://deno.land/std@$STD_VERSION/fs/copy.ts,https://deno.land/std@$STD_VERSION/fmt/colors.ts my_module.ts
```

<!-- 是否应该成为示例的一部分？-->
