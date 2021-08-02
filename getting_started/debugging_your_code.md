## 调试代码 {#debugging-your-code}

Deno 支持 [V8 Inspector Protocol](https://v8.dev/docs/inspector).

支持 V8，也就是说可以使用 Chrome Devtools 或其他支持 V8 协议的客户端来调试 Deno 程序 (例如 VSCode)。

要调试，请使用 `——inspect` 或 `——inspect-brk` 标志来运行 Deno。

`——inspect` 标志允许在任何时间点连接调试器，而 `——inspect-brk` 将等待调试器连接，并在第一行代码时暂停执行。

### Chrome Devtools {#chrome-devtools}

让我们用 Chrome Devtools 来调试一个程序。为此，我们使用一个来自 Deno 标准库的静态文件服务器
[file_server.ts](https://deno.land/std@$STD_VERSION/http/file_server.ts)。

使用 `——inspect-brk` 标志在第一行中断执行:

```shell
$ deno run --inspect-brk --allow-read --allow-net https://deno.land/std@$STD_VERSION/http/file_server.ts
Debugger listening on ws://127.0.0.1:9229/ws/1e82c406-85a9-44ab-86b6-7341583480b1
Download https://deno.land/std@$STD_VERSION/http/file_server.ts
Compile https://deno.land/std@$STD_VERSION/http/file_server.ts
...
```

打开 `chrome://inspect`，然后点击 `inspect`:

![chrome://inspect](../images/debugger1.jpg)

打开 Devtools 加载所有模块可能需要一点时间。

![Devtools opened](../images/debugger2.jpg)

您可能会注意到，Devtools 在 `_constants.ts` 的第一行暂停了执行，而不是 `file_server.ts`。

这是预期的行为，是由 V8 评估 ES 模块的方式导致的（`_constants.ts` 是 `file_server.ts`
的最原始、最基础的依赖项，因此将首先对其进行评估）。

此时所有的源码都可以在 Devtools 中找到的，所以让我们打开 `file_server.ts` 并在其中添加一个断点。转到 “Sources”
面板并展开文件树：

![Open file_server.ts](../images/debugger3.jpg)

_仔细观察，您会发现每个文件都有重复；一份是常规字体，另一份是斜体。前者是编译后的源文件（因此，在 `.ts` 文件的情况下，它将作为 JavaScript
输出），而后者是该文件的 SourceMap。_

接下来，在 `listenAndServe` 方法中添加一个断点：

![Break in file_server.ts](../images/debugger4.jpg)

添加断点后，Devtools 会自动打开 SourceMap 文件，我们就可以逐步浏览实际的源码。

现在我们已经设置了断点，我们可以继续执行脚本，以便我们可以检查传入的请求。点击恢复脚本执行按钮。您甚至可能需要打两次！

脚本再次运行后，让我们发送一个请求并在 Devtools 中对其进行检查：

```
$ curl http://0.0.0.0:4507/
```

![Break in request handling](../images/debugger5.jpg)

在这一点上，我们可以内省请求的内容，并逐步调试代码。

### VSCode {#vscode}

可以使用 VSCode 调试 Deno。

官方插件正在开发中 - https://github.com/denoland/vscode_deno/issues/12

我们仍然可以通过手动提供
[`launch.json`](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)
配置来附加调试器：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Deno",
      "type": "pwa-node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect-brk", "-A", "${file}"],
      "attachSimplePort": 9229
    }
  ]
}
```

**注意**: 这将使用您打开的文件作为入口点。如果需要固定的入口点，请用脚本名称替换 `${file}`。

让我们尝试调试本地文件。创建 `server.ts`：

```ts
import { serve } from "https://deno.land/std@$STD_VERSION/http/server.ts";
const server = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
```

然后我们可以设置一个断点，并运行创建的配置：

![VSCode debugger](../images/debugger7.jpg)

### JetBrains IDEs {#jetbrains-ides}

您可以使用 JetBrains IDE 调试 Deno，右键单击要调试的文件，然后选择
“调试'Deno：<文件名>'”（`Debug 'Deno: <file name>'`） 选项。这将创建未设置权限标志的 运行/调试
配置。要配置这些标志，请编辑 运行/调试 配置，并使用必需的标志修改 `Arguments` 字段。

### 其他 {#other}

任何实现了 Devtools 协议的客户端都能够连接到 Deno 进程。

### 局限 {#limitations}

Devtools 的支持仍不成熟。有一些已知的功能缺失或错误：

- Devtools 控制台中的自动补全会导致 Deno 进程退出。
- 分析和内存转储可能无法正常工作。
