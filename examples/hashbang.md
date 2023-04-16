<<<<<<< HEAD
# 通过 Hashbang（Shebang）使脚本可执行

## 概念

- [Deno.env] 提供环境变量。
- [env] 在修改过的环境中运行程序。

## 概述

如果您想制作例如小工具之类的东西，使 Deno 脚本可执行是有用的。

注意：在 Windows 上，Hashbangs 不起作用。

## 示例

在此程序中，我们为上下文提供权限以访问环境变量，并打印 Deno 安装路径。
=======
# Making Scripts Executable With a Hashbang (Shebang)

## Concepts

- [Deno.env] provides the environment variables.
- [env] runs a program in a modified environment.

## Overview

Making Deno scripts executable can come in handy when creating small tools.

Note: Hashbangs do not work on Windows.

## Example

In this program we give the context permission to access the environment
variables and print the Deno installation path.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```ts, ignore
#!/usr/bin/env -S deno run --allow-env

/**
 *  hashbang.ts
 */

const path = Deno.env.get("DENO_INSTALL");

console.log("Deno Install Path:", path);
```

<<<<<<< HEAD
### 权限

您可能需要为脚本授予执行权限。

#### Linux
=======
### Permissions

You may require to give the script execution permissions.

#### Unix
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```shell
chmod +x hashbang.ts
```

<<<<<<< HEAD
### 执行

通过像任何其他命令一样调用它来启动脚本：
=======
### Execute

Start the script by calling it like any other command:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```shell
./hashbang.ts
```

<<<<<<< HEAD
## 详情

- 必须将 Hashbang 放置在第一行。

- `-S` 将命令拆分为参数。

- 将文件名以 `.ts` 结尾，以便将脚本解释为 TypeScript。

- 未来计划包括支持命令行选项 `--ext <type>`，从而减轻这种命名限制。请参见
  [denoland/deno#5088](https://github.com/denoland/deno/issues/5088)。

## 在没有扩展名的文件中使用 hashbang

您可能希望不使用扩展名作为脚本的文件名。在这种情况下， 您可以使用 `--ext`
标志来提供一个：
=======
## Details

- A hashbang has to be placed in the first line.

- `-S` splits the command into arguments.

- End the file name in `.ts` for the script to be interpreted as TypeScript.

## Using hashbang in files with no extension

You may wish to not use an extension for your script's filename. In this case,
you can supply one by using the `--ext` flag:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```shell, ignore
$ cat my_script
#!/usr/bin/env -S deno run --allow-env --ext=js
console.log("Hello!");
$ ./my_script
Hello!
```

[Deno.env]: /api?s=Deno.env
[env]: https://www.man7.org/linux/man-pages/man1/env.1.html
