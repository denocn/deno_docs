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
  deno bench

$ deno run main.ts
Add 2 + 3 = 5

$ deno test
检查文件:///dev/main_test.ts
main_test.ts 执行 1 个测试
addTest ... ok (6ms)

ok | 1 passed | 0 failed (29ms)
```

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
  deno bench
```
