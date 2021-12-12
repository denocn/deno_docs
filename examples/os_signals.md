# Handle OS Signals

> This program makes use of an unstable Deno feature. Learn more about
> [unstable features](../runtime/stability.md). ⚠️ Handling OS signals is
> currently not available on Windows.

> ⚠️ Handling OS signals is currently not available on Windows.

## Concepts

- Use the `--unstable` flag to access new or unstable features in Deno.
- [Deno.addSignalListener()](https://doc.deno.land/builtin/unstable#Deno.addSignalListener)
  can be used to capture and monitor OS signals.
- [Deno.removeSignalListener()](https://doc.deno.land/builtin/unstable#Deno.removeSignalListener)
  can be used to stop watching the signal.

## Set up an OS signal listener

APIs for handling OS signals are modelled after already familiar
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
and
[`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
APIs.

> ⚠️ Note that listening for OS signals doesn't prevent event loop from
> finishing, ie. if there are no more pending async operations the process will
<<<<<<< HEAD
> exit. You can use `Deno.addSignalListener()` function for handling OS signals:
=======
> exit.

You can use `Deno.addSignalListener()` function for handling OS signals:
>>>>>>> a74857c01a4cc2f8b97a4fe46414c2c7492cb5e6

```ts
/**
 * add_signal_listener.ts
 */
console.log("Press Ctrl-C to trigger a SIGINT signal");
<<<<<<< HEAD
=======

>>>>>>> a74857c01a4cc2f8b97a4fe46414c2c7492cb5e6
Deno.addSignalListener("SIGINT", (_) => {
  console.log("interrupted!");
  Deno.exit();
});
<<<<<<< HEAD
=======

>>>>>>> a74857c01a4cc2f8b97a4fe46414c2c7492cb5e6
// Add a timeout to prevent process existing immediately.
setTimeout(() => {}, 5000);
```

Run with:

```shell
deno run --unstable add_signal_listener.ts
```

You can use `Deno.removeSignalListener()` function to unregister previously
added signal handler.

```ts
/**
 * signal_listeners.ts
 */
console.log("Press Ctrl-C to trigger a SIGINT signal");
<<<<<<< HEAD
=======

>>>>>>> a74857c01a4cc2f8b97a4fe46414c2c7492cb5e6
const sigIntHandler = (_) => {
  console.log("interrupted!");
  Deno.exit();
};
Deno.addSignalListener("SIGINT", sigIntHandler);
<<<<<<< HEAD
// Add a timeout to prevent process existing immediately.
setTimeout(() => {}, 5000);
=======

// Add a timeout to prevent process existing immediately.
setTimeout(() => {}, 5000);

>>>>>>> a74857c01a4cc2f8b97a4fe46414c2c7492cb5e6
// Stop listening for a signal after 1s.
setTimeout(() => {
  Deno.removeSignalListener("SIGINT", sigIntHandler);
}, 1000);
```

Run with:

```shell
deno run --unstable signal_listeners.ts
```

## Async iterator example

If you prefer to handle signals using an async iterator, you can use
[`signal()`](https://deno.land/std/signal/mod.ts) API available in `deno_std`:

```ts
/**
 * async_iterator_signal.ts
 */
import { signal } from "https://deno.land/std@$STD_VERSION/signal/mod.ts";
<<<<<<< HEAD
const sig = signal("SIGUSR1", "SIGINT");
// Add a timeout to prevent process existing immediately.
setTimeout(() => {}, 5000);
=======

const sig = signal("SIGUSR1", "SIGINT");

// Add a timeout to prevent process existing immediately.
setTimeout(() => {}, 5000);

>>>>>>> a74857c01a4cc2f8b97a4fe46414c2c7492cb5e6
for await (const _ of sig) {
  console.log("interrupt or usr1 signal received");
}
```

Run with:

```shell
deno run --unstable async_iterator_signal.ts
```
