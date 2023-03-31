# 文件系统事件

## 概念

- 使用 [Deno.watchFs](/api?s=Deno.watchFs) 监听文件系统事件。
- 不同操作系统可能会有不同的结果。

## 示例

监听当前目录下的文件系统事件：

```ts
/**
 * watcher.ts
 */
const watcher = Deno.watchFs(".");
for await (const event of watcher) {
  console.log(">>>> event", event);
  // 示例事件：{ kind: "create", paths: [ "/home/alice/deno/foo.txt" ] }
}
```

使用以下命令运行：

```shell
deno run --allow-read watcher.ts
```

现在尝试在与 `watcher.ts` 相同的目录中添加、删除和修改文件。

请注意，事件的确切顺序可能因操作系统而异。此功能根据平台使用不同的系统调用：

- Linux：[inotify](https://man7.org/linux/man-pages/man7/inotify.7.html)
- macOS：
  [FSEvents](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/FSEvents_ProgGuide/Introduction/Introduction.html)
- Windows：
  [ReadDirectoryChangesW]（https://docs.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-readdirectorychangesw）
