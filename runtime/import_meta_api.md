# `import.meta` API

<<<<<<< HEAD
Deno支持在[`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta)API上进行多种方法：

- `import.meta.url`：返回当前模块的URL。
- `import.meta.main`：返回当前模块是否是程序的入口点。
- `import.meta.resolve`：相对于当前模块解析规范。

## `import.meta.resolve` 示例
=======
Deno supports a number of methods on the
[`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta)
API:

- `import.meta.url`: returns the URL of the current module.
- `import.meta.main`: returns whether the current module is the entry point to
  your program.
- `import.meta.resolve`: resolve specifiers relative to the current module.

## `import.meta.resolve` Example
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
const worker = new Worker(import.meta.resolve("./worker.ts"));
```

<<<<<<< HEAD
`import.meta.resolve`API考虑了当前应用的导入映射，这使您能够解析“裸”规范。

有了这样的导入映射加载项...
=======
The `import.meta.resolve` API takes into account the currently applied import
map, which gives you the ability to resolve "bare" specifiers as well.

With such import map loaded...
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```json
{
  "imports": {
    "fresh": "https://deno.land/x/fresh@1.0.1/dev.ts"
  }
}
```

<<<<<<< HEAD
... 你现在可以解析：
=======
...you can now resolve:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```js
// resolve.js
console.log(import.meta.resolve("fresh"));
```

```sh
$ deno run resolve.js
https://deno.land/x/fresh@1.0.1/dev.ts
```
<<<<<<< HEAD

​
=======
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
