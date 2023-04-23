<<<<<<< HEAD
# Web Platform Test（Web 平台测试）

Deno 使用自定义的 Web 平台测试运行器。可以在`./tools/wpt.ts`中找到。

## 运行测试

> 如果您使用的是 Windows 系统，或您的系统不支持 hashbangs，请在所有
> `./tools/wpt.ts` 命令前加上
> `deno run --unstable --allow-write --allow-read --allow-net --allow-env --allow-run`。

在第一次尝试运行 WPT 测试之前，请运行 WPT 设置命令。每次更新 `./test_util/wpt`
子模块时，您也必须运行此命令：
=======
# Web Platform Test

Deno uses a custom test runner for Web Platform Tests. It can be found at
`./tools/wpt.ts`.

## Running tests

> If you are on Windows, or your system does not support hashbangs, prefix all
> `./tools/wpt.ts` commands with
> `deno run --unstable --allow-write --allow-read --allow-net --allow-env --allow-run`.

Before attempting to run WPT tests for the first time, please run the WPT setup.
You must also run this command every time the `./test_util/wpt` submodule is
updated:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```shell
./tools/wpt.ts setup
```

<<<<<<< HEAD
要运行所有可用的 Web 平台测试，请运行以下命令：
=======
To run all available web platform tests, run the following command:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```shell
./tools/wpt.ts run

<<<<<<< HEAD
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
=======
# You can also filter which test files to run by specifying filters:
./tools/wpt.ts run -- streams/piping/general hr-time
```

The test runner will run each web platform test and record its status (failed or
ok). It will then compare this output to the expected output of each test as
specified in the `./tools/wpt/expectation.json` file. This file is a nested JSON
structure that mirrors the `./test_utils/wpt` directory. It describes for each
test file, if it should pass as a whole (all tests pass, `true`), if it should
fail as a whole (test runner encounters an exception outside of a test or all
tests fail, `false`), or which tests it expects to fail (a string array of test
case names).

## Updating enabled tests or expectations

You can update the `./tools/wpt/expectation.json` file manually by changing the
value of each of the test file entries in the JSON structure. The alternative
and preferred option is to have the WPT runner run all, or a filtered subset of
tests, and then automatically update the `expectation.json` file to match the
current reality. You can do this with the `./wpt.ts update` command. Example:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```shell
./tools/wpt.ts update -- hr-time
```

<<<<<<< HEAD
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
=======
After running this command the `expectation.json` file will match the current
output of all the tests that were run. This means that running `wpt.ts run`
right after a `wpt.ts update` should always pass.

## Subcommands

### `setup`

Validate that your environment is configured correctly, or help you configure
it.

This will check that the python3 (or `python.exe` on Windows) is actually
Python 3.

You can specify the following flags to customize behaviour:

```
--rebuild
    Rebuild the manifest instead of downloading. This can take up to 3 minutes.

--auto-config
    Automatically configure /etc/hosts if it is not configured (no prompt will be shown).
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
```

### `run`

<<<<<<< HEAD
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
=======
Run all tests like specified in `expectation.json`.

You can specify the following flags to customize behaviour:

```
--release
    Use the ./target/release/deno binary instead of ./target/debug/deno

--quiet
    Disable printing of `ok` test cases.

--json=<file>
    Output the test results as JSON to the file specified.
```

You can also specify exactly which tests to run by specifying one of more
filters after a `--`:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```
./tools/wpt.ts run -- hr-time streams/piping/general
```

### `update`

<<<<<<< HEAD
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
=======
Update the `expectation.json` to match the current reality.

You can specify the following flags to customize behaviour:

```
--release
    Use the ./target/release/deno binary instead of ./target/debug/deno

--quiet
    Disable printing of `ok` test cases.

--json=<file>
    Output the test results as JSON to the file specified.
```

You can also specify exactly which tests to run by specifying one of more
filters after a `--`:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```
./tools/wpt.ts update -- hr-time streams/piping/general
```

<<<<<<< HEAD
## 常见问题解答

### 升级 wpt 子模块：
=======
## FAQ

### Upgrading the wpt submodule:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```shell
cd test_util/wpt/
git fetch origin
git checkout origin/epochs/daily
cd ../../
git add ./test_util/wpt
```

<<<<<<< HEAD
所有贡献者都需要在此之后重新运行 `./tools/wpt.ts setup` 命令。

由于升级 WPT 通常需要更新期望以涵盖各种上游更改，因此最好将其作为单独的 PR
进行，而不是作为实施修复或功能的 PR 的一部分。
=======
All contributors will need to rerun `./tools/wpt.ts setup` after this.

Since upgrading WPT usually requires updating the expectations to cover all
sorts of upstream changes, it's best to do that as a separate PR, rather than as
part of a PR that implements a fix or feature.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
