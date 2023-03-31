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
