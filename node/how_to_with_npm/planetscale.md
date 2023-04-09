<<<<<<< HEAD
# 如何在 Deno 中使用 Planetscale

Planetscale 是一个与 MySQL
兼容的无服务器数据库，旨在为开发者工作流程提供便利，开发者可以通过命令行创建、分支和部署数据库。

[在此处查看源代码](https://github.com/denoland/examples/tree/main/with-planetscale)

我们将使用 Planetscale 无服务器驱动程序 `@planetscale/database` 与 Deno
进行交互。首先，我们需要创建 `main.ts` 并从该包中导入 `connect` 方法：
=======
# How to use Planetscale with Deno

Planetscale is a MySQL-compatible serverless database that is designed with a
developer workflow where developers can create, branch, and deploy databases
from the command line.

[View source here.](https://github.com/denoland/examples/tree/main/with-planetscale)

We’ll use the Planetscale serverless driver, `@planetscale/database`, to work
with Deno. First we want to create `main.ts` and import the connect method from
this package:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```tsx, ignore
import { connect } from "npm:@planetscale/database@^1.4";
```

<<<<<<< HEAD
## 配置我们的连接

连接需要三个凭据：主机、用户名和密码。因为这些凭据是数据库特定的，因此我们首先需要在
Planetscale 中创建一个数据库。 您可以按照
[此处的初始说明](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide)
来完成。不用担心添加架构 - 我们可以通过 `@planetscale/database` 进行添加。

创建数据库后，进入 Overview，点击 “Connect” 并选择 “Connect with
`@planetscale/database`” 来获取主机和用户名。然后，单击 Passwords
转到为您的数据库创建新密码。一旦您拥有所有三个凭据，就可以直接使用它们，或者更好地将其存储为环境变量：
=======
## Configuring our connection

The connection requires three credentials: host, username, and password. These
are database-specific, so we first need to create a database in Planetscale. You
can do that by following the initial instructions
[here](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide).
Don’t worry about adding the schema—we can do that through
`@planetscale/database`.

Once you have created the database, head to Overview, click "Connect", and
choose "Connect with `@planetscale/database`" to get the host and username. Then
click through to Passwords to create a new password for your database. Once you
have all three you can plug them in directly, or better, store them as
environment variables:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```bash
export HOST=<host>
export USERNAME=<username>
export PASSWORD=<password>
```

<<<<<<< HEAD
然后使用 `Deno.env` 调用它们：
=======
Then call them using `Deno.env`:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```tsx, ignore
const config = {
  host: Deno.env.get("HOST"),
  username: Deno.env.get("USERNAME"),
  password: Deno.env.get("PASSWORD"),
};

const conn = connect(config);
```

<<<<<<< HEAD
如果您在仪表板中设置了环境变量，则此方法在 Deno Deploy
上也可以正常工作。运行方式如下：
=======
This will also work on Deno Deploy if you set the environment variables in the
dashboard. Run with:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell, ignore
deno run --allow-net --allow-env main.ts
```

<<<<<<< HEAD
`conn` 对象现在是与 Planetscale 数据库建立的开放连接。

## 创建和填充我们的数据库表

现在您已经建立了连接，可以使用 SQL 命令通过 `conn.execute()`
创建表并插入初始数据：
=======
The `conn` object is now an open connection to our Planetscale database.

## Creating and populating our database table

Now that you have the connection running, you can `conn.execute()` with SQL
commands to create tables and insert the initial data:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```tsx, ignore
await conn.execute(
  "CREATE TABLE dinosaurs (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL, description varchar(255) NOT NULL);",
);
await conn.execute(
  "INSERT INTO `dinosaurs` (id, name, description) VALUES (1, 'Aardonyx', 'An early stage in the evolution of sauropods.'), (2, 'Abelisaurus', 'Abels lizard has been reconstructed from a single skull.'), (3, 'Deno', 'The fastest dinosaur that ever lived.')",
);
```

<<<<<<< HEAD
## 查询 Planetscale 数据库

我们可以使用相同的 `conn.execute()`
方法写入我们的查询语句。让我们获取所有恐龙的列表：
=======
## Querying Planetscale

We can use same `conn.execute()` to also write our queries. Let’s get a list of
all our dinosaurs:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```tsx, ignore
const results = await conn.execute("SELECT * FROM `dinosaurs`");
console.log(results.rows);
```

<<<<<<< HEAD
结果：
=======
The result:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```tsx, ignore
[
  {
    id: 1,
    name: "Aardonyx",
    description: "An early stage in the evolution of sauropods.",
  },
  {
    id: 2,
    name: "Abelisaurus",
    description: "Abels lizard has been reconstructed from a single skull.",
  },
  { id: 3, name: "Deno", description: "The fastest dinosaur that ever lived." },
];
```

<<<<<<< HEAD
我们也可以通过指定恐龙名称来从数据库获取单行数据：
=======
We can also get just a single row from the database by specifying a dinosaur
name:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```tsx, ignore
const result = await conn.execute(
  "SELECT * FROM `dinosaurs` WHERE `name` = 'Deno'",
);
console.log(result.rows);
```

<<<<<<< HEAD
这将给我们一个单行结果：
=======
Which gives us a single row result:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```tsx, ignore
[{ id: 3, name: "Deno", description: "The fastest dinosaur that ever lived." }];
```

<<<<<<< HEAD
您可以在 Planetscale 的 [文档](https://planetscale.com/docs) 中了解更多有关使用
Planetscale 的信息。
=======
You can find out more about working with Planetscale in their
[docs](https://planetscale.com/docs).
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
