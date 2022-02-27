## 程序生命周期 {#program-lifecycle}

Deno 支持浏览器兼容的生命周期事件: `load` 和 `unload`。你可以使用 这些事件在你的程序中提供用于安装和清理的代码。

`load` 事件的监听器可以是异步的，并且将被等待。`unload` 事件的监听器则需要是同步的。这两种事件都不能被取消。

示例:

**main.ts**

```ts
import "./imported.ts";

const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (main)`);
};

globalThis.addEventListener("load", handler);

globalThis.addEventListener("unload", handler);

globalThis.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (main)`);
};

globalThis.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (main)`);
};

console.log("log from main script");
```

**imported.ts**

```ts
const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (imported)`);
};

globalThis.addEventListener("load", handler);
globalThis.addEventListener("unload", handler);

globalThis.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (imported)`);
};

globalThis.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (imported)`);
};

console.log("log from imported script");
```

<<<<<<< HEAD
请注意，你可以同时使用 `window.addEventListener` 和 `window.onload`/`window.onunload`
来定义事件处理程序。 它们之间有一个主要的区别, 让我们运行示例:
=======
A couple notes on this example:

- `addEventListener` and `onload`/`onunload` are prefixed with `globalThis`, but
  you could also use `self` or no prefix at all.
  [It is not recommended to use `window` as a prefix](https://lint.deno.land/#no-window-prefix).
- You can use `addEventListener` and/or `onload`/`onunload` to define handlers
  for events. There is a major difference between them, let's run the example:
>>>>>>> a61e9ef4e7c01b7e7c3e5a5222b262e0e4683b38

```shell
$ deno run main.ts
log from imported script
log from main script
got load event in event handler (imported)
got load event in event handler (main)
got load event in onload function (main)
got unload event in event handler (imported)
got unload event in event handler (main)
got unload event in onunload function (main)
```

<<<<<<< HEAD
所有通过 `window.addEventListener` 添加的侦听器都被运行, 可是，在 `main.ts` 定义的 `window.onload` 和
`window.onunload` 覆盖了在 `imported.ts` 定义的处理程序。

换句话说, 你可以同时注册多个 `window.addEventListener` `"load"` 或 `"unload"` 事件, 但是，只有最后加载的
`window.onload` 或 `window.onunload` 事件处理程序会被执行。因此，在可能的情况下，最好是使用
`addEventListener`。
=======
All listeners added using `addEventListener` were run, but `onload` and
`onunload` defined in `main.ts` overrode handlers defined in `imported.ts`.

In other words, you can use `addEventListener` to register multiple `"load"` or
`"unload"` event handlers, but only the last loaded `onload` or `onunload` event
handlers will be executed. It is preferable to use `addEventListener` when
possible for this reason.
>>>>>>> a61e9ef4e7c01b7e7c3e5a5222b262e0e4683b38
