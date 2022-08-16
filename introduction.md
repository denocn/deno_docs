# 介绍 {#introduction}

Deno ([/ˈdiːnoʊ/](http://ipa-reader.xyz/?text=%CB%88di%CB%90no%CA%8A), 发音
`dee-no`) 是一个 JavaScript/TypeScript 的运行时，默认使用安全环境执行代码，有着卓越的开发体验。

Deno 建立在 V8、Rust 和 Tokio 的基础上。

## 功能亮点 {#feature-highlights}

- 尽可能的兼容 [Web 规范](./runtime/web_platform_apis.md)，例如使用 ES modules、支持 `fetch()`
  等。
- 默认安全。代码不能访问文件、网络、环境变量等（除非显式开启）。
- 支持开箱即用的 [TypeScript](./typescript.md) 的环境。
- 只发布一个独立的可执行文件 (`deno`)。
- 有着内置的[工具箱](./tools.md)，比如代码格式化工具 ([`deno fmt`](./tools/formatter.md))，a linter
  ([`deno lint`](./tools/linter.md))，([`deno test`](./testing.md)) 和
  [编辑器 LSP](./getting_started/setup_your_environment.md#using-an-editoride)。
- 有一组经过审计的 [标准模块](https://deno.land/std/)，保证能在 Deno 上工作。
- 脚本代码能被[打包](./tools/bundler.md)为单独的 JavaScript
  文件，也可以编译为[可执行文件](./tools/compiler.md)。

## 哲学 {#philosophy}

Deno 旨在为现代程序员提供高效、安全的脚本环境。

Deno 将始终作为单个可执行文件分发。给定一个 Deno 程序的
URL，您应该能够用[压缩后 31MB 左右的 Deno 可执行文件](https://github.com/denoland/deno/releases)运行它。Deno
明确地承担了运行时和包管理器的角色。它使用标准的浏览器兼容协议(URL)来加载模块。

对于过去用 Bash 或 Python 编写的工具脚本来说，Deno 是一个优秀的替代品。

## 目标 {#goals}

- 只分发一个独立的可执行文件 (`deno`)。
- 默认安全。
  - 除非显式开启，否则脚本代码不能访问文件、网络、环境变量。
- 浏览器兼容。
  - 完全用 JavaScript 编写且不使用全局 `Deno` 命名空间(或功能测试)的程序是 Deno
    程序的子集，能够直接在现代浏览器中运行而无需更改。
- 提供内置工具来提升开发体验。
  - 比如单元测试、代码格式化、代码检查。
- 不把 V8 的概念泄露到用户空间。
- 能够高效地提供 HTTP 服务。

## 与 Node.js 的比较 {#comparison-to-nodejs}

- Deno 不使用 `npm`。
  - Deno 使用 URL 或文件路径引用模块。
- Deno 在模块解析算法中不使用 `package.json`。
- Deno 中的所有异步操作返回 promise，因此 Deno 提供与 Node 不同的 API。
- Deno 需要显式指定文件、网络和环境变量的访问权限。
- 当遇到未捕获的错误发生时，Deno 总是会异常退出。
- 使用 ES 模块，不支持 `require()`。第三方模块通过 URL 导入：

  ```javascript
  import * as log from "https://deno.land/std@$STD_VERSION/log/mod.ts";
  ```

## 其他关键行为 {#other-key-behaviors}

- 远程代码在第一次运行时获取并缓存，直到代码通过 `--reload` 选项运行。（所以 Deno 在飞行模式也能正常工作）
- 从远程 URL 加载的模块或文件应当是不可变且可缓存的。
