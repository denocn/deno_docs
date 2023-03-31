# Web Platform Test（Web 平台测试）

Deno 使用自定义的 Web 平台测试运行器。可以在`./tools/wpt.ts`中找到。

## 运行测试

> 如果您使用的是 Windows 系统，或您的系统不支持 hashbangs，请在所有
> `./tools/wpt.ts` 命令前加上
> `deno run --unstable --allow-write --allow-read --allow-net --allow-env --allow-run`。

在第一次尝试运行 WPT 测试之前，请运行 WPT 设置命令。每次更新 `./test_util/wpt`
子模块时，您也必须运行此命令：

```shell
./tools/wpt.ts setup
```

要运行所有可用的 Web 平台测试，请运行以下命令：

```shell
./tools/wpt.ts run

# 您也可以通过指定过滤器来筛选要运行的测试文件：
./tools/wpt.ts run -- streams/piping/general hr-time
```

测试运行器将运行每个 Web
平台测试，并记录其状态（失败或成功）。然后，它将将此输出与
`./tools/wpt/expectation.json`
文件中指定每个测试的预期输出进行比较。此文件是一个嵌套的 JSON 结构，与
`./test_utils/wpt` 目录相对应。它描述每个测试文件，其应该是否全部测试通过
(`true`），是否应全部测试不通过（测试运行器在测试之外遇到异常或所有测试均失败，`false`），或者预计哪些测试会失败（测试用例名称的字符串数组）。

## 更新启用的测试或预期

您可以通过更改 JSON 结构中每个测试文件条目的值，手动更新
`./tools/wpt/expectation.json` 文件。另一种选择是让 WPT
运行器运行所有或筛选的部分测试，然后自动更新 `expectation.json`
文件以与当前实际情况匹配。您可以使用 `./wpt.ts update` 命令来执行此操作。例如：

```shell
./tools/wpt.ts update -- hr-time
```

运行此命令后，`expectation.json`
文件将匹配运行的所有测试的当前输出。这意味着在运行 `wpt.ts run` 命令之后立即运行
`wpt.ts update` 命令应始终通过。

## 子命令

### `setup`

验证您的环境是否正确配置，或帮助您进行配置。

这将检查 python3（或 Windows 上的 `python.exe`）是否实际上是 Python 3。

您可以指定以下标志以自定义行为：

```
--rebuild
    重新生成清单而不是下载。这可能需要长达 3 分钟。

--auto-config
    如果未配置，则自动配置 /etc/hosts（不会显示提示）。
```

### `run`

按照 `expectation.json` 中指定的方式运行所有测试。

您可以指定以下标志以自定义行为：

```
--release
    使用 ./target/release/deno 二进制文件而不是 ./target/debug/deno

--quiet
    禁用“ok”测试案例的打印。

--json=<file>
    将测试结果作为 JSON 输出到指定的文件中。
```

您还可以通过指定一个或多个过滤器来指定要运行的测试：

```
./tools/wpt.ts run -- hr-time streams/piping/general
```

### `update`

更新 `expectation.json` 以与当前实际情况匹配。

您可以指定以下标志以自定义行为：

```
--release
    使用 ./target/release/deno 二进制文件而不是 ./target/debug/deno

--quiet
    禁用“ok”测试案例的打印。

--json=<file>
    将测试结果作为 JSON 输出到指定的文件中。
```

您还可以通过指定一个或多个过滤器来指定要运行的测试：

```
./tools/wpt.ts update -- hr-time streams/piping/general
```

## 常见问题解答

### 升级 wpt 子模块：

```shell
cd test_util/wpt/
git fetch origin
git checkout origin/epochs/daily
cd ../../
git add ./test_util/wpt
```

所有贡献者都需要在此之后重新运行 `./tools/wpt.ts setup` 命令。

由于升级 WPT 通常需要更新期望以涵盖各种上游更改，因此最好将其作为单独的 PR
进行，而不是作为实施修复或功能的 PR 的一部分。
