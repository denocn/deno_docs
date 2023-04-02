<<<<<<< HEAD
# package.json 兼容性

Deno 支持基于当前或祖先目录中的 `package.json` 文件来解析依赖项。这类似于
Node.js 解析依赖项的方式。我们建议使用 import maps 和
`deno.json`，可在[这里](../basics/import_maps.md)找到相关介绍。
=======
# package.json compatibility

Deno supports resolving dependencies based on a `package.json` file in the
current or ancestor directories. This is similar to how Node.js resolves
dependencies. We recommend using import maps with `deno.json` which is explained
[here](../basics/import_maps.md).
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

**package.json**

```json
{
  "name": "@deno/my-example-project",
<<<<<<< HEAD
  "description": "使用 Deno 创建的示例应用",
=======
  "description": "An example app created with Deno",
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
  "type": "module",
  "scripts": {
    "dev": "deno run --allow-env --allow-sys main.ts"
  },
  "dependencies": {
    "chalk": "^5.2"
  }
}
```

**main.ts**

```ts, ignore
import chalk from "chalk";

<<<<<<< HEAD
console.log(chalk.green("来自 Deno 的问候！"));
```

然后我们可以运行这个脚本：

```shell, ignore
> deno run --allow-env --allow-sys main.ts
来自 Deno 的问候！
```

或者通过 `deno task` 运行 package.json 中的脚本：

```shell, ignore
> deno task dev
来自 Deno 的问候！
=======
console.log(chalk.green("Hello from Deno!"));
```

Then we can run this script:

```shell, ignore
> deno run --allow-env --allow-sys main.ts
Hello from Deno!
```

Or also execute package.json scripts via `deno task`:

```shell, ignore
> deno task dev
Hello from Deno!
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
```
