<<<<<<< HEAD
# 警告：`deno bundle` 已过时，并将在未来的版本中被移除。请使用 [deno_emit](https://github.com/denoland/deno_emit)、[esbuild](https://esbuild.github.io/) 或 [rollup](https://rollupjs.org)。
=======
# WARNING: `deno bundle` has been deprecated and will be removed in some future release. Use [deno_emit](https://github.com/denoland/deno_emit), [esbuild](https://esbuild.github.io/) or [rollup](https://rollupjs.org) instead.

# Bundling
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

# 打包

`deno bundle [URL]` 会输出一个单独的 JavaScript 文件，用于在 Deno
中使用，其中包含指定输入的所有依赖项。例如：

```bash
deno bundle https://deno.land/std@$STD_VERSION/examples/colors.ts colors.bundle.js
Bundle https://deno.land/std@$STD_VERSION/examples/colors.ts
Download https://deno.land/std@$STD_VERSION/examples/colors.ts
Download https://deno.land/std@$STD_VERSION/fmt/colors.ts
Emit "colors.bundle.js" (9.83KB)
```

如果省略输出文件，那么打包结果将被发送到 `stdout`。

打包结果可以像其他模块一样在 Deno 中运行：

```bash
deno run colors.bundle.js
```

输出是一个独立的 ES
Module，在命令行上提供的主模块中导出的任何模块都将可用。例如，如果主模块看起来像这样：

```ts, ignore
export { foo } from "./foo.js";

export const bar = "bar";
```

它可以这样导入：

```ts, ignore
import { bar, foo } from "./lib.bundle.js";
```

<<<<<<< HEAD
## 为 Web 打包
=======
## Bundling for the Web
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

`deno bundle` 的输出适用于在 Deno 中使用，而不适用于在 Web
浏览器或其他运行时中使用。尽管如此，根据输入的不同，它可能也可以工作。

如果您想要为 Web 打包，我们建议使用其他解决方案，例如
[esbuild](https://esbuild.github.io/)。
