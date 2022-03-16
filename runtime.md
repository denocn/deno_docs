# 运行时 {#runtime}

Documentation for all runtime functions (Web APIs + `Deno` global) can be found
on [`doc.deno.land/deno/stable`](https://doc.deno.land/deno/stable@$CLI_VERSION)
with _unstable_ APIs which are enabled via the `--unstable` flag at
[`doc.deno.land/deno/unstable`](https://doc.deno.land/deno/unstable@$CLI_VERSION).

## Web Platform APIs {#web-platform-apis}

对于已经存在的 Web 标准 API（例如，HTTP 请求的 `fetch`），Deno 是去使用这些标准，而不是发明新的专有 API。

更多详细信息，请参见 [Web Platform APIs](./runtime/web_platform_apis.md)。

## `Deno` global {#deno-global}

All APIs that are not web standard are contained in the global `Deno` namespace.
It has the APIs for reading from files, opening TCP sockets,
[serving HTTP](./runtime/http_server_apis.md), and executing subprocesses, etc.

The TypeScript definitions for the Deno namespaces can be found in the
[`lib.deno.ns.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.ns.d.ts)
file.
