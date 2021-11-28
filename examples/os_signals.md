# Handle OS Signals {#handle-os-signals}

> This program makes use of an unstable Deno feature. Learn more about
> [unstable features](../runtime/stability.md).

<<<<<<< HEAD
## Concepts {#concepts}
=======
> ⚠️ Handling OS signals is currently not available on Windows.

## Concepts
>>>>>>> 9391791a820df606eee4e4b369270bc5e3279faa

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
> exit.

You can use `Deno.addSignalListener()` function for handling OS signals:

```ts
/**
 * add_signal_listener.ts
 */
console.log("Press Ctrl-C to trigger a SIGINT signal");

Deno.addSignalListener("SIGINT", (_) => {
  console.log("interrupted!");
  Deno.exit();
});

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

const sigIntHandler = (_) => {
  console.log("interrupted!");
  Deno.exit();
};
Deno.addSignalListener("SIGINT", sigIntHandler);

// Add a timeout to prevent process existing immediately.
setTimeout(() => {}, 5000);

// Stop listening for a signal after 1s.
setTimeout(() => {
  Deno.removeSignalListener("SIGINT", sigIntHandler);
}, 1000);
```

Run with:

```shell
deno run --unstable signal_listeners.ts
```

## Async iterator example {#async-iterator-example}

If you prefer to handle signals using an async iterator, you can use
[`signal()`](https://deno.land/std/signal/mod.ts) API available in `deno_std`:

```ts
/**
 * async_iterator_signal.ts
 */
import { signal } from "https://deno.land/std@$STD_VERSION/signal/mod.ts";

const sig = signal("SIGUSR1", "SIGINT");

// Add a timeout to prevent process existing immediately.
setTimeout(() => {}, 5000);

<<<<<<< HEAD
## Promise based example {#promise-based-example}

`Deno.signal()` also works as a promise:

```ts
/**
 * promise-signal.ts
 */
console.log("Press Ctrl-C to trigger a SIGINT signal");
await Deno.signal("SIGINT");
console.log("interrupted!");
Deno.exit();
```

Run with:

```shell
deno run --unstable promise-signal.ts
```

## Stop watching signals {#stop-watching-signals}

If you want to stop watching the signal, you can use `dispose()` method of the
signal object:

```ts
/**
 * dispose-signal.ts
 */
const sig = Deno.signal("SIGINT");
setTimeout(() => {
  sig.dispose();
  console.log("No longer watching SIGINT signal");
}, 5000);

console.log("Watching SIGINT signals");
=======
>>>>>>> 9391791a820df606eee4e4b369270bc5e3279faa
for await (const _ of sig) {
  console.log("interrupt or usr1 signal received");
}
```

Run with:

```shell
deno run --unstable async_iterator_signal.ts
```
