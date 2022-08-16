## 重新加载模块 {#reloading-modules}

在默认情况下，缓存中的模块是会被重用，而无需重新获取或重新编译它。有时重用是不好使的，你可以强制 deno
重新获取模块并将其重新编译到缓存中。你可以使用`deno cache`的子命令的"--reload
"选项来使你的本地`DENO_DIR`缓存无效。它的用法描述如下：

### 重新加载所有内容 {#to-reload-everything}

```bash
deno cache --reload my_module.ts
```

### 重新加载特定模块 {#to-reload-specific-modules}

有时我们只想升级一部分模块。你可以通过将参数传递给`--reload` 选项。

要重新加载所有 \$STD_VERSION 标准模块：

```bash
deno cache --reload=https://deno.land/std@$STD_VERSION my_module.ts
```

要重新加载特定模块（在此示例中 - 颜色和文件系统副本），请使用逗号分隔 URL。

```bash
deno cache --reload=https://deno.land/std@$STD_VERSION/fs/copy.ts,https://deno.land/std@$STD_VERSION/fmt/colors.ts my_module.ts
```

<!-- Should this be part of examples? -->
