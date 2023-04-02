<<<<<<< HEAD
# 内部细节

## Deno 和 Linux 的类比

|                       **Linux** | **Deno**                    |
| ------------------------------: | :-------------------------- |
|                       Processes | Web Workers                 |
|                        Syscalls | Ops                         |
|                 文件描述符 (fd) | [资源 ID (rid)](#resources) |
|                       Scheduler | Tokio                       |
| Userland: libc++ / glib / boost | https://deno.land/std/      |
|                 /proc/\$\$/stat | [Deno.metrics()](#metrics)  |
|                       man pages | deno types                  |

### 资源
=======
# Internal Details

## Deno and Linux analogy

|                       **Linux** | **Deno**                         |
| ------------------------------: | :------------------------------- |
|                       Processes | Web Workers                      |
|                        Syscalls | Ops                              |
|           File descriptors (fd) | [Resource ids (rid)](#resources) |
|                       Scheduler | Tokio                            |
| Userland: libc++ / glib / boost | https://deno.land/std/           |
|                 /proc/\$\$/stat | [Deno.metrics()](#metrics)       |
|                       man pages | deno types                       |

### Resources
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

资源 (也称为 `rid`) 是 Deno 的文件描述符版本。
它们是用于引用打开文件、套接字和其他概念的整数值。
在测试中查询系统有多少个打开资源是很好的。

```ts
console.log(Deno.resources());
// { 0: "stdin", 1: "stdout", 2: "stderr" }
Deno.close(0);
console.log(Deno.resources());
// { 1: "stdout", 2: "stderr" }
```

<<<<<<< HEAD
### 统计信息
=======
### Metrics
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

统计信息是 Deno 的内部计数器，用于记录各种统计信息。

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
## 系统框架图
=======
## Schematic diagram
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

![体系结构框架图](https://deno.land/images/schematic_v0.2.png)

<<<<<<< HEAD
## 会议
=======
## Conference
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

- Ryan Dahl。 （2020 年 5 月 27
  日）。[An interesting case with Deno](https://www.youtube.com/watch?v=1b7FoBwxc7E)。Deni
  Israel。
- Bartek Iwańczuk。 （2020 年 10 月 6
  日）。[Deno internals - how modern JS/TS runtime is
  built](https://www.youtube.com/watch?v=AOvg_GbnsbA&t=35m13s)。巴黎 Deno。
