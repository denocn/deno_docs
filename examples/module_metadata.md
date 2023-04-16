<<<<<<< HEAD
# 模块元数据
=======
# Module Metadata
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

## 概念

- [import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta)
<<<<<<< HEAD
  可以提供有关模块上下文的信息。
- 布尔值 [import.meta.main](/api?s=ImportMeta#prop_main) 可以告诉您
  当前模块是否为程序入口点。
- 字符串 [import.meta.url](/api?s=ImportMeta#prop_url) 将为您提供 URL 当前模块的
  URL。
- [import.meta.resolve](/api?s=ImportMeta#prop_resolve) 允许您
  解决相对于当前模块的说明符。如果在启动时提供了导入映射，则此函数将考虑该映射。
- 字符串 [Deno.mainModule](/api?s=Deno.mainModule) 将为您提供模块的 URL
  主模块入口点，即 deno 运行时调用的模块。
=======
  can provide information on the context of the module.
- The boolean [import.meta.main](/api?s=ImportMeta#prop_main) will let you know
  if the current module is the program entry point.
- The string [import.meta.url](/api?s=ImportMeta#prop_url) will give you the URL
  of the current module.
- The [import.meta.resolve](/api?s=ImportMeta#prop_resolve) allows you to
  resolve specifier relative to the current module. This function takes into
  account an import map (if one was provided on startup).
- The string [Deno.mainModule](/api?s=Deno.mainModule) will give you the URL of
  the main module entry point, i.e. the module invoked by the deno runtime.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

## 示例

下面的示例使用两个模块来显示`import.meta.url`，`import.meta.main`和`Deno.mainModule`之间的区别。
在这个例子中， `module_a.ts` 是主模块入口点：

```ts
/**
 * module_b.ts
 */
export function outputB() {
  console.log("Module B's import.meta.url", import.meta.url);
  console.log("Module B's mainModule url", Deno.mainModule);
  console.log(
    "Is module B the main module via import.meta.main?",
    import.meta.main,
  );
}
```

```ts, ignore
/**
 * module_a.ts
 */
import { outputB } from "./module_b.ts";

function outputA() {
  console.log("Module A's import.meta.url", import.meta.url);
  console.log("Module A's mainModule url", Deno.mainModule);
  console.log(
    "Is module A the main module via import.meta.main?",
    import.meta.main,
  );
  console.log("Resolved specifier for ./module_b.ts", import.meta.resolve("./module_b.ts"));
}

outputA();
console.log("");
outputB();
```

如果 `module_a.ts` 位于 `/home/alice/deno`，则
`deno run --allow-read module_a.ts` 的输出如下：

```
Module A's import.meta.url file:///home/alice/deno/module_a.ts
Module A's mainModule url file:///home/alice/deno/module_a.ts
Is module A the main module via import.meta.main? true
Resolved specifier for ./module_b.ts file:///home/alice/deno/module_b.ts

Module B's import.meta.url file:///home/alice/deno/module_b.ts
Module B's mainModule url file:///home/alice/deno/module_a.ts
Is module B the main module via import.meta.main? false
```
