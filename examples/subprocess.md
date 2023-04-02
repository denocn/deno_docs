<<<<<<< HEAD
# 创建子进程
=======
# Creating a Subprocess
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

## 概念

<<<<<<< HEAD
- Deno 可以通过 [Deno.run](/api?s=Deno.run) 创建子进程。
- 需要 `--allow-run` 权限来创建子进程。
- 创建的子进程不在安全沙箱中运行。
- 可以通过 [stdin](/api?s=Deno.stdin)、[stdout](/api?s=Deno.stdout) 和
  [stderr](/api?s=Deno.stderr) 流与子进程进行通信。
- 通过提供 Shell 的路径/名称及其字符串输入开关来使用特定的 Shell，例如
  `Deno.run({ cmd: ["bash", "-c", "ls -la"]});`
=======
- Deno is capable of spawning a subprocess via [Deno.run](/api?s=Deno.run).
- `--allow-run` permission is required to spawn a subprocess.
- Spawned subprocesses do not run in a security sandbox.
- Communicate with the subprocess via the [stdin](/api?s=Deno.stdin),
  [stdout](/api?s=Deno.stdout) and [stderr](/api?s=Deno.stderr) streams.
- Use a specific shell by providing its path/name and its string input switch,
  e.g. `Deno.run({cmd: ["bash", "-c", "ls -la"]});`
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

## 简单示例

该示例相当于从命令行运行 `'echo hello'`。

```ts
/**
 * subprocess_simple.ts
 */

// define command used to create the subprocess
const cmd = ["echo", "hello"];

// create subprocess
const p = Deno.run({ cmd });

// await its completion
await p.status();
```

> 注意：如果使用的是 Windows，则上述命令需写成不同的形式，因为 `echo`
> 不是可执行二进制文件（而是一个内置的 Shell 命令）：

```ts
// define command used to create the subprocess
const cmd = ["cmd", "/c", "echo hello"];
```

运行它：

```shell
$ deno run --allow-run ./subprocess_simple.ts
hello
```

## 安全性

需要 `--allow-run` 权限来创建子进程。请注意，子进程不会在 Deno
沙箱中运行，因此具有与从命令行自己运行命令相同的权限。

## 与子进程通信

默认情况下，当使用 `Deno.run()` 时，子进程会继承父进程的 `stdin`、`stdout` 和
`stderr`。如果要与已启动的子进程通信，可以使用 `"piped"` 选项。

```ts
/**
 * subprocess.ts
 */
const fileNames = Deno.args;

const p = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-read",
    "https://deno.land/std@$STD_VERSION/examples/cat.ts",
    ...fileNames,
  ],
  stdout: "piped",
  stderr: "piped",
});

// Reading the outputs closes their pipes
const [{ code }, rawOutput, rawError] = await Promise.all([
  p.status(),
  p.output(),
  p.stderrOutput(),
]);

if (code === 0) {
  await Deno.stdout.write(rawOutput);
} else {
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
```

运行它：

```shell
$ deno run --allow-run ./subprocess.ts <somefile>
[file content]

$ deno run --allow-run ./subprocess.ts non_existent_file.md

Uncaught NotFound: No such file or directory (os error 2)
    at DenoError (deno/js/errors.ts:22:5)
    at maybeError (deno/js/errors.ts:41:12)
    at handleAsyncMsgFromRust (deno/js/dispatch.ts:27:17)
```

## 管道到文件

该示例相当于在 bash 中运行 `yes &> ./process_output`。

```ts
/**
 * subprocess_piping_to_file.ts
 */

import { mergeReadableStreams } from "https://deno.land/std@$STD_VERSION/streams/merge_readable_streams.ts";

// create the file to attach the process to
const file = await Deno.open("./process_output.txt", {
  read: true,
  write: true,
  create: true,
});

// start the process
const process = Deno.run({
  cmd: ["yes"],
  stdout: "piped",
  stderr: "piped",
});

// example of combining stdout and stderr while sending to a file
const joined = mergeReadableStreams(
  process.stdout.readable,
  process.stderr.readable,
);

// returns a promise that resolves when the process is killed/closed
joined.pipeTo(file.writable).then(() => console.log("pipe join done"));

// manually stop process "yes" will never end on its own
setTimeout(() => {
  process.kill("SIGINT");
}, 100);
```

运行它：

```shell
$ deno run --allow-run ./subprocess_piping_to_file.ts
```
