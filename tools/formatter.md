<<<<<<< HEAD
# 代码格式化器
=======
# Code Formatter
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

Deno 自带一个内置的代码格式化器，可以自动格式化以下文件：

| 文件类型   | 扩展名             |
| ---------- | ------------------ |
| JavaScript | `.js`              |
| TypeScript | `.ts`              |
| JSX        | `.jsx`             |
| TSX        | `.tsx`             |
| Markdown   | `.md`, `.markdown` |
| JSON       | `.json`            |
| JSONC      | `.jsonc`           |

此外，`deno fmt` 还可以格式化 Markdown
文件中的代码片段。代码片段必须用三个反引号框起来，并带有语言属性。

```shell
# 格式化当前目录和子目录中的所有支持的文件
deno fmt
# 格式化指定的文件
deno fmt myfile1.ts myfile2.ts
# 格式化指定目录及其子目录中的所有支持的文件
deno fmt src/
# 检查当前目录和子目录中的所有支持的文件是否已格式化
deno fmt --check
# 格式化标准输入并写入标准输出
cat file.ts | deno fmt -
```

<<<<<<< HEAD
## 忽略代码
=======
## Ignoring Code
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

在 TS/JS/JSONC 中，您可以使用 `// deno-fmt-ignore` 注释来忽略格式化代码：

```ts
// deno-fmt-ignore
export const identity = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
];
```

或者在文件顶部添加一个 `// deno-fmt-ignore-file` 注释来忽略整个文件。

在 Markdown 中，您可以使用 `<!-- deno-fmt-ignore -->` 注释来忽略一个文件，或使用
`<!-- deno-fmt-ignore-file -->` 注释来忽略整个文件。要忽略 Markdown
中的一部分，请使用 `<!-- deno-fmt-ignore-start -->` 和
`<!-- deno-fmt-ignore-end -->` 注释括起来的代码。

<<<<<<< HEAD
## 配置
=======
## Configuration
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

> ℹ️ 建议使用默认选项。

从 Deno v1.14 开始，格式化器可以使用配置文件或遵循 CLI 标志进行自定义：

<<<<<<< HEAD
- `--use-tabs` - 是否使用制表符。默认为 false（使用空格）。

- `--line-width` -
  打印机将尝试保持在其下的行的宽度。请注意，在某些情况下，打印机可能会超过此宽度。默认为
  80。

- `--indent-width` - 缩进的字符数量。默认为 2。

- `--no-semicolons` - 不使用分号，除非必要。

- `--single-quote` - 是否使用单引号。默认为 false（使用双引号）。

- `--prose-wrap={always,never,preserve}` - 定义如何在 Markdown
  文件中包装散文。默认为“always”。

注意：在 Deno 版本 < 1.31 中，您需要在这些标志前添加 `options-` 前缀（例如
`--options-use-tabs`）。
=======
- `--use-tabs` - Whether to use tabs. Defaults to false (using spaces).

- `--line-width` - The width of a line the printer will try to stay under. Note
  that the printer may exceed this width in certain cases. Defaults to 80.

- `--indent-width` - The number of characters for an indent. Defaults to 2.

- `--no-semicolons` - To not use semicolons except where necessary.

- `--single-quote` - Whether to use single quote. Defaults to false (using
  double quote).

- `--prose-wrap={always,never,preserve}` - Define how prose should be wrapped in
  Markdown files. Defaults to "always".

Note: In Deno versions < 1.31 you will have to prefix these flags with
`options-` (ex. `--options-use-tabs`)
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
