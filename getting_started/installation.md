## 安装 {#installation}

Deno 可运行于 macOS，Linux 以及 Windows。Deno 是一个单独的二进制可执行文件。且无需外部依赖。

### 下载安装 {#download-and-install}

在 macOS 平台可以安装 M1 (arm64) 和 Intel (x64) 架构的可执行文件。在 Linux 和 Windows 只能安装 x64 架构的。

[deno_install](https://github.com/denocn/deno_install) 为下载和安装二进制提供了快捷简便的脚本。

使用 Shell（macOS 和 Linux）：

```shell
curl -fsSL https://x.deno.js.cn/install.sh | sh
```

使用 PowerShell（Windows）：

```shell
iwr https://x.deno.js.cn/install.ps1 -useb | iex
```

使用 [dvm](https://github.com/justjavac/dvm) 安装多个版本（**推荐**）：

```shell
dvm install
# 或者
dvm i
```

使用 [Scoop](https://scoop.sh/)（Windows）：

```shell
scoop install deno
```

使用 [Chocolatey](https://chocolatey.org/packages/deno)（Windows）：

```shell
choco install deno
```

使用 [Homebrew](https://formulae.brew.sh/formula/deno)（macOS）：

```shell
brew install deno
```

使用 [Nix](https://nixos.org/download.html) (macOS 和 Linux):

```shell
nix-shell -p deno
```

使用 [Cargo](https://crates.io/crates/deno) 从源码构建并安装：

```shell
cargo install deno --locked
```

Deno 二进制文件也可以手动安装，你可以从
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases)
下载一个 zip 文件。这些软件包仅包含一个可执行文件。在 macOS 和 Linux 中使用前，需将其设为可执行。

### Docker {#docker}

更多的关于官方 Docker 镜像的信息可以查看官方仓库：
[https://github.com/denoland/deno_docker](https://github.com/denoland/deno_docker)

### 测试安装是否成功 {#testing-your-installation}

如下测试安装是否成功，请运行 `deno --version`。如果控制台有输出 Deno 的版本信息，则证明安装成功。

使用 `deno help` 可以为你展示关于参数和用法的帮助文档。如需了解详细指南，请参阅 CLI
[文档](./command_line_interface.md)。

### 更新 {#updating}

如需更新旧版本的 Deno，你可以运行：

```shell
deno upgrade
```

此操作会从
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases)
下载最新并解压，并使用解压后的文件替换你当前的可执行文件。

你也可以使用此工具来安装特定版本的 Deno：

```shell
deno upgrade --version 1.0.1
```

### 从源文件构建 {#building-from-source}

如何使用源码构建，你可以查看 [`Contributing`](../contributing/building_from_source.md) 章节。
