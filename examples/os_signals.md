# 处理操作系统信号

> ⚠️ 在 Deno v1.23 中，Windows 仅支持监听 SIGINT 和 SIGBREAK。

## 概念

<<<<<<< HEAD
- [Deno.addSignalListener()](/api?s=Deno.addSignalListener)
  可用于捕获和监视操作系统信号。
- [Deno.removeSignalListener()](/api?s=Deno.removeSignalListener)
  可用于停止监视该信号。
=======
- [Deno.addSignalListener()](/api?s=Deno.addSignalListener) can be used to
  capture and monitor OS signals.
- [Deno.removeSignalListener()](/api?s=Deno.removeSignalListener) can be used to
  stop watching the signal.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

## 设置操作系统信号监听器

处理操作系统信号的 API 是基于已熟悉的
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
和
[`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
API 示范的。

> ⚠️
> 请注意，监听操作系统信号不会阻止事件循环完成，即使没有未完成的异步操作，进程也将退出。

您可以使用 `Deno.addSignalListener()` 函数处理操作系统信号：

```ts
/**
 * add_signal_listener.ts
 */
console.log("Press Ctrl-C to trigger a SIGINT signal");

Deno.addSignalListener("SIGINT", () => {
  console.log("interrupted!");
  Deno.exit();
});

// 增加一个延迟以防止进程立即退出。
setTimeout(() => {}, 5000);
```

通过以下方式运行：

```shell
deno run add_signal_listener.ts
```

您可以使用 `Deno.removeSignalListener()` 函数取消注册先前添加的信号处理程序。

```ts
/**
 * signal_listeners.ts
 */
console.log("Press Ctrl-C to trigger a SIGINT signal");

const sigIntHandler = () => {
  console.log("interrupted!");
  Deno.exit();
};
Deno.addSignalListener("SIGINT", sigIntHandler);

// 增加一个延迟以防止进程立即退出。
setTimeout(() => {}, 5000);

// 1s 后停止信号监听。
setTimeout(() => {
  Deno.removeSignalListener("SIGINT", sigIntHandler);
}, 1000);
```

通过以下方式运行：

```shell
deno run signal_listeners.ts
```

## 异步迭代器示例

如果您首选使用异步迭代器处理信号，则可以使用 `deno_std` 中提供的
[`signal()`](https://deno.land/std/signal/mod.ts) API：

```ts
/**
 * async_iterator_signal.ts
 */
import { signal } from "https://deno.land/std@$STD_VERSION/signal/mod.ts";

const sig = signal("SIGUSR1", "SIGINT");

// 增加一个延迟以防止进程立即退出。
setTimeout(() => {}, 5000);

for await (const _ of sig) {
  console.log("interrupt or usr1 signal received");
}
```

通过以下方式运行：

```shell
deno run async_iterator_signal.ts
```
