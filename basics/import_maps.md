# 导入映射

为了让 Deno 解析像 `"react"` 或者 `"lodash"` 这样的 _裸规范_ (bare
specifier)，它需要知道在哪里查找它。 `"lodash"` 是指向一个 npm
模块还是映射到一个 https URL？

```ts, ignore
import lodash from "lodash";
```

Node 和 npm 使用 `package.json` 和 `node_modules` 文件夹来进行解析。相反，Deno
使用 [import map](https://github.com/WICG/import-maps) 标准。

要让上面的 `import lodash from "lodash"` 正常工作，需要将以下内容添加到
[`deno.json` 配置文件](../getting_started/configuration_file.md) 中：

```json
{
  "imports": {
    "lodash": "https://esm.sh/lodash@4.17.21"
  }
}
```

`deno.json`
文件是自动发现的，可以作为导入映射的一部分使用。[在这里阅读有关 `deno.json` 的更多信息](../getting_started/configuration_file.md)。

npm 规范器也是可以的。作为替代，我们也可以在 `deno.json`
配置文件中编写类似以下的内容：

```json
{
  "imports": {
    "lodash": "npm:lodash@^4.17"
  }
}
```

## 示例 - 通过 `fmt/` 导入 deno_std 的 fmt 模块

**import_map.json**

```json
{
  "imports": {
    "fmt/": "https://deno.land/std@$STD_VERSION/fmt/"
  }
}
```

**color.ts**

```ts, ignore
import { red } from "fmt/colors.ts";

console.log(red("hello world"));
```

## 示例 - 使用项目根目录进行绝对导入

要使用项目根目录进行绝对导入：

**import_map.json**

```jsonc
{
  "imports": {
    "/": "./",
    "./": "./"
  }
}
```

**main.ts**

```ts, ignore
import { MyUtil } from "/util.ts";
```

这将导致以 `/` 开头的导入规范符相对于导入映射的 URL 或文件路径进行解析。

## 覆盖导入

导入映射非常有用的另一种情况是覆盖特定模块中的导入。

假设你要把所有导入的模块中的 deno_std 导入从 0.177.0 覆盖到最新版本，但是对于
`https://deno.land/x/example` 模块，你想使用本地 `patched`
目录中的文件。你可以使用一个作用域在导入映射中实现这个效果，像这样：

```json
{
  "imports": {
    "https://deno.land/std@0.177.0/": "https://deno.land/std@$STD_VERSION/"
  },
  "scopes": {
    "https://deno.land/x/example": {
      "https://deno.land/std@0.177.0/": "./patched/"
    }
  }
}
```

## 导入映射适用于应用程序

需要注意的是，导入映射配置文件仅适用于 Deno
应用程序][scope]，而不适用于您的应用程序代码所引用的各种库。这使得您作为应用程序作者可以决定在您的项目中包含哪些库的最终版本。

如果您正在开发一个库，应该优先使用在 [管理依赖项] 中讨论的 `deps.ts` 模式。

[scope]：https://github.com/WICG/import-maps#scope
[管理依赖项]：../examples/manage_dependencies.md
