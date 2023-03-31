# 如何在 Deno 中使用 MySQL2

[MySQL](https://www.mysql.com/) 是
[2022 Stack Overflow 开发者调查](https://survey.stackoverflow.co/2022/#most-popular-technologies-database)
中最受欢迎的数据库之一，Facebook、Twitter、YouTube 和 Netflix 都是它的用户。

[这里查看源代码](https://github.com/denoland/examples/tree/main/with-mysql2)

使用 `mysql2` node 包和 `npm:mysql2` 导入，可以使用 Deno 操作和查询 MySQL
数据库。这使我们能够使用其 Promise 包装器并利用顶级等待。

```tsx, ignore
import mysql from "npm:mysql2@^2.3.3/promise";
```

## 连接到 MySQL

我们可以使用 `createConnection()` 方法连接到 MySQL
服务器。您需要主机（如果进行测试则为
`localhost`，或者生产环境中更可能是云数据库端点）以及用户和密码：

```tsx, ignore
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});
```

您还可以在连接创建期间可选地指定数据库。在这里，我们要使用 `mysql2`
在运行时创建数据库。

## 创建和填充数据库

现在您已经运行了连接，可以使用 `connection.query()` 与 SQL
命令创建数据库和表，并插入初始数据。

首先，我们要生成并选择要使用的数据库：

```tsx, ignore
await connection.query("CREATE DATABASE denos");
await connection.query("use denos");
```

然后我们要创建表：

```tsx, ignore
await connection.query(
  "CREATE TABLE `dinosaurs` ( `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(255) NOT NULL, `description` varchar(255) )",
);
```

创建表之后，我们可以填充数据：

```tsx, ignore
await connection.query(
  "INSERT INTO `dinosaurs` (id, name, description) VALUES (1, 'Aardonyx', 'An early stage in the evolution of sauropods.'), (2, 'Abelisaurus', 'Abels lizard has been reconstructed from a single skull.'), (3, 'Deno', 'The fastest dinosaur that ever lived.')",
);
```

现在我们已经准备好开始查询所有数据。

## 查询 MySQL

我们可以使用相同的 `connection.query()` 方法编写查询。首先我们尝试在 `dinosaurs`
表中获取所有数据：

```tsx, ignore
const results = await connection.query("SELECT * FROM `dinosaurs`");
console.log(results);
```

此查询的结果是我们数据库中的所有数据：

```tsx, ignore
[
  [
    {
      id: 1,
      name: "Aardonyx",
      description: "An early stage in the evolution of sauropods."
    },
    {
      id: 2,
      name: "Abelisaurus",
      description: `Abel's lizard" has been reconstructed from a single skull.`
    },
    { id: 3, name: "Deno", description: "The fastest dinosaur that ever lived." }
  ],
```

如果我们只想从数据库中获取单个元素，则可以更改查询：

```tsx, ignore
const [results, fields] = await connection.query(
  "SELECT * FROM `dinosaurs` WHERE `name` = 'Deno'",
);
console.log(results);
```

这将给我们一个单行结果：

```tsx, ignore
[{ id: 3, name: "Deno", description: "The fastest dinosaur that ever lived." }];
```

最后，我们可以关闭连接：

```tsx, ignore
await connection.end();
```

有关 `mysql2` 更多信息，请查看它们的文档
[here](https://github.com/sidorares/node-mysql2)。
