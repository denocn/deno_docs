# 通过 Hashbang（Shebang）使脚本可执行

## 概念

- [Deno.env] 提供环境变量。
- [env] 在修改过的环境中运行程序。

## 概述

如果您想制作例如小工具之类的东西，使 Deno 脚本可执行是有用的。

注意：在 Windows 上，Hashbangs 不起作用。

## 示例

在此程序中，我们为上下文提供权限以访问环境变量，并打印 Deno 安装路径。

```ts, ignore
#!/usr/bin/env -S deno run --allow-env

/**
 *  hashbang.ts
 */

const path = Deno.env.get("DENO_INSTALL");

console.log("Deno Install Path:", path);
```

### 权限

您可能需要为脚本授予执行权限。

#### Linux

```shell
chmod +x hashbang.ts
```

### 执行

通过像任何其他命令一样调用它来启动脚本：

```shell
./hashbang.ts
```

## 详情

- 必须将 Hashbang 放置在第一行。

- `-S` 将命令拆分为参数。

- 将文件名以 `.ts` 结尾，以便将脚本解释为 TypeScript。

- 未来计划包括支持命令行选项 `--ext <type>`，从而减轻这种命名限制。请参见
  [denoland/deno#5088](https://github.com/denoland/deno/issues/5088)。

## 在没有扩展名的文件中使用 hashbang

您可能希望不使用扩展名作为脚本的文件名。在这种情况下， 您可以使用 `--ext`
标志来提供一个：

```shell, ignore
$ cat my_script
#!/usr/bin/env -S deno run --allow-env --ext=js
console.log("Hello!");
$ ./my_script
Hello!
```

[Deno.env]: /api?s=Deno.env
[env]: https://www.man7.org/linux/man-pages/man1/env.1.html
