## 程序生命周期 {#program-lifecycle}

Deno 支持浏览器兼容的生命周期事件: `load`, `beforeunload` 和
`unload`。你可以使用这些事件在你的程序中提供用于安装和清理的代码。

`load` 事件的监听器可以是异步的，并且将被等待， 这个事件无法取消。`beforeunload` 事件的监听器必须是同步的，可以取消。`unload`
事件的监听器是同步的，可以取消。

示例:

**main.ts**

```ts, ignore
import "./imported.ts";

const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (main)`);
};

globalThis.addEventListener("load", handler);

globalThis.addEventListener("beforeunload", handler);

globalThis.addEventListener("unload", handler);

globalThis.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (main)`);
};

globalThis.onbeforeunload = (e: Event): void => {
  console.log(`got ${e.type} event in onbeforeunload function (main)`);
};

globalThis.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (main)`);
};

console.log("log from main script");
```

**imported.ts**

```ts, ignore
const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (imported)`);
};

globalThis.addEventListener("load", handler);
globalThis.addEventListener("beforeunload", handler);
globalThis.addEventListener("unload", handler);

globalThis.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (imported)`);
};

globalThis.onbeforeunload = (e: Event): void => {
  console.log(`got ${e.type} event in onbeforeunload function (imported)`);
};

globalThis.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (imported)`);
};

console.log("log from imported script");
```

A couple notes on this example:

- `addEventListener` and `onload`/`onunload` are prefixed with `globalThis`, but
  you could also use `self` or no prefix at all.
  [It is not recommended to use `window` as a prefix](https://lint.deno.land/#no-window-prefix).
- You can use `addEventListener` and/or `onload`/`onunload` to define handlers
  for events. There is a major difference between them, let's run the example:

```shell
$ deno run main.ts
log from imported script
log from main script
got load event in event handler (imported)
got load event in event handler (main)
got load event in onload function (main)
got onbeforeunload event in event handler (imported)
got onbeforeunload event in event handler (main)
got onbeforeunload event in onbeforeunload function (main)
got unload event in event handler (imported)
got unload event in event handler (main)
got unload event in onunload function (main)
```

所有通过 `addEventListener` 添加的侦听器都会运行, 但是在 `main.ts` 文件里定义的
`onload`、`onbeforeunload` 和 `onunload` 覆盖了在 `imported.ts` 定义的处理程序。

换句话说, 你可以使用 `addEventListener` 注册多个 `"load"`、`"onbeforeunload"` 或 `"unload"` 事件,
但是，只有最后加载的 `onload`、`onbeforeunload` 或 `onunload` 事件处理程序会执行。因此，在可能的情况下，最好是使用
`addEventListener`。
