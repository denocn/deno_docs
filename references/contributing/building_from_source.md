<<<<<<< HEAD
# 从源代码构建 `deno`

以下是从源代码构建 Deno 的说明。如果您只想使用
Deno，则可以下载预构建的可执行文件（在
[`入门`](../../getting_started/installation.md#download-and-install)
章节中有更多信息）。

## 克隆存储库

在 Linux 或 Mac 上进行克隆：
=======
# Building `deno` from Source

Below are instructions on how to build Deno from source. If you just want to use
Deno you can download a prebuilt executable (more information in the
[`Getting Started`](../../getting_started/installation.md#download-and-install)
chapter).

## Cloning the Repository

Clone on Linux or Mac:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```shell
git clone --recurse-submodules https://github.com/denoland/deno.git
```

<<<<<<< HEAD
Windows 用户需要额外的步骤：

1. [启用“开发人员模式”](https://www.google.com/search?q=windows+enable+developer+mode)（否则，符号链接将需要管理员权限）。
2. 确保您使用的是 2.19.2.windows.1 或更新版本的 git。
3. 在检出前设置 `core.symlinks=true`：
=======
Extra steps for Windows users:

1. [Enable "Developer Mode"](https://www.google.com/search?q=windows+enable+developer+mode)
   (otherwise symlinks would require administrator privileges).
2. Make sure you are using git version 2.19.2.windows.1 or newer.
3. Set `core.symlinks=true` before the checkout:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
   ```shell
   git config --global core.symlinks true
   git clone --recurse-submodules https://github.com/denoland/deno.git
   ```

<<<<<<< HEAD
## 先决条件

> Deno 需要最新稳定版的 Rust。Deno 不支持 Rust Nightly 版本。

[更新或安装 Rust](https://www.rust-lang.org/tools/install)。检查 Rust
是否已正确安装/更新：
=======
## Prerequisites

> Deno requires the progressively latest stable release of Rust. Deno does not
> support the Rust Nightly Releases.

[Update or Install Rust](https://www.rust-lang.org/tools/install). Check that
Rust installed/updated correctly:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```
rustc -V
cargo -V
```

<<<<<<< HEAD
对于 Apple aarch64 用户，必须安装 `lld`。

```
brew install llvm
# 在 $PATH 中添加 /opt/homebrew/opt/llvm/bin/
```

## 构建 Deno

构建 Deno 的最简单方法是使用预编译版本的 V8：
=======
For Apple aarch64 users `lld` must be installed.

```
brew install llvm
# Add /opt/homebrew/opt/llvm/bin/ to $PATH
```

## Building Deno

The easiest way to build Deno is by using a precompiled version of V8:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```
cargo build -vv
```

<<<<<<< HEAD
但如果您想从源代码构建 Deno 和 V8：
=======
However if you want to build Deno and V8 from source code:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```
V8_FROM_SOURCE=1 cargo build -vv
```

<<<<<<< HEAD
从源代码构建 V8 时，有更多的依赖项：

需要 Python 3 运行 WPT 测试。确保您的 `PATH` 中存在没有后缀的
`python`/`python.exe`，并且它引用 Python 3。

对于 Linux 用户，还必须安装 glib-2.0 开发文件（在 Ubuntu 上运行
`apt install libglib2.0-dev`）。

Mac 用户必须安装命令行工具。([XCode](https://developer.apple.com/xcode/)
已经包括了 CLT。运行 `xcode-select --install` 可以在没有 XCode 的情况下安装它。)

对于 Windows 用户：

1. 获取带有 "C++ 桌面开发" 工具套件的
   [VS Community 2019](https://www.visualstudio.com/downloads/)，并确保选择以下列出的必需工具以及所有的
   C++ 工具。

   - 为 CMake 提供 Visual C++ 工具
   - Windows 10 SDK（10.0.17763.0）
   - 测试工具核心特性 - 构建工具
   - Visual C++ ATL for x86 and x64
   - Visual C++ MFC for x86 and x64
   - C++/CLI 支持
   - VC++ 2015.3 v14.00（v140）桌面用工具集

2. 启用 "Windows 的调试工具"。转到"控制面板" → "程序" → "程序和功能" → 选择
   "Windows 软件开发工具包- Windows 10" → "更改" → "更改" → 选中 "Windows
   的调试工具" → "更改" → "完成"。或使用：
   [Windows 的调试工具](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/)
   （请注意：它会下载文件，您应该手动安装
   `X64 Debuggers And Tools-x64_en-us.msi` 文件。）

有关 V8
构建的更多详细信息，请参见[rusty_v8 的 README](https://github.com/denoland/rusty_v8)。

## 构建

使用 Cargo 构建：

```shell
# 构建：
cargo build -vv

# 构建错误？确保您已经拥有最新主分支，然后尝试再次构建；或者如果它不起作用，请尝试：
cargo clean && cargo build -vv

# 运行：
=======
When building V8 from source, there are more dependencies:

[Python 3](https://www.python.org/downloads) for running WPT tests. Ensure that
a suffix-less `python`/`python.exe` exists in your `PATH` and it refers to
Python 3.

For Linux users glib-2.0 development files must also be installed. (On Ubuntu,
run `apt install libglib2.0-dev`.)

Mac users must have Command Line Tools installed.
([XCode](https://developer.apple.com/xcode/) already includes CLT. Run
`xcode-select --install` to install it without XCode.)

For Windows users:

1. Get [VS Community 2019](https://www.visualstudio.com/downloads/) with
   "Desktop development with C++" toolkit and make sure to select the following
   required tools listed below along with all C++ tools.

   - Visual C++ tools for CMake
   - Windows 10 SDK (10.0.17763.0)
   - Testing tools core features - Build Tools
   - Visual C++ ATL for x86 and x64
   - Visual C++ MFC for x86 and x64
   - C++/CLI support
   - VC++ 2015.3 v14.00 (v140) toolset for desktop

2. Enable "Debugging Tools for Windows". Go to "Control Panel" → "Programs" →
   "Programs and Features" → Select "Windows Software Development Kit - Windows
   10" → "Change" → "Change" → Check "Debugging Tools For Windows" → "Change" →
   "Finish". Or use:
   [Debugging Tools for Windows](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/)
   (Notice: it will download the files, you should install
   `X64 Debuggers And Tools-x64_en-us.msi` file manually.)

See [rusty_v8's README](https://github.com/denoland/rusty_v8) for more details
about the V8 build.

## Building

Build with Cargo:

```shell
# Build:
cargo build -vv

# Build errors?  Ensure you have latest main and try building again, or if that doesn't work try:
cargo clean && cargo build -vv

# Run:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
./target/debug/deno run cli/tests/testdata/run/002_hello.ts
```
