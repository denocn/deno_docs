<<<<<<< HEAD
# 开始一个新的项目

使用 Deno
开始一个新项目一直非常简单：你只需要一个单独的文件就可以开始了。无需任何配置文件、依赖清单或者构建脚本。

来自其他生态系统的用户通常不习惯这种简单性——他们经常寻找一个工具来生成一个基本的项目结构，并使他们在正确的方向上开始。`deno init`
子命令创建了一个基本的 Deno 项目脚手架。

```sh
$ deno init
✅ 项目已初始化
运行以下命令来开始

  // 运行程序
  deno run main.ts

  // 运行程序并监视文件更改
  deno task dev

  // 运行测试
  deno test

  // 运行基准测试
=======
# Starting a new project

Starting a new project with Deno has always been incredibly simple: you just
need a single file to get going. No need for any configuration files, dependency
manifests, or build scripts.

Users coming from other ecosystems are often not used to this simplicity - they
often look for a tool to scaffold out a basic project structure to get them
started on the right path. `deno init` subcommand scaffolds a basic Deno
project.

```sh
$ deno init
✅ Project initialized
Run these commands to get started

  // Run the program
  deno run main.ts

  // Run the program and watch for file changes
  deno task dev

  // Run the tests
  deno test

  // Run the benchmarks
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
  deno bench

$ deno run main.ts
Add 2 + 3 = 5

$ deno test
<<<<<<< HEAD
检查文件:///dev/main_test.ts
main_test.ts 执行 1 个测试
=======
Check file:///dev/main_test.ts
running 1 test from main_test.ts
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
addTest ... ok (6ms)

ok | 1 passed | 0 failed (29ms)
```

<<<<<<< HEAD
这个子命令会创建两个文件(`main.ts`和 `main_test.ts`)。这些文件提供了一个编写
Deno 程序和编写测试的基本示例。`main.ts` 文件导出一个 `add`
函数，它将两个数字相加，而 `main_test.ts` 文件包含此函数的一个测试。

你也可以给 `deno init` 指定一个参数来在特定目录中初始化一个项目：

```sh
$ deno init my_deno_project
✅ 项目已初始化

运行以下命令来开始

  cd my_deno_project

  // 运行程序
  deno run main.ts

  // 运行程序并监视文件更改
  deno task dev

  // 运行测试
  deno test

  // 运行基准测试
=======
This subcommand will create two files (`main.ts` and `main_test.ts`). These
files provide a basic example of how to write a Deno program and how to write
tests for it. The `main.ts` file exports a `add` function that adds two numbers
together and the `main_test.ts` file contains a test for this function.

You can also specify an argument to `deno init` to initialize a project in a
specific directory:

```sh
$ deno init my_deno_project
✅ Project initialized

Run these commands to get started

  cd my_deno_project

  // Run the program
  deno run main.ts

  // Run the program and watch for file changes
  deno task dev

  // Run the tests
  deno test

  // Run the benchmarks
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
  deno bench
```
