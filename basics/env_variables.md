<<<<<<< HEAD
# 环境变量

在 Deno 中有几种使用环境变量的方式：

## 内置 `Deno.env`

Deno 运行时提供内置支持环境变量的方法
[`Deno.env`](https://deno.land/api@v1.25.3?s=Deno.env)。

`Deno.env` 有 getter 和 setter 方法。下面是一个示例：
=======
# Environment variables

There are a few ways to use environment variables in Deno:

## Built-in `Deno.env`

The Deno runtime offers built-in support for environment variables with
[`Deno.env`](https://deno.land/api@v1.25.3?s=Deno.env).

`Deno.env` has getter and setter methods. Here is example usage:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```ts
Deno.env.set("FIREBASE_API_KEY", "examplekey123");
Deno.env.set("FIREBASE_AUTH_DOMAIN", "firebasedomain.com");

console.log(Deno.env.get("FIREBASE_API_KEY")); // examplekey123
console.log(Deno.env.get("FIREBASE_AUTH_DOMAIN")); // firebasedomain.com
console.log(Deno.env.has("FIREBASE_AUTH_DOMAIN")); // true
```

<<<<<<< HEAD
## `.env` 文件

你也可以将环境变量放在一个 `.env` 文件中，然后使用标准库中的 `dotenv` 获取它们。

假设你有一个 `.env` 文件，内容如下：
=======
## `.env` file

You can also put environment variables in a `.env` file and retrieve them using
`dotenv` in the standard library.

Let's say you have an `.env` file that looks like this:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```sh
PASSWORD=Geheimnis
```

<<<<<<< HEAD
为了获取 `.env` 文件中的环境变量，可以从标准库中导入 `load`
函数，然后使用它导入配置。
=======
To access the environment variables in the `.env` file, import the `load`
function from the standard library. Then, import the configuration using it.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```ts
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const password = env["PASSWORD"];

console.log(password);
// "Geheimnis"
```

## `std/flags`

<<<<<<< HEAD
Deno 标准库提供了一个
[`std/flags` 模块](https://deno.land/std@$STD_VERSION/flags/README.md?source=)，用于解析命令行参数。
=======
The Deno standard library has a
[`std/flags` module](https://deno.land/std@$STD_VERSION/flags/README.md?source=)
for parsing command line arguments.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
