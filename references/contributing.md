<<<<<<< HEAD
# 贡献指南

我们欢迎和感谢所有对Deno作出的贡献。

这个页面旨在帮助你开始贡献。

## 项目

Deno生态系统中有很多处于[`denoland`](https://github.com/denoland)组织下的仓库。

这些仓库具有不同的范围、使用不同的编程语言，对于贡献的难度程度也有所不同。

为了帮助你决定哪个仓库可能是最适合开始贡献（或许是你感兴趣的），以下是一个简要的比较（**粗体编程语言占据了大多数的代码库**）：

### [`deno`](https://github.com/denoland/deno)

这是提供 `deno` CLI 的主要仓库。

如果你想要修补`deno`的bug或是增加新的特性，则你需要贡献到这个仓库。

编程语言：**Rust**, **JavaScript**

### [`deno_std`](https://github.com/denoland/deno_std)

提供给Deno使用的标准库。

编程语言：**TypeScript**, WebAssembly.

### [`dotland`](https://github.com/denoland/dotland)

官方Deno网页的前端: https://deno.land/

编程语言：**TypeScript**, TSX, CSS

### [`deno_lint`](https://github.com/denoland/deno_lint)

支持`deno lint`命令的代码检查工具。

编程语言：**Rust**

### [`deno_doc`](https://github.com/denoland/deno_doc)

支持`deno doc`命令的文档生成器以及https://doc.deno.land

编程语言：**Rust**

### [`docland`](https://github.com/denoland/docland)

文档生成器的前端: https://doc.deno.land

编程语言：**TypeScript**, TSX, CSS

### [`rusty_v8`](https://github.com/denoland/rusty_v8)

V8 JavaScript引擎的Rust绑定。非常技术性和底层。

编程语言：**Rust**

### [`serde_v8`](https://github.com/denoland/deno/tree/main/serde_v8)

在V8和Rust对象之间提供双射层的库。 基于
[`serde`](https://crates.io/crates/serde) 库。非常技术性和底层。

编程语言：**Rust**

### [`deno_docker`](https://github.com/denoland/deno_docker)

Deno官方的Docker images。

## 一般注意事项

- 阅读[样式指南](./contributing/style_guide.md)。

- 请不要使[基准测试](https://deno.land/benchmarks)变差。

- 在[社区聊天室](https://discord.gg/deno)中寻求帮助。

- 如果你要处理一个问题，请先在问题评论中提及，然后再开始处理问题。

- 如果你将要处理一个新特性，请先创建一个问题并与其他贡献者讨论，然后再开始处理；我们感谢所有的贡献，但并不是所有提出的特性都会被接受。
  我们不希望你花费数小时来处理可能不被接受的代码。

- 在论坛上请保持专业。
  我们遵守[Rust的行为准则](https://www.rust-lang.org/policies/code-of-conduct)(CoC)。遇到问题？给[ry@tinyclouds.org](mailto:ry@tinyclouds.org)发邮件。

## 提交拉取请求

在向任何仓库提交PR之前，请确保完成以下操作：

1. 给PR一个描述性标题。

好的PR标题示例:
=======
# Contributing

We welcome and appreciate all contributions to Deno.

This page serves as a helper to get you started on contributing.

## Projects

There are numerous repositories in the [`denoland`](https://github.com/denoland)
organization that are part of the Deno ecosystem.

Repositories have different scopes, use different programming languages and have
varying difficulty level when it comes to contributions.

To help you decide which repository might be the best to start contributing
(and/or falls into your interest), here's a short comparison (**languages in
bold comprise most of the codebase**):

### [`deno`](https://github.com/denoland/deno)

This is the main repository that provides the `deno` CLI.

If you want to fix a bug or add a new feature to `deno` this is the repository
you want to contribute to.

Languages: **Rust**, **JavaScript**

### [`deno_std`](https://github.com/denoland/deno_std)

The standard library for Deno.

Languages: **TypeScript**, WebAssembly.

### [`dotland`](https://github.com/denoland/dotland)

Frontend for official Deno webpage: https://deno.land/

Languages: **TypeScript**, TSX, CSS

### [`deno_lint`](https://github.com/denoland/deno_lint)

Linter that powers `deno lint` subcommand.

Languages: **Rust**

### [`deno_doc`](https://github.com/denoland/deno_doc)

Documentation generator that powers `deno doc` subcommand and
https://doc.deno.land

Languages: **Rust**

### [`docland`](https://github.com/denoland/docland)

Frontend for documentation generator: https://doc.deno.land

Languages: **TypeScript**, TSX, CSS

### [`rusty_v8`](https://github.com/denoland/rusty_v8)

Rust bindings for the V8 JavaScript engine. Very technical and low-level.

Languages: **Rust**

### [`serde_v8`](https://github.com/denoland/deno/tree/main/serde_v8)

Library that provides bijection layer between V8 and Rust objects. Based on
[`serde`](https://crates.io/crates/serde) library. Very technical and low-level.

Languages: **Rust**

### [`deno_docker`](https://github.com/denoland/deno_docker)

Official Docker images for Deno.

## General remarks

- Read the [style guide](./contributing/style_guide.md).

- Please don't make [the benchmarks](https://deno.land/benchmarks) worse.

- Ask for help in the [community chat room](https://discord.gg/deno).

- If you are going to work on an issue, mention so in the issue comments
  _before_ you start working on the issue.

- If you are going to work on a new feature, create an issue and discuss with
  other contributors _before_ you start working on the feature; we appreciate
  all contributions, but not all proposed features are getting accepted. We
  don't want you to spend hours working on a code that might not be accepted.

- Please be professional in the forums. We follow
  [Rust's code of conduct](https://www.rust-lang.org/policies/code-of-conduct)
  (CoC). Have a problem? Email [ry@tinyclouds.org](mailto:ry@tinyclouds.org).

## Submitting a pull request

Before submitting a PR to any of the repos, please make sure the following is
done:

1. Give the PR a descriptive title.

Examples of good PR title:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

- fix(std/http): Fix race condition in server
- docs(console): Update docstrings
- feat(doc): Handle nested re-exports

<<<<<<< HEAD
差的PR标题示例：
=======
Examples of bad PR title:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

- fix #7123
- update docs
- fix bugs

<<<<<<< HEAD
2. 确保存在相关的问题，并在PR文本中进行引用。
3. 确保有涵盖更改的测试。

### 向 [`deno`](https://github.com/denoland/deno) 提交PR

除了以上所述，还请确保：

1. `cargo test`通过 - 这将运行完整的测试套件，包括单元测试、集成测试和Web
   Platform Tests.

2. 运行`./tools/format.js` - 这将格式化所有代码，以符合存储库中的一致样式。

3. 运行`./tools/lint.js` -
   这将使用`clippy`（针对Rust）和`dlint`（针对JavaScript）对Rust和JavaScript代码进行常见错误和错误的检查。

### 向 [`deno_std`](https://github.com/denoland/deno_std) 提交PR

除了以上所述，还请确保：

1. 你编写的所有代码都使用 `TypeScript` （即不要使用`JavaScript`）。

2. `deno test --unstable --allow-all` 通过 - 这将运行标准库的全部测试套件。

3. 在仓库的根目录下运行`deno fmt` -
   这会将所有代码格式化以符合存储库中的一致样式。

4. 运行`deno lint` - 这将检查TypeScript代码的常见错误和错误。

### 向 [`denoland/manual`](https://github.com/denoland/manual)提交PR

如果你想要向这篇手册提交PR，请确保所有标准库的导入都用“$
STD_VERSION”替换了数字版本。

这是最新版本 [here](https://deno.land/std@0.178.0/version.ts).

## API文档

重点是要记录所有公共API，我们想要让它们与代码内联一起进行记录。这有助于确保代码和文档是紧密耦合的。

### JavaScript和TypeScript

所有公开暴露的API和类型，无论是通过 `deno` 模块还是全局/`window`
命名空间，都应该有 JSDoc 文档。 此文档会被解析并提供给 TypeScript
编译器，因此易于向下提供。
JSDoc块位于它们应用的语句之前，并以一个前导`/**`开始，然后以 `*/`结束。例如：
=======
2. Ensure there is a related issue and it is referenced in the PR text.
3. Ensure there are tests that cover the changes.

## Submitting a PR to [`deno`](https://github.com/denoland/deno)

Additionally to the above make sure that:

1. `cargo test` passes - this will run full test suite for `deno` including unit
   tests, integration tests and Web Platform Tests

1. Run `./tools/format.js` - this will format all of the code to adhere to the
   consistent style in the repository

1. Run `./tools/lint.js` - this will check Rust and JavaScript code for common
   mistakes and errors using `clippy` (for Rust) and `dlint` (for JavaScript)

## Submitting a PR to [`deno_std`](https://github.com/denoland/deno_std)

Additionally to the above make sure that:

1. All of the code you wrote is in `TypeScript` (ie. don't use `JavaScript`)

1. `deno test --unstable --allow-all` passes - this will run full test suite for
   the standard library

1. Run `deno fmt` in the root of repository - this will format all of the code
   to adhere to the consistent style in the repository.

1. Run `deno lint` - this will check TypeScript code for common mistakes and
   errors.

## Submitting a PR to [`denoland/manual`](https://github.com/denoland/manual)

If you are submitting a PR to this manual, make sure that all imports of the
standard library have the numeric version replaced with "$STD_VERSION".

For the latest version go [here](https://deno.land/std@0.178.0/version.ts).

## Documenting APIs

It is important to document all public APIs and we want to do that inline with
the code. This helps ensure that code and documentation are tightly coupled
together.

### JavaScript and TypeScript

All publicly exposed APIs and types, both via the `deno` module as well as the
global/`window` namespace should have JSDoc documentation. This documentation is
parsed and available to the TypeScript compiler, and therefore easy to provide
further downstream. JSDoc blocks come just prior to the statement they apply to
and are denoted by a leading `/**` before terminating with a `*/`. For example:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
/** A simple JSDoc comment */
export const FOO = "foo";
```

<<<<<<< HEAD
更多信息，请访问：https://jsdoc.app/

### Rust

使用
[this guide](https://doc.rust-lang.org/rustdoc/how-to-write-documentation.html)
来编写Rust代码的文档注释。
=======
Find more at: https://jsdoc.app/

### Rust

Use
[this guide](https://doc.rust-lang.org/rustdoc/how-to-write-documentation.html)
for writing documentation comments in Rust code.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
