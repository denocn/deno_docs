## 权限 {#permissions}

<<<<<<< HEAD
默认情况下，Deno 是安全的。因此，除非你特意开启，Deno 模块是没有文件、网络以及环境的访问权限的。在命令行参数中为 deno
进程授权后才能访问安全敏感的功能。

在以下示例中，`mod.ts`只被授予文件系统的只读权限。它无法对其进行写入，或执行任何其他对安全性敏感的操作。
=======
Deno is secure by default. Therefore, unless you specifically enable it, a
program run with Deno has no file, network, or environment access. Access to
security sensitive functionality requires that permisisons have been granted to
an executing script through command line flags, or a runtime permission prompt.

For the following example `mod.ts` has been granted read-only access to the file
system. It cannot write to the file system, or perform any other security
sensitive functions.
>>>>>>> 20b3c6f375ccdd16ab16c341e4e8604ff344e7c1

```shell
deno run --allow-read mod.ts
```

<<<<<<< HEAD
### 权限列表 {#permissions-list}

可用权限如下：

- **-A, --allow-all** 允许所有权限，这将禁用所有安全限制。
- **--allow-env** 允许访问环境，例如读取和设置环境变量。
- **--allow-hrtime** 允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用。
- **--allow-net=\<allow-net\>** 允许网络访问。你可以指定一个可选的以逗号分隔的域名列表，来作为域名白名单。
- **--allow-plugin** 允许加载插件。请注意：--allow-plugin 是一个不稳定功能。
- **--allow-read=\<allow-read\>** 允许读取文件系统。你可以指定一个可选的以逗号分隔的目录或文件列表，来作为文件系统白名单。
- **--allow-run=\<allow-run\>** 允许运行子进程。从 Deno 1.9
  开始，你可以传入一个用逗号分割的子进程列表。注意，子进程不在沙箱中运行，所以没有与 deno 进程相同的安全限制。因此，请谨慎使用。
- **--allow-write=\<allow-write\>**
  开启文件系统写入权限。你可以指定一个可选的以逗号分隔的目录或文件列表，来作为文件系统白名单。

### 权限白名单 {#permissions-allow-list}

Deno 还允许你控制白名单权限的粒度。

这个例子通过只包含 `/usr` 的白名单来限制文件系统访问权限，但是由于进程试图访问 `/etc` 目录中的文件，所以执行失败。
=======
### Permissions list

The following permissions are available:

- **--allow-env=\<allow-env\>** Allow environment access for things like getting
  and setting of environment variables. Since Deno 1.9, you can specify a
  optional, comma-separated list of environment variables to provide an
  allow-list of allowed environment variables.
- **--allow-hrtime** Allow high-resolution time measurement. High-resolution
  time can be used in timing attacks and fingerprinting.
- **--allow-net=\<allow-net\>** Allow network access. You can specify an
  optional, comma-separated list of IP addresses or hostnames (optionally with
  ports) to provide an allow-list of allowed network addresses.
- **--allow-plugin** Allow loading of native plugins. Be aware that plugins are
  not run in a sandbox and therefore do not have the same security restrictions
  as the Deno process. Therefore, use with caution. Please note that
  --allow-plugin is an unstable feature.
- **--allow-read=\<allow-read\>** Allow file system read access. You can specify
  an optional, comma-separated list of directories or files to provide an
  allow-list of allowed file system access.
- **--allow-run=\<allow-run\>** Allow running subprocesses. Since Deno 1.9, You
  can specify an options, comma-separated list of subprocesses to provide an
  allow-list of allowed subprocesses. Be aware that subprocesses are not run in
  a sandbox and therefore do not have the same security restrictions as the deno
  process. Therefore, use with caution.
- **--allow-write=\<allow-write\>** Allow file system write access. You can
  specify an optional, comma-separated list of directories or files to provide
  an allow-list of allowed file system access.
- **-A, --allow-all** Allow all permissions. This disables all security.

### Permissions allow-list

Deno allows you to control the granularity of some permissions with allow-lists.

#### File system access

This example restricts file system access by allow-listing only read access to
the `/usr` directory. In consequence the execution fails as the process was
attempting to read a file in the `/etc` directory:
>>>>>>> 20b3c6f375ccdd16ab16c341e4e8604ff344e7c1

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

<<<<<<< HEAD
### 网络访问 {#network-access}
=======
> Note for Windows users: the `/etc` and `/usr` directories and the
> `/etc/passwd` file do not exist on Windows. If you want to run this example
> yourself, replace `/etc/passwd` with `C:\Windows\System32\Drivers\etc\hosts`,
> and `/usr` with `C:\Users`.
>>>>>>> 20b3c6f375ccdd16ab16c341e4e8604ff344e7c1

#### Network access

```js
// fetch.js
const result = await fetch("https://deno.land/");
```

<<<<<<< HEAD
这是一个设置 host 或 url 白名单的示例：
=======
This is an example of how to allow-list hostnames, ip addresses, optionally
locked to a specified port:
>>>>>>> 20b3c6f375ccdd16ab16c341e4e8604ff344e7c1

```shell
# Multiple hostnames, all ports allowed
deno run --allow-net=github.com,deno.land fetch.js

# A hostname at port 80:
deno run --allow-net=deno.land:80 fetch.js

# An ipv4 address on port 443
deno run --allow-net=1.1.1.1:443 fetch.js

# A ipv6 address, all ports allowed
deno run --allow-net=[2606:4700:4700::1111] fetch.js
```

<<<<<<< HEAD
如果 `fetch.ts` 尝试与其他域名建立网络连接，那么这个进程将会失败。

允许访问任意 host/url：
=======
If `fetch.js` tries to establish network connections to any hostname or IP not
in the allow-list, the relevant call will error.

Allow net calls to any hostname/ip:
>>>>>>> 20b3c6f375ccdd16ab16c341e4e8604ff344e7c1

```shell
deno run --allow-net fetch.js
```

<<<<<<< HEAD
### 会议 {#conference}

Ryan Dahl. (9月 25, 2020).
[Deno安全模型](https://www.youtube.com/watch?v=r5F6dekUmdE#t=34m57). Speakeasy JS.
=======
#### Environment variables

```js
// env.js
Deno.env.get("HOME");
```

This is an example of how to allow-list environment variables:

```shell
# Allow all environment variables
deno run --allow-env env.js

# Allow access to only the HOME env var
deno run --allow-env=HOME env.js
```

> Note for Windows users: environment variables are case insensitive on Windows,
> so Deno also matches them case insensitively in the allow-list.

#### Subprocess permissions

Subprocesses are very powerful, and can be a little scary: they access system
resources irregardless of the permissions you granted to the Deno process that
spawns them. The `cat` program on unix systems can be used to read files from
disk. If you start this program through the `Deno.run` API it will be able to
read files from disk even if the parent Deno process can not read the files
directly. This is often reffered to as privledge escalation.

Because of this, make sure you carefully consider if you want to grant a program
`--allow-run` access: it essentially invalidates the Deno security sandbox. If
you really need to spawn a specific executable, you can reduce the risk by
limiting which programs a Deno process can start using an allow-list for the
`--allow-run` flag:

```js
// run.js
const proc = Deno.run({ cmd: ["cat", "/etc/passwd"] });
```

```shell
# Allow only spawning a `cat` subprocess:
deno run --allow-run=cat run.js

# Allow running any subprocess:
deno run --allow-run run.js
```

> Note for Windows users: the `cat` executable and the `/etc/passwd` file do not
> exist on Windows. To try out this example you will need to replace these with
> an alternatives that exist on Windows.

### Conference

Permission flags where explained by Ryan Dahl in his 2020 talk about the Deno
security model at Speakeasy JS:
https://www.youtube.com/watch?v=r5F6dekUmdE#t=34m57
>>>>>>> 20b3c6f375ccdd16ab16c341e4e8604ff344e7c1
