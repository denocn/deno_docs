<<<<<<< HEAD
# 持续集成

Deno
的内置工具使得为项目设置持续集成（CI）流水线变得轻而易举。您可以使用相应的命令
`deno test`、`deno lint` 和 `deno fmt`
来测试、检查代码格式以及源代码风格。此外，您还可以使用管道中的 `deno coverage`
生成代码覆盖率报告。

本页面将讨论：

- [如何设置基本管道](#setting-up-a-basic-pipeline)
- [跨平台工作流程](#cross-platform-workflows)
- [加速 Deno 管道](#speeding-up-deno-pipelines)
  - [减少重复工作](#reducing-repetition)
  - [缓存依赖项](#caching-dependencies)

## 如何设置基本管道

本页面将显示如何在 GitHub Actions 中为 Deno
项目设置基本的管道。解释本页中的概念通常也适用于其他 CI 提供商，例如 Azure
Pipelines、CircleCI 或 GitLab。

通常，为 Deno 构建管道始于检查存储库并安装 Deno：
=======
# Continuous Integration

Deno's built-in tools make it easy to set up Continuous Integration (CI)
pipelines for your projects. Testing, linting and formatting of code can all be
done with the corresponding commands `deno test`, `deno lint` and `deno fmt`. In
addition, you can generate code coverage reports from test results with
`deno coverage` in pipelines.

On this page we will discuss:

- [Setting up a basic pipeline](#setting-up-a-basic-pipeline)
- [Cross-platform workflows](#cross-platform-workflows)
- [Speeding up Deno pipelines](#speeding-up-deno-pipelines)
  - [Reducing repetition](#reducing-repetition)
  - [Caching dependencies](#caching-dependencies)

## Setting up a basic pipeline

This page will show you how to set up basic pipelines for Deno projects in
GitHub Actions. The concepts explained on this page largely apply to other CI
providers as well, such as Azure Pipelines, CircleCI or GitLab.

Building a pipeline for Deno generally starts with checking out the repository
and installing Deno:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```yaml
name: Build

on: push

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v3
      - uses: denoland/setup-deno@v1.1.1
        with:
<<<<<<< HEAD
          deno-version: v1.x # 使用最新稳定版 Deno 运行。
```

要扩展工作流程，只需添加所需的任何 `deno` 子命令：

```yaml
      # 检查代码是否符合 Deno 的默认格式规范。
      - run: deno fmt --check

      # 扫描代码以查找语法错误和格式问题。如果您想使用自定义的 linter 配置，可以使用 --config <myconfig> 添加配置文件。
      - run: deno lint

      # 运行存储库中的所有测试文件并收集代码覆盖率。此示例运行时具有所有权限，但建议使用程序所需的最少权限运行（例如 --allow-read）。
      - run: deno test --allow-all --coverage=cov/

      # 这会从 `deno test --coverage` 中收集的覆盖收集报告。它以 .lcov 文件的形式存储，与 Codecov、Coveralls 和 Travis CI 等服务集成良好。
      - run: deno coverage --lcov cov/ > cov.lcov
```

## 跨平台工作流程

作为一个 Deno
模块维护者，您可能希望知道您的代码在当今使用的所有主要操作系统上都能正常工作：Linux、MacOS
和
Windows。可以通过运行并行作业的矩阵，每个矩阵执行不同操作系统的构建来实现跨平台的工作流程：
=======
          deno-version: v1.x # Run with latest stable Deno.
```

To expand the workflow just add any of the `deno` subcommands that you might
need:

```yaml
      # Check if the code is formatted according to Deno's default
      # formatting conventions.
      - run: deno fmt --check

      # Scan the code for syntax errors and style issues. If
      # you want to use a custom linter configuration you can add a configuration file with --config <myconfig>
      - run: deno lint

      # Run all test files in the repository and collect code coverage. The example
      # runs with all permissions, but it is recommended to run with the minimal permissions your program needs (for example --allow-read).
      - run: deno test --allow-all --coverage=cov/

      # This generates a report from the collected coverage in `deno test --coverage`. It is
      # stored as a .lcov file which integrates well with services such as Codecov, Coveralls and Travis CI.
      - run: deno coverage --lcov cov/ > cov.lcov
```

## Cross-platform workflows

As a Deno module maintainer, you probably want to know that your code works on
all of the major operating systems in use today: Linux, MacOS and Windows. A
cross-platform workflow can be achieved by running a matrix of parallel jobs,
each one running the build on a different OS:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```yaml
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ ubuntu-22.04, macos-12, windows-2022 ]
    steps:
      - run: deno test --allow-all --coverage cov/
```

<<<<<<< HEAD
> 注意：GitHub Actions
> 存在已知问题（https://github.com/actions/checkout/issues/135），在处理 Windows
> 风格的行尾符（CRLF）时可能会出现问题。当在运行在 `Windows`
> 上的作业流水线中运行 `deno fmt` 时可能会出现问题。要解决此问题，请在运行
> `actions/checkout@v3` 步骤之前，将 Actions 运行程序配置为使用 Linux
> 风格的行尾符：
=======
> Note: GitHub Actions has a known
> [issue](https://github.com/actions/checkout/issues/135) with handling
> Windows-style line endings (CRLF). This may cause issues when running
> `deno fmt` in a pipeline with jobs that run on `windows`. To prevent this,
> configure the Actions runner to use Linux-style line endings before running
> the `actions/checkout@v3` step:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
>
> ```
> git config --system core.autocrlf false
> git config --system core.eol lf
> ```

<<<<<<< HEAD
如果您使用实验性或不稳定的 Deno API，您可以包括一个运行 Deno canary
版本的矩阵工作。这可以帮助尽早发现错误更改：
=======
If you are working with experimental or unstable Deno APIs, you can include a
matrix job running the canary version of Deno. This can help to spot breaking
changes early on:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```yaml
jobs:
  build:
    runs-on: ${{ matrix.os }}
<<<<<<< HEAD
    continue-on-error: ${{ matrix.canary }} # Continues execution if the canary run does not succeed
=======
    continue-on-error: ${{ matrix.canary }} # Continue in case the canary run does not succeed
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
    strategy:
      matrix:
        os: [ ubuntu-22.04, macos-12, windows-2022 ]
        deno-version: [ v1.x ]
        canary: [ false ]
        include: 
          - deno-version: canary
            os: ubuntu-22.04
            canary: true
```

## Speeding up Deno pipelines

<<<<<<< HEAD
### 减少重复操作

在跨平台的运行时，一些流程步骤不需要针对每个操作系统都运行。例如，在
Linux、MacOS 和 Windows
上生成相同的测试覆盖率报告有些冗余。在这种情况下，可以使用 GitHub Actions 中的
`if` 条件关键词。以下示例演示了如何仅在
`ubuntu`（Linux）运行器上运行代码覆盖率生成和上传步骤：
=======
### Reducing repetition

In cross-platform runs, certain steps of a pipeline do not need to run for each
OS necessarily. For example, generating the same test coverage report on Linux,
MacOS and Windows is a bit redundant. You can use the `if` conditional keyword
of GitHub Actions in these cases. The example below shows how to run code
coverage generation and upload steps only on the `ubuntu` (Linux) runner:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```yaml
- name: Generate coverage report
  if: matrix.os == 'ubuntu-22.04'
  run: deno coverage --lcov cov > cov.lcov

- name: Upload coverage to Coveralls.io
  if: matrix.os == 'ubuntu-22.04'
  # Any code coverage service can be used, Coveralls.io is used here as an example.
  uses: coverallsapp/github-action@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }} # Generated by GitHub.
    path-to-lcov: cov.lcov
```

<<<<<<< HEAD
### 缓存依赖项

随着项目的规模增大，包含的依赖项越来越多。Deno
在测试期间会下载这些依赖项，如果该工作流每天运行多次，这可能会耗费很长时间。常见的解决方案是缓存依赖项，以便无需重新下载。

[Deno 将依赖项存储在本地缓存目录中](https://deno.land/manual/linking_to_external_code)。在流程中，可以通过设置
`DENO_DIR` 环境变量和添加缓存步骤来保留缓存：
=======
### Caching dependencies

As a project grows in size, more and more dependencies tend to be included. Deno
will download these dependencies during testing and if a workflow is run many
times a day, this can become a time-consuming process. A common solution to
speed things up is to cache dependencies so that they do not need to be
downloaded anew.

[Deno stores dependencies locally in a cache directory](https://deno.land/manual/linking_to_external_code).
In a pipeline the cache can be preserved between workflows by setting the
`DENO_DIR` environment variable and adding a caching step to the workflow:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```yaml
# Set DENO_DIR to an absolute or relative path on the runner.
env:
  DENO_DIR: my_cache_directory

steps:
  - name: Cache Deno dependencies 
    uses: actions/cache@v2
    with:
      path: ${{ env.DENO_DIR }}
      key: my_cache_key
```

<<<<<<< HEAD
首先，当该工作流运行时，缓存仍然为空，`deno test`
等命令仍然必须下载依赖项，但当作业成功时，`DENO_DIR`
的内容将被保存，并且任何后续运行都可以从缓存中恢复，而无需重新下载。

上面的工作流仍然存在一个问题：目前缓存键的名称硬编码为
`my_cache_key`，这会导致每次都会恢复相同的缓存，即使其中一个或多个依赖项已更新也是如此。这可能会导致管道中使用旧版本，而您已经更新了某些依赖项。解决方案是在每次需要更新缓存时生成一个不同的键，这可以通过使用锁定文件和使用
GitHub Actions 提供的 `hashFiles` 函数来实现：
=======
At first, when this workflow runs the cache is still empty and commands like
`deno test` will still have to download dependencies, but when the job succeeds
the contents of `DENO_DIR` are saved and any subsequent runs can restore them
from cache instead of re-downloading.

There is still an issue in the workflow above: at the moment the name of the
cache key is hardcoded to `my_cache_key`, which is going to restore the same
cache every time, even if one or more dependencies are updated. This can lead to
older versions being used in the pipeline even though you have updated some
dependencies. The solution is to generate a different key each time the cache
needs to be updated, which can be achieved by using a lockfile and by using the
`hashFiles` function provided by GitHub Actions:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```yaml
key: ${{ hashFiles('deno.lock') }}
```

<<<<<<< HEAD
为使其工作，您还需要在 Deno
项目中拥有锁定文件，详细信息请参见[此处](../basics/modules/integrity_checking.md)。现在，如果更改
`deno.lock` 的内容，将制作一个新的缓存，并在此后的所有流程运行中使用它。

为演示进行增量操作，假设您的项目使用 `deno.land/std` 中的记录器：
=======
To make this work you will also need a have a lockfile in your Deno project,
which is discussed in detail [here](../basics/modules/integrity_checking.md).
Now, if the contents of `deno.lock` are changed, a new cache will be made and
used in subsequent pipeline runs thereafter.

To demonstrate, let's say you have a project that uses the logger from
`deno.land/std`:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
import * as log from "https://deno.land/std@$STD_VERSION/log/mod.ts";
```

<<<<<<< HEAD
要升级此版本，可以更新 `import` 语句，然后在本地重新加载缓存并更新锁定文件：
=======
In order to increment this version, you can update the `import` statement and
then reload the cache and update the lockfile locally:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```
deno cache --reload --lock=deno.lock --lock-write deps.ts
```

<<<<<<< HEAD
运行此命令后，应看到锁定文件的内容发生变化。当这被提交并通过管道运行时，您应该看到
`hashFiles` 函数保存了一个新缓存，并在随后的所有运行中使用它。

#### 清除缓存

偶尔可能会遇到已损坏或格式不正确的缓存，这可能由于各种原因而发生。可以从 GitHub
Actions UI
中清除缓存，或者可以简单地更改缓存键的名称。一种实用的方法是将变量添加到缓存键名称中，该变量可以作为
GitHub 机密存储，并且如果需要新的缓存，则可以更改该变量：
=======
You should see changes in the lockfile's contents after running this. When this
is committed and run through the pipeline, you should then see the `hashFiles`
function saving a new cache and using it in any runs that follow.

#### Clearing the cache

Occasionally you may run into a cache that has been corrupted or malformed,
which can happen for various reasons. It is possible to clear a cache from the
GitHub Actions UI, or you can simply change the name of the cache key. A
practical way of doing so without having to forcefully change your lockfile is
to add a variable to the cache key name, which can be stored as a GitHub secret
and can be changed if a new cache is needed:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```yaml
key: ${{ secrets.CACHE_VERSION }}-${{ hashFiles('deno.lock') }}
```
