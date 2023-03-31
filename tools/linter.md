# 代码检查器

Deno 内建了针对 JavaScript 和 TypeScript 的代码检查器。

```shell
# 检查当前目录和子目录下的所有 JS/TS 文件
deno lint
# 检查指定文件
deno lint myfile1.ts myfile2.ts
# 检查指定目录和子目录下的所有 JS/TS 文件
deno lint src/
# 以 JSON 格式输出结果
deno lint --json
# 从标准输入中读取代码
cat file.ts | deno lint -
```

要获取更多详细信息，请运行`deno lint --help`。

## 支持的规则

支持的规则列表可查看 [deno_lint 规则文档](https://lint.deno.land)。

## 忽略指令

### 文件

要忽略整个文件，应在文件顶部加入`// deno-lint-ignore-file` 指令：

```ts
// deno-lint-ignore-file

function foo(): any {
  // ...
}
```

忽略指令必须位于第一条语句或声明之前：

```ts, ignore
// 版权所有© 2020 Deno 作者。保留所有权利。MIT 许可证。

/**
 * 某些 JS 文档
 */

// deno-lint-ignore-file

import { bar } from "./bar.js";

function foo(): any {
  // ...
}
```

您还可以在整个文件中忽略某些诊断：

```ts
// deno-lint-ignore-file no-explicit-any no-empty

function foo(): any {
  // ...
}
```

### 诊断

要忽略特定的诊断，应在有问题的代码行之前加上 `// deno-lint-ignore <codes...>`
指令。必须指定要忽略的规则名称：

```ts
// deno-lint-ignore no-explicit-any
function foo(): any {
  // ...
}

// deno-lint-ignore no-explicit-any explicit-function-return-type
function bar(a: any) {
  // ...
}
```

## 配置

从 Deno v1.14 开始，可以使用
[配置文件](../getting_started/configuration_file.md) 或以下 CLI
标记自定义检查器：

- `--rules-tags` - 将要运行的标记名称列表。空列表将禁用所有标记，并仅运行来自
  `include` 的规则。默认为 "recommended"。

- `--rules-exclude` - 要从配置的标记集中排除的规则名称列表。即使同一规则在
  `include` 中，它也会被排除在外；换句话说，`--rules-exclude` 的优先级高于
  `--rules-include`。

- `--rules-include` - 将要运行的规则名称列表。如果同一规则也在 `exclude`
  中，则它将被排除在外。
