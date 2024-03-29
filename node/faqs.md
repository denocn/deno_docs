# 常见问题解答

### 在使用 npm 版本说明符时

如果在使用 npm
版本说明符时出现此错误，请将三个斜杠类型引用指令添加到您的主入口点，指定从
`@types/node` 包中包括类型：

```ts, ignore
/// <reference types="npm:@types/node" />
```

### 在使用 CDN 时

如果您在不使用 npm 版本说明符且从 npm CDN 导入时出现此错误，则也可以从 CDN 导入
`@types/node` 类型。

例如，从 UNPKG 导入看起来像这样：

```ts, ignore
import type {} from "https://unpkg.com/@types/node/index.d.ts";
```

或者从 esm.sh：

```ts, ignore
import type {} from "https://esm.sh/@types/node/index.d.ts";
```

或者从 Skypack：

```ts, ignore
import type {} from "https://cdn.skypack.dev/@types/node/index.d.ts";
```

您还可以尝试仅提供第三方包缺少的特定内容。例如，包 `@aws-sdk/client-dynamodb`
在其类型定义中对 `NodeJS.ProcessEnv`
类型有一个依赖项。在导入它作为依赖项的项目的其中一个模块中，您可以放置像这样的内容来解决问题：

```ts, ignore
declare global {
  namespace NodeJS {
    type ProcessEnv = Record<string, string>;
  }
}
```

## 出现类似于找不到 `document` 或 `HTMLElement` 的类型错误

您使用的库依赖于
DOM。这对于旨在在浏览器和服务器端运行的软件包是常见的。默认情况下，Deno
仅包括直接支持的库。假设软件包在运行时正确识别它正在运行的环境，使用 DOM
库检查代码是“安全”的。有关更多信息，请查看手册中的
[针对 Deno 和浏览器](../advanced/typescript/configuration.md#targeting-deno-and-the-browser)
部分。
