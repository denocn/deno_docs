<<<<<<< HEAD:linking_to_external_code/import_maps.md
## 导入映射 {#import-maps}
=======
# Import Maps
>>>>>>> 2d6f924b853c8d0668a46367553894967aa615c1:basics/modules/import_maps.md

Deno 支持 [导入映射](https://github.com/WICG/import-maps).

<<<<<<< HEAD:linking_to_external_code/import_maps.md
你可以在启动时添加`--import-map<FILE>`选项来启用导入映射，或者通过[配置文件](../getting_started/configuration_file.md)的
`importMap`。
=======
You can use import maps with the `--import-map=<FILE>` CLI flag or `importMap`
option in the [configuration file](../../getting_started/configuration_file.md),
the former will take precedence.
>>>>>>> 2d6f924b853c8d0668a46367553894967aa615c1:basics/modules/import_maps.md

示例:

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

运行：

```shell
$ deno run --import-map=import_map.json color.ts
```

为绝对导入使用起始目录：

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

<<<<<<< HEAD:linking_to_external_code/import_maps.md
这会导致以 `/` 开头的标识符会相对于import maps文件的位置或文件路径进行解析
=======
This causes import specifiers starting with `/` to be resolved relative to the
import map's URL or file path.

## Import Maps are for Applications

It is important to note that import map configuration files are
[only applied for Deno applications][scope], not in the various libraries that
your application code may import. This lets you, the application author, have
final say about what versions of libraries get included in your project.

If you are developing a library, you should instead prefer to use the `deps.ts`
pattern discussed in [Managing Dependencies].

[scope]: https://github.com/WICG/import-maps#scope
[Managing Dependencies]: ../../examples/manage_dependencies.md
>>>>>>> 2d6f924b853c8d0668a46367553894967aa615c1:basics/modules/import_maps.md
