<<<<<<< HEAD
# 测试覆盖率

如果在启动 `deno test` 时指定 `--coverage` 标志，Deno
将为您的代码收集测试覆盖信息，并存储在一个目录中。

此覆盖信息是直接从 JavaScript 引擎 (V8) 中获取的，非常准确。

然后，通过 `deno coverage` 工具，可以将其进一步处理为众所周知的格式。

> ⚠️
> 为确保一致的覆盖率结果，请确保在运行测试后立即处理覆盖数据。否则，源代码和收集的覆盖数据可能会失步，并意外显示未覆盖的行。

```bash
# 进入项目工作目录
git clone https://github.com/oakserver/oak && cd oak

# 使用 deno test --coverage=<output_directory> 收集覆盖率概要
deno test --coverage=cov_profile

# 然后你可以得到未覆盖行的漂亮打印的差异
deno coverage cov_profile

# 或生成 lcov 报告
deno coverage cov_profile --lcov --output=cov_profile.lcov

# 然后，可以进一步使用 genhtml 等工具处理
genhtml -o cov_profile/html cov_profile.lcov
```

默认情况下，`deno coverage` 将排除与正则表达式
`test\.(ts|tsx|mts|js|mjs|jsx|cjs|cts)` 匹配的文件，并仅考虑包含符合正则表达式
`^file:` 的模块指定符 - 即，远程文件将被排除在覆盖率报告之外。

这些过滤器可以使用 `--exclude` 和 `--include` 标志进行覆盖。模块指定符必须
_匹配_ 包含正则表达式，并且 _不匹配_ 排除表达式，才能成为报告的一部分。
=======
# Test Coverage

Deno will collect test coverage into a directory for your code if you specify
the `--coverage` flag when starting `deno test`.

This coverage information is acquired directly from the JavaScript engine (V8)
which is very accurate.

This can then be further processed from the internal format into well known
formats by the `deno coverage` tool.

> ⚠️ To ensure consistent coverage results, make sure to process coverage data
> immediately after running tests. Otherwise source code and collected coverage
> data might get out of sync and unexpectedly show uncovered lines.

```bash
# Go into your project's working directory
git clone https://github.com/oakserver/oak && cd oak

# Collect your coverage profile with deno test --coverage=<output_directory>
deno test --coverage=cov_profile

# From this you can get a pretty printed diff of uncovered lines
deno coverage cov_profile

# Or generate an lcov report
deno coverage cov_profile --lcov --output=cov_profile.lcov

# Which can then be further processed by tools like genhtml
genhtml -o cov_profile/html cov_profile.lcov
```

By default, `deno coverage` will exclude any files matching the regular
expression `test\.(ts|tsx|mts|js|mjs|jsx|cjs|cts)` and only consider including
specifiers matching the regular expression `^file:` - ie. remote files will be
excluded from coverage report.

These filters can be overridden using the `--exclude` and `--include` flags. A
module specifier must _match_ the include_regular expression and _not match_ the
exclude_ expression for it to be a part of the report.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
