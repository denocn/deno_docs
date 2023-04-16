<<<<<<< HEAD
# 管理依赖关系
=======
# Managing Dependencies
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

## 概念

<<<<<<< HEAD
- Deno 使用 URL 来管理依赖项。
- 一种约定是将所有这些依赖的 URL 放入本地的 `deps.ts` 文件中。 然后从 `deps.ts`
  导出功能以供本地模块使用。
- 按照这个约定，仅开发时需要的依赖项可以保存在一个 `dev_deps.ts` 文件中。
- 参见 [模块](../basics/modules.md)
=======
- Deno uses URLs for dependency management.
- One convention places all these dependent URLs into a local `deps.ts` file.
  Functionality is then exported out of `deps.ts` for use by local modules.
- Continuing this convention, dev only dependencies can be kept in a
  `dev_deps.ts` file.
- See also [Modules](../basics/modules.md)
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

## 概述

在 Deno 中，由于外部模块直接导入本地模块，因此没有包管理器的概念。
这就引出了一个问题，即如何在没有包管理器的情况下管理远程依赖项。
在具有许多依赖项的大型项目中，如果所有模块都单独导入，那么更新模块将变得繁琐和耗时。

在 Deno 中解决这个问题的标准做法是创建一个 `deps.ts`
文件。所有必需的远程依赖项都在这个文件中引用，并重新导出所需的方法和类。
依赖的本地模块将引用 `deps.ts` 而不是远程依赖项。
例如，如果一个远程依赖项在多个文件中使用，则升级到该远程依赖项的新版本比较简单，因为只需要在
`deps.ts` 中升级即可。

将所有依赖项集中在 `deps.ts`
中，管理这些依赖项变得更加容易。开发依赖项也可以在一个单独的 `dev_deps.ts`
文件中管理，允许在开发和生产依赖项之间进行清晰的分离。

## 示例

```ts
/**
 * deps.ts
 *
 * 此模块重新导出依赖的远程 Ramda 模块中所需的方法。
 */
export {
  add,
  multiply,
} from "https://x.nest.land/ramda@0.27.0/source/index.js";
```

<<<<<<< HEAD
在此示例中，与[本地和远程导入示例](../basics/modules.md)中创建相同的功能。但是在这种情况下，不是直接引用
Ramda 模块，而是使用本地的 `deps.ts` 模块代理引用。
=======
In this example the same functionality is created as is the case in the
[local and remote import examples](../basics/modules.md). But in this case
instead of the Ramda module being referenced directly it is referenced by proxy
using a local `deps.ts` module.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

**命令：** `deno run example.ts`

```ts, ignore
/**
 * example.ts
 */

import { add, multiply } from "./deps.ts";

function totalCost(outbound: number, inbound: number, tax: number): number {
  return multiply(add(outbound, inbound), tax);
}

console.log(totalCost(19, 31, 1.2));
console.log(totalCost(45, 27, 1.15));

/**
 * Output
 *
 * 60
 * 82.8
 */
```
