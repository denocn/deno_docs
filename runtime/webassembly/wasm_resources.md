# 有用的资源

本页面包含一些在使用和/或开发 WebAssembly 模块时有帮助的进一步信息。

## WebAssembly API

WebAssembly API 的所有部分的更多信息可以在
[MDN](https://developer.mozilla.org/en-US/docs/WebAssembly) 上找到。

## 使用非数字类型

本章中的代码示例仅使用了 WebAssembly
模块中的数字类型。要使用更复杂的类型（如字符串、类），您将需要使用生成
JavaScript 和编译到 WebAssembly 的语言之间的类型绑定的工具。

关于如何创建 JavaScript 和 Rust 之间的类型绑定的示例、将其编译为二进制文件并从
JavaScript 程序中调用它，可以在
[MDN](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm)
上找到。

如果您计划在 Rust+WebAssembly 中大量使用 Web API，您可能会发现
[web_sys](https://rustwasm.github.io/wasm-bindgen/web-sys/index.html) 和
[js_sys](https://rustwasm.github.io/wasm-bindgen/contributing/js-sys/index.html)
Rust crates 有用。`web_sys` 包含对 Deno 中可用的大多数 Web API 的绑定，而
`js_sys` 提供对 JavaScript 标准内置对象的绑定。

## 优化

对于生产构建，对 WebAssembly
二进制文件进行优化可能是一个好主意。如果您主要通过网络提供二进制文件，那么优化大小可能会有实际效果，而如果您主要在服务器上执行
WebAssembly 来执行计算密集型任务，那么优化速度可能会有益。您可以在
[这里](https://rustwasm.github.io/docs/book/reference/code-size.html)
找到有关优化（生产）构建的良好指南。此外，[rust-wasm 组](https://rustwasm.github.io/docs/book/reference/tools.html)有一个可以用来优化和操作
WebAssembly 二进制文件的工具列表。
