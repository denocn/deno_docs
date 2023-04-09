<<<<<<< HEAD
# 脚本安装程序
=======
# Script Installer
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

Deno 提供了 `deno install` 命令，便于安装和分发可执行代码。

`deno install [OPTIONS...] [URL] [SCRIPT_ARGS...]` 命令将在名称为 `EXE_NAME`
的情况下安装 `URL` 中提供的脚本。

此命令创建一个轻量级的可执行 shell 脚本，调用指定的 CLI 标志和主模块来调用
`deno`。它被放置在安装根目录下的 `bin` 目录中。

示例:

```shell
$ deno install --allow-net --allow-read https://deno.land/std@$STD_VERSION/http/file_server.ts
[1/1] Compiling https://deno.land/std@$STD_VERSION/http/file_server.ts

✅ 文件服务安装成功。
/Users/deno/.deno/bin/file_server
```

要更改可执行文件名称，请使用 `-n`/`--name`：

```shell
deno install --allow-net --allow-read -n serve https://deno.land/std@$STD_VERSION/http/file_server.ts
```

默认情况下，可执行文件的名称是通过推理得到的：

- 尝试获取 URL 路径的文件名称。以上例为例，文件名称将变为“file_server”。
- 如果文件名称是一些通用的名称，如“main”、“mod”、“index”或“cli”，并且路径没有父级路径，则使用父级路径的文件名称。否则保持通用名称。
- 如果结果名有一个 '@...' 后缀，则删除该后缀。

要更改安装根目录，请使用 `--root`：

```shell
deno install --allow-net --allow-read --root /usr/local https://deno.land/std@$STD_VERSION/http/file_server.ts
```

安装根目录的确定方法：

- `--root` 选项
- `DENO_INSTALL_ROOT` 环境变量
- `$HOME/.deno`

如果需要，必须手动将它们添加到路径中。

```shell
echo 'export PATH="$HOME/.deno/bin:$PATH"' >> ~/.bashrc
```

您必须在安装时指定将用于运行脚本的权限。

```shell
deno install --allow-net --allow-read https://deno.land/std@$STD_VERSION/http/file_server.ts -p 8080
```

上述命令将创建一个名为 `file_server`
的可执行文件，该文件以网络和读取权限运行，并绑定到端口 8080。

为了保持良好的实践，使用 [`import.meta.main`](../examples/module_metadata.md)
习惯用法来指定可执行脚本中的入口点。

示例：

<!-- deno-fmt-ignore -->

```ts
// https://example.com/awesome/cli.ts
async function myAwesomeCli(): Promise<void> {
  // -- snip --
}

if (import.meta.main) {
  myAwesomeCli();
}
```

创建可执行脚本时，请确保向用户展示一个示例安装命令，将其添加到仓库中：

```shell
# 使用 deno install 安装

$ deno install -n awesome_cli https://example.com/awesome/cli.ts
```

<<<<<<< HEAD
## 卸载
=======
## Uninstall
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

您可以通过 `deno uninstall` 命令卸载脚本。

```shell
$ deno uninstall file_server
文件服务已卸载
/Users/deno/.deno/bin/file_server 已删除
✅ 文件服务卸载成功。
```

有关更多详细信息，请参见 `deno uninstall -h`。
