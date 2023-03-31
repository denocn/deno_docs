# 安装

Deno 可在 macOS、Linux 和 Windows
上运行，它是一个单独的可执行文件，没有外部依赖。

在 macOS 上，提供 M1（arm64）和 Intel（x64）的可执行文件。在 Linux 和 Windows
上，仅支持 x64。

## 下载和安装

[deno_install](https://github.com/denoland/deno_install)
提供方便的脚本来下载和安装二进制文件。

使用 Shell（macOS 和 Linux）：

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

使用 PowerShell（Windows）：

```shell
irm https://deno.land/install.ps1 | iex
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

使用 [Nix](https://nixos.org/download.html)（macOS 和 Linux）：

```shell
nix-shell -p deno
```

使用 [Cargo](https://crates.io/crates/deno) 构建和安装源码：

```shell
cargo install deno --locked
```

Deno 可执行文件也可以手动安装，通过在
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases)
下载 zip 文件。这些包仅包含一个可执行文件。您需要在 macOS 和 Linux
上设置可执行位。

## Docker

有关官方 Docker 映像的更多信息和说明：
[https://github.com/denoland/deno_docker](https://github.com/denoland/deno_docker)

## 测试安装

要测试安装，请运行 `deno --version`。如果将 Deno 版本打印到控制台，则安装成功。

使用 `deno help` 查看文档 Deno 的标志和用法。在这里获取 CLI 的详细指南
[here](./command_line_interface.md)。

## 更新

要更新之前安装的 Deno 版本，可以运行：

```shell
deno upgrade
```

这将从
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases）获取最新版本，解压缩它，并将您当前的可执行文件替换为它。

您还可以使用此实用程序安装特定版本的 Deno：

```shell
deno upgrade --version 1.0.1
```

## 从源代码编译

有关如何从源代码构建的信息可以在[`Contributing`](../references/contributing/building_from_source.md)
章节中找到。
