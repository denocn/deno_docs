## 配置你的环境 {#set-up-your-environment}

<<<<<<< HEAD
你需要正确地配置环境以高效地使用 Deno 进行开发。配置内容将会涵盖 shell 自动补全，环境变量以及你的 IDE 配置。

### 环境变量 {#environmental-variables}

以下这些环境变量会影响 Deno 的各种行为。

`DENO_DIR` 的默认值为 `$HOME/.cache/deno`，但是你可以选择其他任何路径来读写生成的源码。

如果设置了 `NO_COLOR` 变量，Deno 的输出将不会带有颜色。详情请参照 https://no-color.org/。你不需要使用 `--allow-env` 来验证是否设置了 `NO_COLOR`，只需要检查常量 `Deno.noColor` 的值，其类型为 Boolean。

### Shell 自动补全 {#shell-autocomplete}

你可以通过 `deno completions <shell>` 命令来为你的 Shell 生成自动补全脚本并输出到控制台。你仍需要将控制台的输出保存在相关的文件中以使其生效。

该功能支持以下 shell 环境：

- zsh
- bash
- fish
- powershell
- elvish

示例（bash）：

```shell
deno completions bash > /usr/local/etc/bash_completion.d/deno.bash
source /usr/local/etc/bash_completion.d/deno.bash
```

示例（不带任何框架的 zsh）：

```shell
mkdir ~/.zsh # 为你的补全创建一个文件夹。该文件夹可以位于任何位置。
deno completions zsh > ~/.zsh/_deno
```

再将此路径添加到 `.zshrc`

```shell
fpath=(~/.zsh $fpath)
autoload -Uz compinit
compinit -u
```

最后重启终端。请注意，如果自动补全未能成功载入，你可能需要先运行 `rm ~/.zcompdump/` 来删除之前生成的 compinit 文件，再运行 `compinit` 来重新生成。

示例（zsh + oh-my-zsh) [推荐 zsh 用户采用这个方案] :

```shell
mkdir ~/.oh-my-zsh/custom/plugins/deno
deno completions zsh > ~/.oh-my-zsh/custom/plugins/deno/_deno
```

随后，将 deno 插件添加到 `~/.zshrc` 文件的 "plugins" 标签下。对于 `antigen` 之类的工具来说，你的 path 将会是 `~/.antigen/bundles/robbyrussell/oh-my-zsh/plugins`，而你的指令则是 `antigen bundle deno`，以此类推。

示例（Powershell）：

```shell
deno completions powershell >> $profile
.$profile
```

以上命令默认会在 `$HOME\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` 创建一个 Powershell 的配置文件，并且会在你每次运行 Powershell 时执行。

### 编辑器及 IDE {#editors-and-ides}

由于 Deno 的模块引入机制依赖文件拓展名，且允许通过 http 引入。而目前绝大多数编辑器和语言服务器并未对此提供原生支持，因此很多编辑器在现阶段会因为无法找到文件而报错，或者会在引入时加入不必要的文件拓展名。

为了应对这种情况，社区提供了以下编辑器插件：

#### VS Code {#vs-code}

[vscode_deno](https://github.com/denoland/vscode_deno) 的测试版已在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)发布，欢迎反馈任何使用中遇到的问题。

#### JetBrains IDEs {#jetbrains-ides}

JetBrains 的 IDEs 的支持由
[the Deno plugin](https://plugins.jetbrains.com/plugin/14382-deno)提供。
=======
The Deno CLI contains a lot of the "tools" that are needed for developing
applications, including a full language server to help power your IDE of choice.
[Installing](./installation.md) is all you need to do to make these
[tools](./command_line_interface.md) available to you.

Outside of using Deno with your favorite IDE, this section also documents
[shell completions](#shell-completions) and
[environment variables](#environment-variables)

### Using an editor/IDE

There is broad support for Deno in editors/IDEs. The following sections provide
information about how to use Deno with editors. Most editors integrate directly
into Deno using the Language Server Protocol and the language server that is
integrated into the Deno CLI.

If you are trying to write or support a community integration to the Deno
language server, there is some
[documentation](https://github.com/denoland/deno/tree/main/cli/lsp#deno-language-server)
located in the Deno CLI code repository, but also feel free to join the
[Discord community](https://discord.gg/deno) in the `#dev-lsp` channel.

#### Visual Studio Code

There is an official extension for
[Visual Studio Code](https://code.visualstudio.com/) called
[vscode_deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
When installed, it will connect to the language server built into the Deno CLI.

Because most people work in mixed environments, the extension does not enable a
workspace as _Deno enabled_ by default, and it requires that the
`"deno.enabled"` flag to be set. You can change the settings yourself, or you
can choose `Deno: Initialize Workspace Configuration` from the command pallet to
enable your project.

More information can be found in the
[Using Visual Studio Code](../vscode_deno.md) section of the manual.

#### JetBrains' IntelliJ IDEA and WebStorm

Currently support for [JetBrains](https://www.jetbrains.com/) IDEs is available
through [the Deno plugin](https://plugins.jetbrains.com/plugin/14382-deno).
>>>>>>> 8f46c7fe4ffe8635c9537242d409d05add655b6b

安装之后，将
`External Libraries > Deno Library > lib > lib.deno.d.ts` 替换为
`deno types` 命令的输出。这会为当前版本提供自动补全和代码提示。当你每次升级 Deno 版本后，需要再次执行以上操作。此插件的详细使用说明已发布在 YouTrack 的 [评论](https://youtrack.jetbrains.com/issue/WEB-41607#focus=streamItem-27-4160152.0-0) 中。

<<<<<<< HEAD
#### Vim and NeoVim {#vim-and-neovim}

通过安装 [CoC](https://github.com/neoclide/coc.nvim)（intellisense 智能化引擎和语言服务器协议）或者 [ALE](https://github.com/dense-analysis/ale)（语法检查器和
语言服务器协议客户端）便可对 Deno/TypeScript 提供很好的支持。

##### CoC {#coc}

在安装 CoC 以后，请在 Vim 内运行 `:CocInstall coc-tsserver` 和 `:CocInstall coc-deno`。在你的项目中运行 `:CocCommand deno.initializeWorkspace` 以初始化工作空间配置。到此为止，`gd` （跳转到定义） 和 `gr` （跳转到引用）等功能应该已生效。
=======
JetBrain's is considering migrating to the Deno language server (see:
[YouTrack WEB-48625](https://youtrack.jetbrains.com/issue/WEB-48625)). If you
are a user of JetBrains and Deno, voicing your support can continue help
JetBrains prioritize support.

#### vim/Neovim

Deno is well supported on both [vim](https://www.vim.org/) and
[Neovim](https://neovim.io/) via
[coc.nvim](https://github.com/neoclide/coc.nvim) and
[ALE](https://github.com/dense-analysis/ale). coc.nvim offers plugins to
integrate to the Deno language server while ALE supports it _out of the box_.

##### coc.nvim

Once you have
[coc.nvim installed](https://github.com/neoclide/coc.nvim/wiki/Install-coc.nvim)
installed, you need to install the required plugins via
`:CocInstall coc-tsserver coc-deno`.

Once the plugins are installed and you want to enable Deno for a workspace, run
the command `:CocCommand deno.initializeWorkspace` and you should be able to
utilize commands like `gd` (goto definition) and `gr` (go/find references).
>>>>>>> 8f46c7fe4ffe8635c9537242d409d05add655b6b

##### ALE {#ale}

<<<<<<< HEAD
ALE 原生支持 Deno 的 LSP（语言服务器协议），不许要额外配置。然而，如果你的 Deno 可执行文件不存在于 `$PATH`，或者拥有不同于 `deno` 的名字，亦或是你想尝试不稳定的特性与接口，你需要覆盖 ALE 的默认值。详情请见 [`:help ale-typescript`](https://github.com/dense-analysis/ale/blob/master/doc/ale-typescript.txt)。

ALE 提供了自动补全、重构、跳转定义、跳转引用等功能。不过，你需要手动配置按键绑定。你可以选择拷贝以下代码片段到你的 `vimrc`/`init.vim` 以获得最基本的支持，或者参考 [官方文档](https://github.com/dense-analysis/ale#table-of-contents)来对如何配置 ALE 获得更深的了解。

ALE 可以通过运行 `deno fmt` 来修复 linter 提出的问题。如果想要让 ALE 使用 Deno 的格式化工具，你需要配置 `ale_linter`。如果你想调整当前 buffer 配置，则使用（`let b:ale_linter = ['deno']`）。如果想为所有 TypeScript 文件提供全局配置，则需要设置成（`let g:ale_fixers={'typescript': ['deno']}`）。

```vim
" Use ALE autocompletion with Vim's 'omnifunc' setting (press <C-x><C-o> in insert mode)
autocmd FileType typescript set omnifunc=ale#completion#OmniFunc

" Make sure to use map instead of noremap when using a <Plug>(...) expression as the {rhs}
nmap gr <Plug>(ale_rename)
nmap gR <Plug>(ale_find_reference)
nmap gd <Plug>(ale_go_to_definition)
nmap gD <Plug>(ale_go_to_type_definition)

let g:ale_fixers = {'typescript': ['deno']}
let g:ale_fix_on_save = 1 " run deno fmt when saving a buffer
```
=======
ALE supports Deno via the Deno language server out of the box and in many uses
cases doesn't require additional configuration. Once you have
[ALE installed](https://github.com/dense-analysis/ale#installation) you can
perform the command
[`:help ale-typescript-deno`](https://github.com/dense-analysis/ale/blob/master/doc/ale-typescript.txt)
to get information on the configuration options available.

For more information on how to setup ALE (like key bindings) refer to the
[official documentation](https://github.com/dense-analysis/ale#usage).
>>>>>>> 8f46c7fe4ffe8635c9537242d409d05add655b6b

#### Emacs {#emacs}

<<<<<<< HEAD
通过组合使用 [tide](https://github.com/ananthakumaran/tide) 和 [typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin)，Emacs 便可对使用 TypeScript 的 Deno 项目提供很好的支持。[tide](https://github.com/ananthakumaran/tide) 是在 Emacs 中使用 TypeScript 所需要的正规方式，而 [typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin) 则是 [VSCode 官方 Deno 插件](https://github.com/denoland/vscode_deno)。

首先，确保 `tide` 已经在你的 Emacs 实例中正确配置。其次，根据 [typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin) 的引导，在你的项目文件夹内运行 `npm install --save-dev typescript-deno-plugin typescript`（如果你仍未初始化你的项目文件夹，按需运行 `npm init -y`）。最后，在你的 `tsconfig.json` 文件内添加以下内容即可。

```jsonc
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-deno-plugin",
        "enable": true, // 默认值为 `true`
        "importmap": "import_map.json"
      }
    ]
  }
}
```
=======
##### ls-mode

Emacs supports Deno via the Deno language server using
[lsp-mode](https://emacs-lsp.github.io/lsp-mode/). Once
[lsp-mode is installed](https://emacs-lsp.github.io/lsp-mode/page/installation/)
it should support Deno, which can be
[configured](https://emacs-lsp.github.io/lsp-mode/page/lsp-deno/) to support
various settings.

##### eglot
>>>>>>> 8f46c7fe4ffe8635c9537242d409d05add655b6b

You can also use built-in Deno language server by using
[`eglot`](https://github.com/joaotavora/eglot).

An example configuration for Deno via eglot:

```elisp
(add-to-list 'eglot-server-programs '((js-mode typescript-mode) . (eglot-deno "deno" "lsp")))

  (defclass eglot-deno (eglot-lsp-server) ()
    :documentation "A custom class for deno lsp.")

  (cl-defmethod eglot-initialization-options ((server eglot-deno))
    "Passes through required deno initialization options"
    (list :enable t
    :lint t))
```

#### Atom {#atom}

<<<<<<< HEAD
Install atom-ide-base package and atom-ide-deno package on Atom.

#### LSP clients {#lsp-clients}

Deno 在 1.6.0 以后的版本对[语言服务器协议](https://langserver.org)提供了内建支持。

如果你的编辑器支持 LSP，你可以将 Deno 用作你的 JavaScript 和 TypeScript 语言服务器。

编辑器可以通过 `deno lsp`命令来开启语言服务器。

##### 示例：Kakoune {#example-for-kakoune}

在安装 [`kak-lsp`](https://github.com/kak-lsp/kak-lsp) LSP 客户端以后，你可以你可以通过添加以下内容至 `kak-lsp.toml` 以添加 Deno 的语言服务器。

```toml
[language.deno]
filetypes = ["typescript", "javascript"]
roots = [".git"]
command = "deno"
args = ["lsp"]

[language.deno.initialization_options]
enable = true
lint = true
```

##### 示例：Vim/Neovim {#example-for-vimneovim}

在安装 [`vim-lsp`](https://github.com/prabirshrestha/vim-lsp) LSP 客户端以后，你可以你可以通过添加以下内容至 `vimrc`/`init.vim` 以添加 Deno 的语言服务器。

```vim
if executable("deno")
  augroup LspTypeScript
    autocmd!
    autocmd User lsp_setup call lsp#register_server({
    \ "name": "deno lsp",
    \ "cmd": {server_info -> ["deno", "lsp"]},
    \ "root_uri": {server_info->lsp#utils#path_to_uri(lsp#utils#find_nearest_parent_file_directory(lsp#utils#get_buffer_path(), "tsconfig.json"))},
    \ "allowlist": ["typescript", "typescript.tsx"],
    \ "initialization_options": {
    \     "enable": v:true,
    \     "lint": v:true,
    \     "unstable": v:true,
    \   },
    \ })
  augroup END
endif
```

##### 示例：Sublime Text {#example-for-sublime-text}

- 安装 [Sublime LSP 包](https://packagecontrol.io/packages/LSP)
- 安装
  [TypeScript 包](https://packagecontrol.io/packages/TypeScript) 以获得语法高亮。
- 在你的项目文件下添加 `.sublime-project` 文件，内容如下：
=======
The [Atom editor](https://atom.io) supports integrating with the Deno language
server via the [atom-ide-deno](https://atom.io/packages/atom-ide-deno) package.
`atom-ide-deno` requires that the Deno CLI be installed and the
[atom-ide-base](https://atom.io/packages/atom-ide-base) package to be installed
as well.

#### Sublime Text

[Sublime Text](https://www.sublimetext.com/) supports connecting to the Deno
language server via the [LSP package](https://packagecontrol.io/packages/LSP).
You may also want to install the
[TypeScript package](https://packagecontrol.io/packages/TypeScript) to get full
syntax highlighting.

Once you have the LSP package installed, you will want to add configuration to
your `.sublime-project` configuration like the below:
>>>>>>> 8f46c7fe4ffe8635c9537242d409d05add655b6b

```jsonc
{
  "settings": {
    "LSP": {
      "deno": {
        "command": [
          "deno",
          "lsp"
        ],
        "initializationOptions": {
          // "config": "", // 添加你项目配置文件的路径
          "enable": true,
          // "importMap": "", // 添加你项目导入图的路径
          "lint": true,
          "unstable": false
        },
        "enabled": true,
        "languages": [
          {
            "languageId": "javascript",
            "scopes": ["source.js"],
            "syntaxes": [
              "Packages/Babel/JavaScript (Babel).sublime-syntax",
              "Packages/JavaScript/JavaScript.sublime-syntax"
            ]
          },
          {
            "languageId": "javascriptreact",
            "scopes": ["source.jsx"],
            "syntaxes": [
              "Packages/Babel/JavaScript (Babel).sublime-syntax",
              "Packages/JavaScript/JavaScript.sublime-syntax"
            ]
          },
          {
            "languageId": "typescript",
            "scopes": ["source.ts"],
            "syntaxes": [
              "Packages/TypeScript-TmLanguage/TypeScript.tmLanguage",
              "Packages/TypeScript Syntax/TypeScript.tmLanguage"
            ]
          },
          {
            "languageId": "typescriptreact",
            "scopes": ["source.tsx"],
            "syntaxes": [
              "Packages/TypeScript-TmLanguage/TypeScriptReact.tmLanguage",
              "Packages/TypeScript Syntax/TypeScriptReact.tmLanguage"
            ]
          }
        ]
      }
    }
  }
}
```

<<<<<<< HEAD
如果你未能在以上列表内找到你最爱的 IDE，或许你可以亲自开发扩展程序。我们的[社区 Discord 小组](https://discord.gg/deno)可以给你提供上手指导。
=======
#### GitHub Codespaces

[GitHub Codespaces](https://github.com/features/codespaces) allows you develop
fully online or remotely on your local machine without needing to configure or
install Deno. It is currently in early access.

If a project is a Deno enabled project and contains the `.devcontainer`
configuration as part of the repository, opening the project in GitHub
Codespaces should just "work". If you are starting a new project, or you want to
add Deno support to an existing code space, it can be added by selecting the
`Codespaces: Add Development Container Configuration Files...` from the command
pallet and then selecting `Show All Definitions...` and then searching for the
`Deno` definition.

Once selected, you will need to rebuild your container so that the Deno CLI is
added to the container. After the container is rebuilt, the code space will
support Deno.

#### Kakoune

[Kakoune](http://kakoune.org/) supports connecting to the Deno language server
via the [kak-lsp](https://github.com/kak-lsp/kak-lsp) client. Once
[kak-lsp is installed](https://github.com/kak-lsp/kak-lsp#installation) an
example of configuring it up to connect to the Deno language server is by adding
the following to your `kak-lsp.toml`:

```toml
[language.deno]
filetypes = ["typescript", "javascript"]
roots = [".git"]
command = "deno"
args = ["lsp"]

[language.deno.initialization_options]
enable = true
lint = true
```

### Shell completions

Built into the Deno CLI is support to generate shell completion information for
the CLI itself. By using `deno completions <shell>`, the Deno CLI will output to
stdout the completions. Current shells that are supported:

- bash
- elvish
- fish
- powershell
- zsh

#### bash example

Output the completions and add them to tne environment:

```
> deno completions bash > /usr/local/etc/bash_completion.d/deno.bash
> source /usr/local/etc/bash_completion.d/deno.bash
```

#### PowerShell example

Output the completions:

```
> deno completions powershell >> $profile
> .$profile
```

This will be create a Powershell profile at
`$HOME\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`, and it
will be run whenever you launch the PowerShell.

#### zsh example

You should have a directory where the completions can be saved:

```
> mkdir ~/.zsh
```

Then output the completions:

```
> deno completions zsh > ~/.zsh/_deno
```

And ensure the completions get loaded in your `~/.zshrc`:

```shell
fpath=(~/.zsh $fpath)
autoload -Uz compinit
compinit -u
```

If after reloading your shell and completions are still not loading, you may
need to remove `~/.zcompdump/` to remove previously generated completions and
then `compinit` to generate them again.

#### zsh example with ohmyzsh and antigen

[ohmyzsh](https://github.com/ohmyzsh/ohmyzsh) is a configuration framework for
zsh and can make it easier to manage your shell configuration.
[antigen](https://github.com/zsh-users/antigen) is a plugin manager for zsh.

Create the directory to store the completions and output the completions:

```
> mkdir ~/.oh-my-zsh/custom/plugins/deno
> deno completions zsh > ~/.oh-my-zsh/custom/plugins/deno/_deno
```

Then your `.zshrc` might look something like this:

```shell
source /path-to-antigen/antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

antigen bundle deno
```

### Environment variables

There are a couple environment variables which can impact the behavior of Deno:

- `DENO_AUTH_TOKENS` - a list of authorization tokens which can be used to allow
  Deno to access remote private code. See the
  [Private modules and repositories](../linking_to_external_code/private.md)
  section for more details.
- `DENO_CERT` - load a certificate authority from a PEM encoded file. This
  "overrides" the `--cert` option. See the
  [Proxies](../linking_to_external_code/proxies.md) section for more
  information.
- `DENO_DIR` - this will set the directory where cached information from the CLI
  is stored. This includes items like cached remote modules, cached transpiled
  modules, language server cache information and persisted data from local
  storage. This defaults to the operating systems default cache location and
  then under the `deno` path.
- `DENO_INSTALL_ROOT` - When using `deno install` where the installed scripts
  are stored. This defaults to `$HOME/.deno/bin`.
- `DENO_WEBGPU_TRACE` - The directory to use for WebGPU traces.
- `HTTP_PROXY` - The proxy address to use for HTTP requests. See the
  [Proxies](../linking_to_external_code/proxies.md) section for more
  information.
- `HTTPS_PROXY` - The proxy address to use for HTTPS requests. See the
  [Proxies](../linking_to_external_code/proxies.md) section for more
  information.
- `NO_COLOR` - If set, this will cause the Deno CLI to not send ASCII color
  codes when writing to stdout and stderr. See the website https://no-color.org/
  for more information on this _de facto_ standard. The value of this flag can
  be accessed at runtime without permission to read the environment variables by
  checking the value of `Deno.noColor`.
- `NO_PROXY` - Indicates hosts which should bypass the proxy set in the other
  environment variables. See the
  [Proxies](../linking_to_external_code/proxies.md) section for more
  information.
>>>>>>> 8f46c7fe4ffe8635c9537242d409d05add655b6b
