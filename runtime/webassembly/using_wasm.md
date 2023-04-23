<<<<<<< HEAD
# 在 Deno 中使用 WebAssembly

在 Deno 中运行 WebAssembly 所需的只是一个二进制文件。WebAssembly
是一种二进制数据格式。这意味着 `.wasm`
文件并非直接可读，也不是为了手动编写而设计的。相反，类似于 Rust、C++ 或 Go
这样的语言编译器会 _生成_ `.wasm` 文件。

以下二进制文件导出了一个 `main` 函数，在调用时返回 `42`：
=======
# Using WebAssembly in Deno

To run WebAssembly in Deno, all you need is a binary to run. WebAssembly is a
binary data format. This means that `.wasm` files are not directly human
readable, and not intended to be written by hand. Instead a compiler for a
language like Rust, C++, or Go _emits_ `.wasm` files.

The following binary exports a `main` function that just returns `42` upon
invocation:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

<!-- deno-fmt-ignore -->
```ts
const wasmCode = new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 133, 128, 128, 128, 0, 1, 96, 0, 1, 127,
  3, 130, 128, 128, 128, 0, 1, 0, 4, 132, 128, 128, 128, 0, 1, 112, 0, 0,
  5, 131, 128, 128, 128, 0, 1, 0, 1, 6, 129, 128, 128, 128, 0, 0, 7, 145,
  128, 128, 128, 0, 2, 6, 109, 101, 109, 111, 114, 121, 2, 0, 4, 109, 97,
  105, 110, 0, 0, 10, 138, 128, 128, 128, 0, 1, 132, 128, 128, 128, 0, 0,
  65, 42, 11
]);

const wasmModule = new WebAssembly.Module(wasmCode);

const wasmInstance = new WebAssembly.Instance(wasmModule);

const main = wasmInstance.exports.main as CallableFunction;
console.log(main().toString());
```

<<<<<<< HEAD
如上述代码所示，在 JavaScript 程序中加载 WebAssembly 需要以下步骤：

1. 获取二进制文件（通常以 `.wasm` 文件的形式，但现在我们使用一个简单的字节数组）
2. 将二进制编译为 `WebAssembly.Module` 对象
3. 实例化 WebAssembly 模块

对于更复杂的情况，您可能希望使用编译成 WebAssembly
的编程语言，而不是手动编写指令。有许多可以做到这一点的语言，例如
[Rust](https://www.rust-lang.org/)、[Go](https://golang.org/) 或
[AssemblyScript](https://www.assemblyscript.org/)。例如，编译为上述字节的 Rust
程序如下所示：

```rust
pub fn main() -> u32 {  // u32 表示使用 32 位内存的无符号整数。
=======
As the code above shows, the following steps need to be performed in order to
load WebAssembly in a JavaScript program:

1. Fetching the binary (usually in the form of a `.wasm` file, though we are
   using a simple byte array for now)
2. Compiling the binary into a `WebAssembly.Module` object
3. Instantiating the WebAssembly module

For more complex scenarios you will probably want to write in a programming
language that compiles down to WebAssembly instead of hand writing instructions.
A number of languages exist that can do this, such as
[Rust](https://www.rust-lang.org/), [Go](https://golang.org/) or
[AssemblyScript](https://www.assemblyscript.org/). As an example, a Rust program
that compiles to the aforementioned bytes would look something like this:

```rust
pub fn main() -> u32 {  // u32 stands for an unsigned integer using 32 bits of memory.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
  42
}
```

<<<<<<< HEAD
除了上述示例中显示的方法外，还可以使用 WebAssembly API
的流式方法，下一页将演示此方法。
=======
Aside from the methods shown in the preceding example, it is also possible to
use the streaming methods of the WebAssembly API, as will be shown on the next
page.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
