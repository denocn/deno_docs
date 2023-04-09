<<<<<<< HEAD
# 调试你的代码

Deno 支持由 Chrome、Edge 和 Node.js 使用的
[V8 Inspector Protocol](https://v8.dev/docs/inspector)，这使得可以使用 Chrome
DevTools 或者其他支持该协议的客户端（如 VSCode）来调试 Deno 程序。

要激活调试功能，请在运行 Deno 时加上 `--inspect`、`--inspect-wait` 或
`--inspect-brk` 标志。

`--inspect` 标志允许在任何时候附加调试器，`--inspect-wait`
将等待调试器附加并开始执行代码，而 `--inspect-brk`
将等待调试器附加并将暂停代码执行在第一行。

> ⚠️ 如果你使用 `--inspect`
> 标志，那么代码将立即开始执行。如果你的程序很短，你可能没有足够的时间在程序执行结束之前连接调试器。这种情况下，请尝试使用
> `--inspect-wait` 或 `--inspect-brk` 标志，或在你的代码末尾加上超时时间。

## Chrome DevTools

让我们尝试使用 Chrome DevTools 调试一个程序。为此，我们将使用来自 `std`
的静态文件服务器
[file_server.ts](https://deno.land/std@$STD_VERSION/http/file_server.ts)。

使用 `--inspect-brk` 标志在第一行时中断执行：
=======
# Debugging Your Code

Deno supports the [V8 Inspector Protocol](https://v8.dev/docs/inspector) used by
Chrome, Edge and Node.js. This makes it possible to debug Deno programs using
Chrome DevTools or other clients that support the protocol (for example VSCode).

To activate debugging capabilities run Deno with the `--inspect`,
`--inspect-wait` or `--inspect-brk` flags.

The `--inspect` flag allows attaching the debugger at any point in time,
`--inspect-wait` will wait for debugger to attach and start executing code,
while `--inspect-brk` will wait for the debugger to attach and will pause
execution on the first line of code.

> ⚠️ If you use `--inspect` flag, the code will start executing immediately. If
> your program is short, you might not have enough time to connect the debugger
> before the program finishes execution. In such cases, try running with
> `--inspect-wait` or `--inspect-brk` flag instead, or add a timeout at the end
> of your code.

## Chrome Devtools

Let's try debugging a program using Chrome Devtools. For this, we'll use
[file_server.ts](https://deno.land/std@$STD_VERSION/http/file_server.ts) from
`std`, a static file server.

Use the `--inspect-brk` flag to break execution on the first line:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell
$ deno run --inspect-brk --allow-read --allow-net https://deno.land/std@$STD_VERSION/http/file_server.ts
Debugger listening on ws://127.0.0.1:9229/ws/1e82c406-85a9-44ab-86b6-7341583480b1
Download https://deno.land/std@$STD_VERSION/http/file_server.ts
Compile https://deno.land/std@$STD_VERSION/http/file_server.ts
...
```

<<<<<<< HEAD
在 Chromium 派生浏览器（如 Google Chrome 或 Microsoft Edge）中，打开
`chrome://inspect` 并点击目标旁的 `Inspect`：

![chrome://inspect](../images/debugger1.jpg)

打开 DevTools 后可能需要几秒钟来加载所有模块。

![DevTools 打开](../images/debugger2.jpg)

你可能会注意到，DevTools 在 `_constants.ts` 的第一行中暂停执行，而不是在
`file_server.ts` 中。这是 JavaScript 中 ES 模块评估的预期行为（`_constants.ts`
是 `file_server.ts` 最左侧、最底部的依赖项，所以它首先被评估）。

此时 DevTools 中包含了所有的源代码，因此让我们打开 `file_server.ts`
并在那里添加一个断点。转到 “Sources” 面板并展开树：

![打开 file_server.ts](../images/debugger3.jpg)

_仔细观察你会发现每个文件都有重复的条目；一个是常规书写的条目，而另一个是斜体的条目。前者是编译的源文件（所以在
`.ts` 文件的情况下，它会生成 JavaScript 源码），而后者是文件的源映射。_

接下来，在 `listenAndServe` 方法中添加一个断点：

![在 file_server.ts 中中断](../images/debugger4.jpg)

一旦我们添加了断点，DevTools
会自动打开源映射文件，这使我们能够逐步走过包括类型在内的实际源代码。

现在我们已经设置了断点，我们可以恢复脚本的执行，以便我们可以检查传入的请求。点击“恢复脚本执行”按钮来执行此操作。你可能需要操作两次！

一旦我们的脚本正在运行，请尝试发送一个请求并在 DevTools 中查看它：
=======
In a Chromium derived browser such as Google Chrome or Microsoft Edge, open
`chrome://inspect` and click `Inspect` next to target:

![chrome://inspect](../images/debugger1.jpg)

It might take a few seconds after opening the DevTools to load all modules.

![DevTools opened](../images/debugger2.jpg)

You might notice that DevTools pauses execution on the first line of
`_constants.ts` instead of `file_server.ts`. This is expected behavior caused by
the way ES modules are evaluated in JavaScript (`_constants.ts` is left-most,
bottom-most dependency of `file_server.ts` so it is evaluated first).

At this point all source code is available in the DevTools, so let's open up
`file_server.ts` and add a breakpoint there; go to "Sources" pane and expand the
tree:

![Open file_server.ts](../images/debugger3.jpg)

_Looking closely you'll find duplicate entries for each file; one written
regularly and one in italics. The former is compiled source file (so in the case
of `.ts` files it will be emitted JavaScript source), while the latter is a
source map for the file._

Next, add a breakpoint in the `listenAndServe` method:

![Break in file_server.ts](../images/debugger4.jpg)

As soon as we've added the breakpoint, DevTools automatically opens up the
source map file, which allows us step through the actual source code that
includes types.

Now that we have our breakpoints set, we can resume the execution of our script
so that we can inspect an incoming request. Hit the "Resume script execution"
button to do so. You might even need to hit it twice!

Once our script is running, try send a request and inspect it in Devtools:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```
$ curl http://0.0.0.0:4507/
```

<<<<<<< HEAD
![在请求处理中中断](../images/debugger5.jpg)

此时，我们可以检查请求的内容并逐步调试代码。

## VSCode

可以使用 VSCode 来调试 Deno。最好使用官方的 `vscode_deno`
扩展程序来完成。有关此方面的文档可以在
[此处](../references/vscode_deno#using-the-debugger) 找到。

## JetBrains IDEs

_**注意**：请确保你已经安装并启用了
[这个 Deno 插件](https://plugins.jetbrains.com/plugin/14382-deno)，并在“首选项/设置
| 插件”中启用它。有关更多信息，请参见
[此博客文章](https://blog.jetbrains.com/webstorm/2020/06/deno-support-in-jetbrains-ides/)。_

你可以通过右键单击要调试的文件并选择 `Debug 'Deno: <file name>'` 选项来使用你的
JetBrains IDE 调试 Deno。

![调试文件](../images/jb-ide-debug.png)

这将创建一个运行/调试配置，没有权限标志被设置。如果你想要配置它们，请打开你的运行/调试配置并在“Command”字段中添加所需的标志。

## 其他

实现 DevTools 协议的任何客户端都应该能够连接到一个 Deno 进程。
=======
![Break in request handling](../images/debugger5.jpg)

At this point we can introspect the contents of the request and go step-by-step
to debug the code.

## VSCode

Deno can be debugged using VSCode. This is best done with help from the official
`vscode_deno` extension. Documentation for this can be found
[here](../references/vscode_deno#using-the-debugger).

## JetBrains IDEs

_**Note**: make sure you have
[this Deno plugin](https://plugins.jetbrains.com/plugin/14382-deno) installed
and enabled in Preferences / Settings | Plugins. For more information, see
[this blog post](https://blog.jetbrains.com/webstorm/2020/06/deno-support-in-jetbrains-ides/)._

You can debug Deno using your JetBrains IDE by right-clicking the file you want
to debug and selecting the `Debug 'Deno: <file name>'` option.

![Debug file](../images/jb-ide-debug.png)

This will create a run/debug configuration with no permission flags set. If you
want to configure them, open your run/debug configuration and add the required
flags to the `Command` field.

## Other

Any client that implements the DevTools protocol should be able to connect to a
Deno process.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
