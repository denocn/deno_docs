<<<<<<< HEAD
# 如何在 Deno 中使用 MySQL2

[MySQL](https://www.mysql.com/) 是
[2022 Stack Overflow 开发者调查](https://survey.stackoverflow.co/2022/#most-popular-technologies-database)
中最受欢迎的数据库之一，Facebook、Twitter、YouTube 和 Netflix 都是它的用户。

[这里查看源代码](https://github.com/denoland/examples/tree/main/with-mysql2)

使用 `mysql2` node 包和 `npm:mysql2` 导入，可以使用 Deno 操作和查询 MySQL
数据库。这使我们能够使用其 Promise 包装器并利用顶级等待。
=======
# How to use MySQL2 with Deno

[MySQL](https://www.mysql.com/) is the most popular database in the
[2022 Stack Overflow Developer Survey](https://survey.stackoverflow.co/2022/#most-popular-technologies-database)
and counts Facebook, Twitter, YouTube, and Netflix among its users.

[View source here.](https://github.com/denoland/examples/tree/main/with-mysql2)

You can manipulate and query a MySQL database with Deno using the `mysql2` node
package and importing via `npm:mysql2`. This allows us to use its Promise
wrapper and take advantage of top-level await.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
import mysql from "npm:mysql2@^2.3.3/promise";
```

<<<<<<< HEAD
## 连接到 MySQL

我们可以使用 `createConnection()` 方法连接到 MySQL
服务器。您需要主机（如果进行测试则为
`localhost`，或者生产环境中更可能是云数据库端点）以及用户和密码：
=======
## Connecting to MySQL

We can connect to our MySQL server using the `createConnection()` method. You
need the host (`localhost` if you are testing, or more likely a cloud database
endpoint in production) and the user and password:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});
```

<<<<<<< HEAD
您还可以在连接创建期间可选地指定数据库。在这里，我们要使用 `mysql2`
在运行时创建数据库。

## 创建和填充数据库

现在您已经运行了连接，可以使用 `connection.query()` 与 SQL
命令创建数据库和表，并插入初始数据。

首先，我们要生成并选择要使用的数据库：
=======
You can also optionally specify a database during the connection creation. Here
we are going to use `mysql2` to create the database on the fly.

## Creating and populating the database

Now that you have the connection running, you can use `connection.query()` with
SQL commands to create databases and tables as well as insert the initial data.

First we want to generate and select the database to use:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
await connection.query("CREATE DATABASE denos");
await connection.query("use denos");
```

<<<<<<< HEAD
然后我们要创建表：

```tsx, ignore
await connection.query(
  "CREATE TABLE `dinosaurs` ( `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(255) NOT NULL, `description` varchar(255) )",
);
```

创建表之后，我们可以填充数据：
=======
Then we want to create the table:

```tsx, ignore
await connection.query(
  "CREATE TABLE `dinosaurs` (   `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,   `name` varchar(255) NOT NULL,   `description` varchar(255) )",
);
```

After the table is created we can populate the data:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
await connection.query(
  "INSERT INTO `dinosaurs` (id, name, description) VALUES (1, 'Aardonyx', 'An early stage in the evolution of sauropods.'), (2, 'Abelisaurus', 'Abels lizard has been reconstructed from a single skull.'), (3, 'Deno', 'The fastest dinosaur that ever lived.')",
);
```

<<<<<<< HEAD
现在我们已经准备好开始查询所有数据。

## 查询 MySQL

我们可以使用相同的 `connection.query()` 方法编写查询。首先我们尝试在 `dinosaurs`
表中获取所有数据：
=======
We now have all the data ready to start querying.

## Querying MySQL

We can use the same connection.query() method to write our queries. First we try
and get all the data in our `dinosaurs` table:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
const results = await connection.query("SELECT * FROM `dinosaurs`");
console.log(results);
```

<<<<<<< HEAD
此查询的结果是我们数据库中的所有数据：
=======
The result from this query is all the data in our database:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

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

<<<<<<< HEAD
如果我们只想从数据库中获取单个元素，则可以更改查询：
=======
If we want to just get a single element from the database, we can change our
query:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
const [results, fields] = await connection.query(
  "SELECT * FROM `dinosaurs` WHERE `name` = 'Deno'",
);
console.log(results);
```

<<<<<<< HEAD
这将给我们一个单行结果：
=======
Which gives us a single row result:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
[{ id: 3, name: "Deno", description: "The fastest dinosaur that ever lived." }];
```

<<<<<<< HEAD
最后，我们可以关闭连接：
=======
Finally, we can close the connection:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
await connection.end();
```

<<<<<<< HEAD
有关 `mysql2` 更多信息，请查看它们的文档
[here](https://github.com/sidorares/node-mysql2)。
=======
For more on `mysql2`, check out their documentation
[here](https://github.com/sidorares/node-mysql2).
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
