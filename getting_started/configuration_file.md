# 配置文件

Deno 支持配置文件，可以自定义内置的 TypeScript
编译器、格式化程序和代码检查工具。

配置文件支持 `.json` 和 `.jsonc`
扩展名。[从 v1.18 开始](https://deno.com/blog/v1.18#auto-discovery-of-the-config-file)，如果在当前工作目录或其父目录下存在
`deno.json` 或 `deno.jsonc` 配置文件，则 Deno 将自动检测该文件。可以使用
`--config` 标志来指定其他配置文件。

> ⚠️ 在 Deno v1.23 之前，需要提供显式的 `--config` 标志。

## `imports` 和 `scopes`

从版本 1.30 开始，`deno.json` 配置文件作为 [导入映射](../basics/import_maps.md)
解析裸模块。

```jsonc
{
  "imports": {
    "std/": "https://deno.land/std@$STD_VERSION/"
  },
  "tasks": {
    "dev": "deno run --watch main.ts"
  }
}
```

有关导入映射的更多信息，请参见 [导入映射部分](../basics/import_maps.md)。

然后，脚本可以使用裸模块 `std`：

```js, ignore
import { assertEquals } from "std/testing/assert.ts";

assertEquals(1, 2);
```

顶层 `deno.json` 选项 `importMap` 以及 `--importmap`
标志可用于在其他文件中指定导入映射。

## `tasks`

类似于 `package.json` 中的 `scripts` 字段。本质上是为命令行调用提供的快捷方式。

```json
{
  "tasks": {
    "start": "deno run -A --watch=static/,routes/,data/ dev.ts"
  }
}
```

使用 `deno task start`
将运行该命令。另请参见[`deno task`](../tools/task_runner.md)。

## `lint`

[`deno lint`](../tools/linter.md) 的配置。

```json
{
  "lint": {
    "files": {
      "include": ["src/"],
      "exclude": ["src/testdata/"]
    },
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  }
}
```

## `fmt`

[`deno fmt`](../tools/formatter.md) 的配置。

```json
{
  "fmt": {
    "files": {
      "include": ["src/"],
      "exclude": ["src/testdata/"]
    },
    "options": {
      "useTabs": true,
      "lineWidth": 80,
      "indentWidth": 4,
      "singleQuote": true,
      "proseWrap": "preserve"
    }
  }
}
```

## `lock`

用于指定锁定文件的不同文件名。默认情况下，Deno 将使用 `deno.lock`
并将其放置在配置文件旁边。

## `compilerOptions`

`deno.json` 也可以作为 TypeScript
配置文件，并支持[大多数 TS 编译器选项](https://www.typescriptlang.org/tsconfig)。

Deno 鼓励用户使用默认的 TypeScript 配置以帮助共享代码。

另请参见 [在 Deno 中配置 TypeScript](../advanced/typescript/configuration.md)。

## 完整示例

```json
{
  "compilerOptions": {
    "allowJs": true,
    "lib": ["deno.window"],
    "strict": true
  },
  "lint": {
    "files": {
      "include": ["src/"],
      "exclude": ["src/testdata/"]
    },
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },
  "fmt": {
    "files": {
      "include": ["src/"],
      "exclude": ["src/testdata/"]
    },
    "options": {
      "useTabs": true,
      "lineWidth": 80,
      "indentWidth": 4,
      "semiColons": false,
      "singleQuote": true,
      "proseWrap": "preserve"
    }
  },
  "test": {
    "files": {
      "include": ["src/"],
      "exclude": ["src/testdata/"]
    }
  }
}
```

## JSON 模式

编辑器可用的 JSON
模式文件提供自动完成。该文件是有版本的，可以在以下位置找到：https://deno.land/x/deno/cli/schemas/config-file.v1.json
