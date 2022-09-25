<<<<<<< HEAD
## Internal details {#internal-details}

### Deno and Linux analogy {#deno-and-linux-analogy}
=======
# Internal Details

## Deno and Linux analogy
>>>>>>> 7a1a1f920f063b84c08e0d5f4ac547d80b9ecc8c

|                       **Linux** | **Deno**                                     |
| ------------------------------: | :------------------------------------------- |
|                       Processes | Web Workers                                  |
|                        Syscalls | Ops                                          |
|           File descriptors (fd) | [Resource ids (rid)](architecture#resources) |
|                       Scheduler | Tokio                                        |
| Userland: libc++ / glib / boost | https://deno.land/std/                       |
|                 /proc/\$\$/stat | [Deno.metrics()](architecture#metrics)       |
|                       man pages | deno types                                   |

<<<<<<< HEAD
#### Resources {#resources}
=======
### Resources
>>>>>>> 7a1a1f920f063b84c08e0d5f4ac547d80b9ecc8c

Resources (AKA `rid`) are Deno's version of file descriptors. They are integer
values used to refer to open files, sockets, and other concepts. For testing it
would be good to be able to query the system for how many open resources there
are.

```ts
console.log(Deno.resources());
// { 0: "stdin", 1: "stdout", 2: "stderr" }
Deno.close(0);
console.log(Deno.resources());
// { 1: "stdout", 2: "stderr" }
```

<<<<<<< HEAD
#### Metrics {#metrics}
=======
### Metrics
>>>>>>> 7a1a1f920f063b84c08e0d5f4ac547d80b9ecc8c

Metrics is Deno's internal counter for various statistics.

```shell
> console.table(Deno.metrics())
┌─────────────────────────┬───────────┐
│          (idx)          │  Values   │
├─────────────────────────┼───────────┤
│      opsDispatched      │    9      │
│    opsDispatchedSync    │    0      │
│   opsDispatchedAsync    │    0      │
│ opsDispatchedAsyncUnref │    0      │
│      opsCompleted       │    9      │
│    opsCompletedSync     │    0      │
│    opsCompletedAsync    │    0      │
│ opsCompletedAsyncUnref  │    0      │
│    bytesSentControl     │   504     │
│      bytesSentData      │    0      │
│      bytesReceived      │   856     │
└─────────────────────────┴───────────┘
```

<<<<<<< HEAD
### Schematic diagram {#schematic-diagram}

![architectural schematic](https://deno.land/images/schematic_v0.2.png)

### Conference {#conference}
=======
## Schematic diagram

![architectural schematic](https://deno.land/images/schematic_v0.2.png)

## Conference
>>>>>>> 7a1a1f920f063b84c08e0d5f4ac547d80b9ecc8c

- Ryan Dahl. (May 27, 2020).
  [An interesting case with Deno](https://www.youtube.com/watch?v=1b7FoBwxc7E).
  Deno Israel.
- Bartek Iwańczuk. (Oct 6, 2020).
  [Deno internals - how modern JS/TS runtime is built](https://www.youtube.com/watch?v=AOvg_GbnsbA&t=35m13s).
  Paris Deno.
