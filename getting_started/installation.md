## 安装 {#installation}

Deno 可运行于 macOS，Linux 以及 Windows。Deno 是一个单独的二进制可执行文件。且无需外部依赖。

### 下载安装 {#download-and-install}

[deno_install](https://github.com/denoland/deno_install) 为下载和安装二进制提供了快捷简便的脚本。

使用 Shell（macOS 和 Linux）：

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

使用 PowerShell（Windows）：

```shell
iwr https://deno.land/x/install/install.ps1 -useb | iex
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

使用 [Cargo](https://crates.io/crates/deno) 从源代码构建并安装：

```shell
cargo install deno --locked
```

Deno 二进制文件也可以手动安装，你可以从 [github.com/denoland/deno/releases](https://github.com/denoland/deno/releases) 下载一个 zip 文件。这些软件包仅包含一个可执行文件。在 macOS 和 Linux 中使用前，需将其设为可执行。

<<<<<<< HEAD
官方 Docker 镜像目前还不可用 
([issue#3356](https://github.com/denoland/deno/issues/3356))，但是目前有一个[社区镜像](https://github.com/hayd/deno-docker) are available.
=======
### Docker

For more information and instructions on the official Docker images:
[https://github.com/denoland/deno_docker](https://github.com/denoland/deno_docker)
>>>>>>> 833bc2b8139febaf8b64a61e118d9e968491e8ac

### 测试安装是否成功 {#testing-your-installation}

如下测试安装是否成功，请运行 `deno --version`。如果控制台有输出 Deno 的版本信息，则证明安装成功。

使用 `deno help` 可以为你展示关于参数和用法的帮助文档。如需了解详细指南，请参阅 CLI [文档](./command_line_interface.md)。

### 更新 {#updating}

如需更新旧版本的 Deno，你可以运行：

```shell
deno upgrade
```

此操作会从 [github.com/denoland/deno/releases](https://github.com/denoland/deno/releases) 下载最新并解压，并使用解压后的文件替换你当前的可执行文件。

你也可以使用此工具来安装特定版本的 Deno：

```shell
deno upgrade --version 1.0.1
```

### 从源文件构建 {#building-from-source}

如何使用源码构建，你可以查看 `Contributing` 章节。
