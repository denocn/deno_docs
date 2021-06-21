## 权限 {#permissions}

默认情况下，Deno 是安全的。因此，除非你特意开启，Deno 模块是没有文件、网络以及环境的访问权限的。在命令行参数中为 deno 进程授权后才能访问安全敏感的功能。

在以下示例中，`mod.ts`只被授予文件系统的只读权限。它无法对其进行写入，或执行任何其他对安全性敏感的操作。

```shell
deno run --allow-read mod.ts
```

### 权限列表 {#permissions-list}

可用权限如下：

- **-A, --allow-all** 允许所有权限，这将禁用所有安全限制。
- **--allow-env** 允许访问环境，例如读取和设置环境变量。
- **--allow-hrtime** 允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用。
- **--allow-net=\<allow-net\>** 允许网络访问。你可以指定一个可选的以逗号分隔的域名列表，来作为域名白名单。
- **--allow-plugin** 允许加载插件。请注意：--allow-plugin 是一个不稳定功能。
- **--allow-read=\<allow-read\>** 允许读取文件系统。你可以指定一个可选的以逗号分隔的目录或文件列表，来作为文件系统白名单。
- **--allow-run=\<allow-run\>** 允许运行子进程。从 Deno 1.9 开始，你可以传入一个用逗号分割的子进程列表。注意，子进程不在沙箱中运行，所以没有与 deno 进程相同的安全限制。因此，请谨慎使用。
- **--allow-write=\<allow-write\>** 开启文件系统写入权限。你可以指定一个可选的以逗号分隔的目录或文件列表，来作为文件系统白名单。

### 权限白名单 {#permissions-allow-list}

Deno 还允许你控制白名单权限的粒度。

这个例子通过只包含 `/usr` 的白名单来限制文件系统访问权限，但是由于进程试图访问 `/etc` 目录中的文件，所以执行失败。

```shell
$ deno run --allow-read=/usr https://deno.land/std@$STD_VERSION/examples/cat.ts /etc/passwd
error: Uncaught PermissionDenied: read access to "/etc/passwd", run again with the --allow-read flag
► $deno$/dispatch_json.ts:40:11
    at DenoError ($deno$/errors.ts:20:5)
    ...
```

通过设定 `/etc` 为白名单来赋予正确的权限后再次尝试：

```shell
deno run --allow-read=/etc https://deno.land/std@$STD_VERSION/examples/cat.ts /etc/passwd
```

`--allow-write` 与 `--allow-read` 工作原理一样

### 网络访问 {#network-access}

_fetch.ts_:

```ts
const result = await fetch("https://deno.land/");
```

这是一个设置 host 或 url 白名单的示例：

```shell
deno run --allow-net=github.com,deno.land fetch.ts
```

如果 `fetch.ts` 尝试与其他域名建立网络连接，那么这个进程将会失败。

允许访问任意 host/url：

```shell
deno run --allow-net fetch.ts
```

### 会议 {#conference}

Ryan Dahl. (9月 25, 2020).
[Deno安全模型](https://www.youtube.com/watch?v=r5F6dekUmdE#t=34m57).
Speakeasy JS.
