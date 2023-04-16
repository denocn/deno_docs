# 简介

Deno（[/ˈdiːnoʊ/](http://ipa-reader.xyz/?text=%CB%88di%CB%90no%CA%8A)，发音为“dee-no”）是一个带有安全默认和出色开发体验的
JavaScript、TypeScript 和 WebAssembly 运行时。

它基于 V8、Rust 和 Tokio。

## 特点亮点

<<<<<<< HEAD
- 提供[Web 平台功能](./runtime/web_platform_apis.md)并采用 Web
  平台标准。例如使用 ES 模块、Web worker 和支持 `fetch()`。
- 默认情况下安全。除非明确启用，否则无法访问文件、网络或环境。
- 支持[TypeScript](./advanced/typescript.md)。
- 发布单个可执行文件 (`deno`)。
- 提供内置的[开发工具](./tools.md)，例如代码格式化器
  ([`deno fmt`](./tools/formatter.md))，代码检查工具
  ([`deno lint`](./tools/linter.md))，测试运行器
  ([`deno test`](./basics/testing.md))
  和[适用于编辑器的语言服务器](./getting_started/setup_your_environment.md#using-an-editoride)。
- 拥有[一套经过审核的标准模块](https://deno.land/std@$STD_VERSION)，可保证与
  Deno 兼容。
- 支持使用[现有的 npm 模块](./node.md)。
=======
- Provides [web platform functionality](./runtime/web_platform_apis.md) and
  adopts web platform standards. For example using ES modules, web workers, and
  support `fetch()`.
- Secure by default. No file, network, or environment access unless explicitly
  enabled.
- Supports [TypeScript](./advanced/typescript.md) out of the box.
- Ships a single executable (`deno`).
- Provides built-in [development tooling](./tools.md) like a code formatter
  ([`deno fmt`](./tools/formatter.md)), a linter
  ([`deno lint`](./tools/linter.md)), a test runner
  ([`deno test`](./basics/testing.md)), and a
  [language server for your editor](./getting_started/setup_your_environment.md#using-an-editoride).
- Has
  [a set of reviewed (audited) standard modules](https://deno.land/std@$STD_VERSION)
  that are guaranteed to work with Deno.
- Supports the use of [existing npm modules](./node.md)
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

## 哲学

Deno 致力于成为现代程序员的高效和安全的脚本环境。

Deno 将始终作为单个可执行文件分发。给定一个指向 Deno 程序的
URL，只需使用[约 31MB 压缩的可执行文件](https://github.com/denoland/deno/releases)，即可运行它。Deno
明确担任运行时和包管理器角色。它使用标准的浏览器兼容协议加载模块：URL。

除其他外，Deno 是一个很好的 Bash 或 Python 脚本替代品。

## 目标

- 作为单个可执行文件（`deno`）分发。
- 提供安全默认值。
  - 非特定情况下，脚本无法访问文件、环境或网络。
- 与浏览器兼容。
  - 完全用 JavaScript 编写且未使用全局 `Deno` 名称空间（或对其进行特性测试）的
    Deno 程序的子集，也应该能够在现代 Web 浏览器中运行而无需更改。
- 提供内置工具以改善开发体验。
  - 例如单元测试、代码格式化和代码检查。
- 将 V8 概念保留在用户界面之外。
- 高效地提供 HTTP 服务。

<<<<<<< HEAD
## 其他关键行为

- 在第一次执行时获取并缓存远程代码，并且直到使用 `--reload`
  标志运行代码才更新它。（因此，即使在飞机上也可以使用。）
- 从远程 URL 加载的模块/文件预期是不可变且可缓存的。
=======
## Other key behaviors

- Fetch and cache remote code upon first execution, and never update it until
  the code is run with the `--reload` flag. (So, this will still work on an
  airplane.)
- Modules/files loaded from remote URLs are intended to be immutable and
  cacheable.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
