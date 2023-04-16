<<<<<<< HEAD
# 导入映射

为了让 Deno 解析像 `"react"` 或者 `"lodash"` 这样的 _裸规范_ (bare
specifier)，它需要知道在哪里查找它。 `"lodash"` 是指向一个 npm
模块还是映射到一个 https URL？
=======
# Import Maps

In order for Deno to resolve a _bare specifier_ like `"react"` or `"lodash"`, it
needs to be told where to look for it. Does `"lodash"` refer to an npm module or
does it map to an https URL?
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```ts, ignore
import lodash from "lodash";
```

<<<<<<< HEAD
Node 和 npm 使用 `package.json` 和 `node_modules` 文件夹来进行解析。相反，Deno
使用 [import map](https://github.com/WICG/import-maps) 标准。

要让上面的 `import lodash from "lodash"` 正常工作，需要将以下内容添加到
[`deno.json` 配置文件](../getting_started/configuration_file.md) 中：
=======
Node and npm use `package.json` and the `node_modules` folder to do this
resolution. Deno, on the other hand, uses the
[import map](https://github.com/WICG/import-maps) standard.

To make the above `import lodash from "lodash"` work, add the following to the
[`deno.json` configuration file](../getting_started/configuration_file.md).
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```json
{
  "imports": {
    "lodash": "https://esm.sh/lodash@4.17.21"
  }
}
```

<<<<<<< HEAD
`deno.json`
文件是自动发现的，可以作为导入映射的一部分使用。[在这里阅读有关 `deno.json` 的更多信息](../getting_started/configuration_file.md)。

npm 规范器也是可以的。作为替代，我们也可以在 `deno.json`
配置文件中编写类似以下的内容：
=======
The `deno.json` file is auto-discovered and acts (among other things) as an
import map.
[Read more about `deno.json` here](../getting_started/configuration_file.md).

This also works with npm specifiers. Instead of the above, we could have also
written something similar in our `deno.json` configuration file:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```json
{
  "imports": {
    "lodash": "npm:lodash@^4.17"
  }
}
```

<<<<<<< HEAD
## 示例 - 通过 `fmt/` 导入 deno_std 的 fmt 模块
=======
## Example - Using deno_std's fmt module via `fmt/`
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

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

<<<<<<< HEAD
## 示例 - 使用项目根目录进行绝对导入

要使用项目根目录进行绝对导入：
=======
## Example - Using project root for absolute imports

To use your project root for absolute imports:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

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

<<<<<<< HEAD
这将导致以 `/` 开头的导入规范符相对于导入映射的 URL 或文件路径进行解析。

## 覆盖导入

导入映射非常有用的另一种情况是覆盖特定模块中的导入。

假设你要把所有导入的模块中的 deno_std 导入从 0.177.0 覆盖到最新版本，但是对于
`https://deno.land/x/example` 模块，你想使用本地 `patched`
目录中的文件。你可以使用一个作用域在导入映射中实现这个效果，像这样：
=======
This causes import specifiers starting with `/` to be resolved relative to the
import map's URL or file path.

## Overriding imports

The other situation where import maps can be very useful is to override imports
in specific modules.

Let's say you want to override the deno_std import from 0.177.0 to the latest in
all of your imported modules, but for the `https://deno.land/x/example/` module
you want to use files in a local `patched` directory. You can do this by using a
scope in the import map that looks something like this:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```json
{
  "imports": {
    "https://deno.land/std@0.177.0/": "https://deno.land/std@$STD_VERSION/"
  },
  "scopes": {
<<<<<<< HEAD
    "https://deno.land/x/example": {
=======
    "https://deno.land/x/example/": {
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
      "https://deno.land/std@0.177.0/": "./patched/"
    }
  }
}
```

<<<<<<< HEAD
## 导入映射适用于应用程序

需要注意的是，导入映射配置文件仅适用于 Deno
应用程序][scope]，而不适用于您的应用程序代码所引用的各种库。这使得您作为应用程序作者可以决定在您的项目中包含哪些库的最终版本。

如果您正在开发一个库，应该优先使用在 [管理依赖项] 中讨论的 `deps.ts` 模式。

[scope]：https://github.com/WICG/import-maps#scope
[管理依赖项]：../examples/manage_dependencies.md
=======
## Import Maps are for Applications

It is important to note that import map configuration files are
[only applied for Deno applications][scope], not in the various libraries that
your application code may import. This lets you, the application author, have
final say about what versions of libraries get included in your project.

If you are developing a library, you should instead prefer to use the `deps.ts`
pattern discussed in [Managing Dependencies].

[scope]: https://github.com/WICG/import-maps#scope
[Managing Dependencies]: ../examples/manage_dependencies.md
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
