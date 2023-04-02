<<<<<<< HEAD
# 标准库

Deno 提供了一组标准模块，由核心团队审核并保证其与 Deno 兼容。

标准库可在以下链接获得：https://deno.land/std@$STD_VERSION

## 版本和稳定性

标准库尚未稳定，因此版本控制与 Deno 不同。要获取最新版本，请参见
https://deno.land/std@$STD_VERSION 或
https://deno.land/std@$STD_VERSION/version.ts。标准库的发布与 Deno
发布同时进行。

我们强烈建议始终使用带固定版本的标准库导入项，以避免意外更改。例如，不要链接到默认分支的代码，该分支可能随时更改，可能导致编译错误或意外行为：

```typescript
// 导入最新发布版：应避免使用此方法
import { copy } from "https://deno.land/std/fs/copy.ts";
```

而应使用一个不可改变的 std 库版本：

```typescript
// 导入 std 的 v$STD_VERSION 版本，从不更改
import { copy } from "https://deno.land/std@$STD_VERSION/fs/copy.ts";
```

## 故障排除

标准库中的一些模块使用不稳定的 Deno API。

尝试在没有 `--unstable` CLI 标志的情况下运行此类模块会导致大量 TypeScript
错误，提示 `Deno` 命名空间中的某些 API 不存在：
=======
# Standard Library

Deno provides a set of standard modules that are audited by the core team and
are guaranteed to work with Deno.

Standard library is available at: https://deno.land/std@$STD_VERSION

## Versioning and stability

Standard library is not yet stable and therefore it is versioned differently
than Deno. For latest release consult https://deno.land/std@$STD_VERSION or
https://deno.land/std@$STD_VERSION/version.ts. The standard library is released
each time Deno is released.

We strongly suggest to always use imports with pinned version of standard
library to avoid unintended changes. For example, rather than linking to the
default branch of code, which may change at any time, potentially causing
compilation errors or unexpected behavior:

```typescript
// import the latest release, this should be avoided
import { copy } from "https://deno.land/std/fs/copy.ts";
```

instead, use a version of the std library which is immutable and will not
change:

```typescript
// imports from v$STD_VERSION of std, never changes
import { copy } from "https://deno.land/std@$STD_VERSION/fs/copy.ts";
```

## Troubleshooting

Some of the modules provided in standard library use unstable Deno APIs.

Trying to run such modules without `--unstable` CLI flag ends up with a lot of
TypeScript errors suggesting that some APIs in the `Deno` namespace do not
exist:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```typescript
// main.ts
import { copy } from "https://deno.land/std@$STD_VERSION/fs/copy.ts";

copy("log.txt", "log-old.txt");
```

```shell
$ deno run --allow-read --allow-write main.ts
Compile file:///dev/deno/main.ts
Download https://deno.land/std@$STD_VERSION/fs/copy.ts
Download https://deno.land/std@$STD_VERSION/fs/ensure_dir.ts
Download https://deno.land/std@$STD_VERSION/fs/_util.ts
error: TS2339 [ERROR]: Property 'utime' does not exist on type 'typeof Deno'. 'Deno.utime' is an unstable API. Did you forget to run with the '--unstable' flag?
    await Deno.utime(dest, statInfo.atime, statInfo.mtime);
               ~~~~~
    at https://deno.land/std@$STD_VERSION/fs/copy.ts:92:16

TS2339 [ERROR]: Property 'utimeSync' does not exist on type 'typeof Deno'. 'Deno.utimeSync' is an unstable API. Did you forget to run with the '--unstable' flag?
    Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
         ~~~~~~~~~
    at https://deno.land/std@$STD_VERSION/fs/copy.ts:103:10
```

<<<<<<< HEAD
解决此问题需要添加 `--unstable` 标志：
=======
Solution to that problem requires adding `--unstable` flag:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```shell
deno run --allow-read --allow-write --unstable main.ts
```

<<<<<<< HEAD
要确保产生错误的 API
是不稳定的，请检查[`lib.deno.unstable.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/tsc/dts/lib.deno.unstable.d.ts)
声明。

这个问题应该在不久的将来得到解决。如果您依赖的特定模块可以在不添加标志的情况下成功编译，请随意省略该标志。
=======
To make sure that API producing error is unstable check
[`lib.deno.unstable.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/tsc/dts/lib.deno.unstable.d.ts)
declaration.

This problem should be fixed in the near future. Feel free to omit the flag if
the particular modules you depend on compile successfully without it.
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
