# 如何在 Deno 中使用 Planetscale

Planetscale 是一个与 MySQL
兼容的无服务器数据库，旨在为开发者工作流程提供便利，开发者可以通过命令行创建、分支和部署数据库。

[在此处查看源代码](https://github.com/denoland/examples/tree/main/with-planetscale)

我们将使用 Planetscale 无服务器驱动程序 `@planetscale/database` 与 Deno
进行交互。首先，我们需要创建 `main.ts` 并从该包中导入 `connect` 方法：

```tsx, ignore
import { connect } from "npm:@planetscale/database@^1.4";
```

## 配置我们的连接

连接需要三个凭据：主机、用户名和密码。因为这些凭据是数据库特定的，因此我们首先需要在
Planetscale 中创建一个数据库。 您可以按照
[此处的初始说明](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide)
来完成。不用担心添加架构 - 我们可以通过 `@planetscale/database` 进行添加。

创建数据库后，进入 Overview，点击 “Connect” 并选择 “Connect with
`@planetscale/database`” 来获取主机和用户名。然后，单击 Passwords
转到为您的数据库创建新密码。一旦您拥有所有三个凭据，就可以直接使用它们，或者更好地将其存储为环境变量：

```bash
export HOST=<host>
export USERNAME=<username>
export PASSWORD=<password>
```

然后使用 `Deno.env` 调用它们：

```tsx, ignore
const config = {
  host: Deno.env.get("HOST"),
  username: Deno.env.get("USERNAME"),
  password: Deno.env.get("PASSWORD"),
};

const conn = connect(config);
```

如果您在仪表板中设置了环境变量，则此方法在 Deno Deploy
上也可以正常工作。运行方式如下：

```shell, ignore
deno run --allow-net --allow-env main.ts
```

`conn` 对象现在是与 Planetscale 数据库建立的开放连接。

## 创建和填充我们的数据库表

现在您已经建立了连接，可以使用 SQL 命令通过 `conn.execute()`
创建表并插入初始数据：

```tsx, ignore
await conn.execute(
  "CREATE TABLE dinosaurs (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL, description varchar(255) NOT NULL);",
);
await conn.execute(
  "INSERT INTO `dinosaurs` (id, name, description) VALUES (1, 'Aardonyx', 'An early stage in the evolution of sauropods.'), (2, 'Abelisaurus', 'Abels lizard has been reconstructed from a single skull.'), (3, 'Deno', 'The fastest dinosaur that ever lived.')",
);
```

## 查询 Planetscale 数据库

我们可以使用相同的 `conn.execute()`
方法写入我们的查询语句。让我们获取所有恐龙的列表：

```tsx, ignore
const results = await conn.execute("SELECT * FROM `dinosaurs`");
console.log(results.rows);
```

结果：

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

我们也可以通过指定恐龙名称来从数据库获取单行数据：

```tsx, ignore
const result = await conn.execute(
  "SELECT * FROM `dinosaurs` WHERE `name` = 'Deno'",
);
console.log(result.rows);
```

这将给我们一个单行结果：

```tsx, ignore
[{ id: 3, name: "Deno", description: "The fastest dinosaur that ever lived." }];
```

您可以在 Planetscale 的 [文档](https://planetscale.com/docs) 中了解更多有关使用
Planetscale 的信息。
