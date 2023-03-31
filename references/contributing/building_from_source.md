# 从源代码构建 `deno`

以下是从源代码构建 Deno 的说明。如果您只想使用
Deno，则可以下载预构建的可执行文件（在
[`入门`](../../getting_started/installation.md#download-and-install)
章节中有更多信息）。

## 克隆存储库

在 Linux 或 Mac 上进行克隆：

```shell
git clone --recurse-submodules https://github.com/denoland/deno.git
```

Windows 用户需要额外的步骤：

1. [启用“开发人员模式”](https://www.google.com/search?q=windows+enable+developer+mode)（否则，符号链接将需要管理员权限）。
2. 确保您使用的是 2.19.2.windows.1 或更新版本的 git。
3. 在检出前设置 `core.symlinks=true`：
   ```shell
   git config --global core.symlinks true
   git clone --recurse-submodules https://github.com/denoland/deno.git
   ```

## 先决条件

> Deno 需要最新稳定版的 Rust。Deno 不支持 Rust Nightly 版本。

[更新或安装 Rust](https://www.rust-lang.org/tools/install)。检查 Rust
是否已正确安装/更新：

```
rustc -V
cargo -V
```

对于 Apple aarch64 用户，必须安装 `lld`。

```
brew install llvm
# 在 $PATH 中添加 /opt/homebrew/opt/llvm/bin/
```

## 构建 Deno

构建 Deno 的最简单方法是使用预编译版本的 V8：

```
cargo build -vv
```

但如果您想从源代码构建 Deno 和 V8：

```
V8_FROM_SOURCE=1 cargo build -vv
```

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
./target/debug/deno run cli/tests/testdata/run/002_hello.ts
```
