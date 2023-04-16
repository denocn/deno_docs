<<<<<<< HEAD
# 测试 API

`vscode_deno` 扩展实现了 vscode
[Testing API](https://code.visualstudio.com/api/extension-guides/testing)
的客户端，在使用支持测试 API 的 Deno 版本时，项目中的测试将在启用 Deno
的项目中显示在 IDE 中。

## 测试展示

当编辑器和 Deno 版本都支持测试 API 时，会激活名为“Test
Explorer”的侧边栏，由试管图标表示，其中列出了在项目中发现的测试用例。

此外，在代码中标识出的测试用例旁边也会有标记，允许您运行并查看每个测试的状态，并在命令面板中提供测试用例的选项。

## 发现测试用例

当前，Deno
仅会发现作为工作区“已知”模块的测试用例。当编辑器打开一个模块时，或导入该模块的另一个模块在编辑器中“已知”时，该模块成为“已知”。

在将来，测试用例将以与“deno
test”子命令发现工作区根目录中的测试用例相似的方式发现。

## 运行测试用例

您可以从 Test Explorer
视图、在查看测试代码时在测试用例旁边的标记，或通过命令面板运行测试用例。您还可以使用
Text Explorer 视图中的过滤功能来排除某些测试用例。

当前，Deno
仅支持“运行”测试能力。将来我们将添加调试运行模式和覆盖率运行模式。我们还将将基准测试作为“标记”整合到测试运行中，以便可以在测试运行中运行它们（或排除它们）。

Deno 语言服务器不会启动新的 CLI 子进程。它会为每个测试模块生成一个新的线程和
JavaScript 运行时来执行测试。

## 测试输出

在测试中出现的任何 `console.log()` 将被发送到 vscode 中的测试输出窗口中。

当测试失败时，失败消息（包括堆栈跟踪）在 vscode 中检查测试结果时将可用。

## 测试用例结构

测试用例将在 Test Explorer
中与包含测试的模块一起显示在顶层。模块内将包含已发现的所有测试用例，并且如果使用测试步骤，则测试步骤将包含在测试用例下方。

在大多数情况下，Deno
语言服务器将能够静态地识别测试用例，但如果您动态生成测试用例，则 Deno
可能直到运行时才能识别它们。在这些情况下，可能无法从运行中过滤这些测试用例，但遇到它们时会将其添加到资源管理器视图中。

## 配置

默认情况下，测试将以类似于在命令行上使用 `deno test --allow-all`
的方式执行。这些默认选项可以通过在用户或工作区设置中设置 _Deno > Testing: Args_
选项（或手动配置 `deno.testing.args`）来更改。在此处添加您将使用 `deno test`
子命令中使用的个别选项。

根据您的其他设置，这些选项将自动合并到运行测试时使用的“命令行”中，除非在 _Deno >
Testing: Args_ 设置中明确提供。例如，如果您设置了 _Deno: Import Map_
(`deno.importMap`)，则该值将使用，除非在测试参数设置中提供了显式的
`--import-map` 值。

## 已知限制和注意事项

由于 Deno 测试运行器的运行方式，无法排除（或显式包括）测试步骤。虽然 vscode UI
允许您这样做，例如，选择运行特定的测试步骤，但该测试中的所有测试步骤都将运行（但
vscode
不会更新它们的结果）。因此，如果测试用例中存在其他副作用，则可能会发生这种情况。
=======
# Testing API

The `vscode_deno` extension implements a client for the vscode
[Testing API](https://code.visualstudio.com/api/extension-guides/testing) and
when using a version of Deno that supports the testing API, tests in your
project will be displayed within your IDE for Deno enabled projects.

## Test display

When both the editor and the version of Deno support the testing API, the _Test
Explorer_ view will activate represented by a beaker icon, which will provide
you with a side panel of tests that have been discovered in your project.

Also, next to tests identified in the code, there will be decorations which
allow you to run and see the status of each test, as well as there will be
entries in the command pallette for tests.

## Discovering tests

Currently, Deno will only discover tests that are part of the "known" modules
inside a workspace. A module becomes "known" when it is opened in the editor, or
another module which imports that module is "known" inside the editor.

In the future, tests will be discovered in a similar fashion to the way the
`deno test` subcommand discovers tests as part of the root of the workspace.

## Running tests

You can run tests from the Test Explorer view, from the decorations next to the
tests when viewing the test code, or via the command pallette. You can also use
the filter function in the Text Explorer view to exclude certain tests from a
test run.

Currently, Deno only supports the "run" test capability. We will be adding a
debug run mode as well as a coverage run mode in the future. We will also be
integrating the benchmarking tests as a _tag_, so they can be run (or excluded)
from your test runs.

The Deno language server does not spin up a new CLI subprocess. It instead
spawns a new thread and JavaScript runtime per test module to execute the tests.

## Test output

Any `console.log()` that occurs in your tests will be sent to the test output
window within vscode.

When a test fails, the failure message, including the stack trace, will be
available when inspecting the test results in vscode.

## How tests are structured

Test will be displayed in the Test Explorer at the top level with the module
that contains the test. Inside the module will be all the tests that have been
discovered, and if you are using test steps, they will be included under the
test.

In most cases, the Deno language server will be able to statically identify
tests, but if you are generating tests dynamically, Deno may not be aware of
them until runtime. In these cases it may not be possible to filter these tests
out of a run, but they will be added to the explorer view as they are
encountered.

## Configuration

By default, tests are executed in a similar fashion to if you were to use
`deno test --allow-all` on the command line. These default arguments can be
changed by setting the _Deno > Testing: Args_ option in your user or workspace
settings (or `deno.testing.args` if you are configuring manually). Add
individual arguments here which you would have used with the `deno test`
subcommand.

Based on other settings that you have, those options will be automatically
merged into the "command line" used when running tests unless explicitly
provided in the _Deno > Testing: Args_ setting. For example if you have a _Deno:
Import Map_ (`deno.importMap`) set, the value of that will be used unless you
have provided an explicit `--import-map` value in the testing args setting.

## Known limitations and caveats

Because of the way the Deno test runner runs, it is not possible to exclude (or
explicitly include) a test step. While the vscode UI will allow you to do this,
by for example, choosing to run a specific test step, all test steps in that
test will be run (but vscode will not update the results for them). So if there
are other side effects in the test case, they may occur.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
