## Workers {#workers}

Deno 支持
[`Web Worker API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker).

Worker 可以在多个线程中运行代码，`Worker` 的每个实例都会在单独的线程中运行，这个线程专属于 worker。

目前，Deno 只支持 `module` 类型的 worker，因此在创建新的 worker 时必须传递 `type: "module"` 选项。

Workers currently do not work in [compiled executables](../tools/compiler.md).

Use of relative module specifiers in the main worker are only supported with
`--location <href>` passed on the CLI. This is not recommended for portability.
You can instead use the `URL` constructor and `import.meta.url` to easily create
a specifier for some nearby script. Dedicated workers, however, have a location
and this capability by default.

```ts
// Good
new Worker(new URL("./worker.js", import.meta.url).href, { type: "module" });

// Bad
new Worker(new URL("./worker.js", import.meta.url).href);
new Worker(new URL("./worker.js", import.meta.url).href, { type: "classic" });
new Worker("./worker.js", { type: "module" });
```

As with regular modules, you can use top-level `await` in worker modules.
However, you should be careful to always register the message handler before the
first `await`, since messages can be lost otherwise. This is not a bug in Deno,
it's just an unfortunate interaction of features, and it also happens in all
browsers that support module workers.

```ts, ignore
import { delay } from "https://deno.land/std@0.136.0/async/mod.ts";

// First await: waits for a second, then continues running the module.
await delay(1000);

// The message handler is only set after that 1s delay, so some of the messages
// that reached the worker during that second might have been fired when no
// handler was registered.
self.onmessage = (evt) => {
  console.log(evt.data);
};
```

### Instantiation permissions

创建一个新的 `Worker` 实例的行为与动态导入类似，因此 Deno 需要适当的权限来做这个操作。

对于使用本地模块的 worker，Deno 需要读取 (`--allow-read`) 权限：

**main.ts**

```ts
new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });
```

**worker.ts**

```ts
console.log("hello world");
self.close();
```

```shell
$ deno run main.ts
error: Uncaught PermissionDenied: read access to "./worker.ts", run again with the --allow-read flag

$ deno run --allow-read main.ts
hello world
```

对于使用远程模块的 worker，Deno 需要网络 (`--allow-net`) 权限：

**main.ts**

```ts
new Worker("https://example.com/worker.ts", { type: "module" });
```

**worker.ts** (at https[]()://example.com/worker.ts)

```ts
console.log("hello world");
self.close();
```

```shell
$ deno run main.ts
error: Uncaught PermissionDenied: net access to "https://example.com/worker.ts", run again with the --allow-net flag

$ deno run --allow-net main.ts
hello world
```

### 在 Worker 中使用 Deno {#using-deno-in-worker}

> Starting in v1.22 the `Deno` namespace is available in worker scope by
> default. To enable the namespace in earlier versions pass
> `deno: { namespace: true }` when creating a new worker.

**main.js**

```js
const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
});

worker.postMessage({ filename: "./log.txt" });
```

**worker.js**

```js, ignore
self.onmessage = async (e) => {
  const { filename } = e.data;
  const text = await Deno.readTextFile(filename);
  console.log(text);
  self.close();
};
```

**log.txt**

```
hello world
```

```shell
$ deno run --allow-read main.js
hello world
```

> Starting in v1.23 `Deno.exit()` no longer exits the process with the provided
> exit code. Instead is an alias to `self.close()`, which causes only the worker
> to shutdown. This better aligns with the Web platform, as there is no way in
> the browser for a worker to close the page.

### Specifying worker permissions

> 这是一个不稳定的 Deno 特性。更多信息请查阅 [不稳定特性](./stability.md)

Worker 可用的权限类似于 CLI 权限标志，这意味着在那里启用的每个权限都可以在 Worker API
层面上被禁用。你可以在[这里](../getting_started/permissions.md)找到每个权限选项更详细的描述。

默认情况下，worker 将从其创建的线程中继承权限，但为了允许用户限制该 worker 的访问，我们在 worker API 中提供了
`deno.permissions` 选项。

- 对于支持更细访问的权限，你可以传入 worker 访问的所需资源的列表，对于只有 on/off 选项的 worker，你可以分别传入 true/false。

  ```ts
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      permissions: {
        net: [
          "https://deno.land/",
        ],
        read: [
          new URL("./file_1.txt", import.meta.url),
          new URL("./file_2.txt", import.meta.url),
        ],
        write: false,
      },
    },
  });
  ```

- 更细的访问权限可接收绝对和相对路由作为参数，但要考虑到，相对路由将相对于 worker 实例化的文件进行解析，而不是 worker 文件当前所在的路径。

  ```ts
  const worker = new Worker(
    new URL("./worker/worker.js", import.meta.url).href,
    {
      type: "module",
      deno: {
        permissions: {
          read: [
            "/home/user/Documents/deno/worker/file_1.txt",
            "./worker/file_2.txt",
          ],
        },
      },
    },
  );
  ```

- `deno.permissions` 和它的孩子们都支持 `"inherit"` 选项，这意味着它将借用其父辈的权限。

  ```ts
  // 这个 worker 将继承其父辈的权限
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      permissions: "inherit",
    },
  });
  ```

  ```ts
  // 这个 worker 将只继承其父辈的网络权限
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      permissions: {
        env: false,
        hrtime: false,
        net: "inherit",
        ffi: false,
        read: false,
        run: false,
        write: false,
      },
    },
  });
  ```

- 未指定 `deno.permissions` 选项或其子选项之一，将导致 worker 默认继承权限。

  ```ts
  // 这个 worker 将继承其父辈的权限
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
  });
  ```

  ```ts
  // 这个 worker 将会继承其父辈除了网络以外的所有权限
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      permissions: {
        net: false,
      },
    },
  });
  ```

- 你可以通过 `deno.permissions` 选项中传 `"none"` 来禁用 worker 的所有权限。

  ```ts
  // 这个 worker 将不会有任何权限被启用
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      permissions: "none",
    },
  });
  ```
