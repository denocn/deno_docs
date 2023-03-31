# 环境变量

在 Deno 中有几种使用环境变量的方式：

## 内置 `Deno.env`

Deno 运行时提供内置支持环境变量的方法
[`Deno.env`](https://deno.land/api@v1.25.3?s=Deno.env)。

`Deno.env` 有 getter 和 setter 方法。下面是一个示例：

```ts
Deno.env.set("FIREBASE_API_KEY", "examplekey123");
Deno.env.set("FIREBASE_AUTH_DOMAIN", "firebasedomain.com");

console.log(Deno.env.get("FIREBASE_API_KEY")); // examplekey123
console.log(Deno.env.get("FIREBASE_AUTH_DOMAIN")); // firebasedomain.com
console.log(Deno.env.has("FIREBASE_AUTH_DOMAIN")); // true
```

## `.env` 文件

你也可以将环境变量放在一个 `.env` 文件中，然后使用标准库中的 `dotenv` 获取它们。

假设你有一个 `.env` 文件，内容如下：

```sh
PASSWORD=Geheimnis
```

为了获取 `.env` 文件中的环境变量，可以从标准库中导入 `load`
函数，然后使用它导入配置。

```ts
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const password = env["PASSWORD"];

console.log(password);
// "Geheimnis"
```

## `std/flags`

Deno 标准库提供了一个
[`std/flags` 模块](https://deno.land/std@$STD_VERSION/flags/README.md?source=)，用于解析命令行参数。
