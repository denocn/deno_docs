## 导入映射 {#import-maps}

Deno 支持 [导入映射](https://github.com/WICG/import-maps).

你可以在启动时添加`--import-map<FILE>`选项来启用导入映射，或者通过[配置文件](../getting_started/configuration_file.md)的
`importMap`。

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

这会导致以 `/` 开头的标识符会相对于import maps文件的位置或文件路径进行解析
