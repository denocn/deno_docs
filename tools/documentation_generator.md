<<<<<<< HEAD
# 文档生成器
=======
# Documentation Generator
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

使用 `deno doc`
命令，加上一个或多个源文件的文件名，将会打印模块**导出**的每个成员的 JSDoc
文档。

例如，给定一个名为 `add.ts` 的文件，其内容如下：

```ts
/**
 * 对x和y求和。
 * @param {number} x
 * @param {number} y
 * @returns {number} x和y的和。
 */
export function add(x: number, y: number): number {
  return x + y;
}
```

运行 Deno `doc` 命令，会将函数的 JSDoc 注释打印到 `stdout`：

```shell
deno doc add.ts
function add(x: number, y: number): number
  Adds x and y. @param {number} x @param {number} y @returns {number} Sum of x and y
```

使用 `--json` 标志可以以 JSON 格式输出文档。这种 JSON 格式由
[deno doc 网站](https://github.com/denoland/docland) 使用，并用于生成模块文档。
