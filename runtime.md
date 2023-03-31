# 运行时

所有运行时函数的文档（Web API + `Deno` 全局函数）可以在 [`/api`](/api)
找到，或通过添加使用 `--unstable` 标志启用的不稳定 API 在
[`/api?unstable`](/api?unstable) 找到。

## Web 平台 APIs

对于已存在 Web 标准的 API，例如 HTTP 请求的 `fetch`，Deno
使用现有标准而不是发明新的专有 API。

有关更多详细信息，请参见[Web 平台 APIs](./runtime/web_platform_apis.md)这一章节。

## `Deno` 全局函数

所有非 Web 标准的 API 都包含在全局的 `Deno` 命名空间中。它具有读取文件、打开 TCP
socket、[提供 HTTP 服务](./runtime/http_server_apis.md) 和执行子进程等 API。

有关更多详细信息，请参见[内置 APIs](./runtime/builtin_apis.md)这一章节。

Deno 命名空间的 TypeScript 定义可在
[`lib.deno.ns.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/tsc/dts/lib.deno.ns.d.ts)
文件中找到。
