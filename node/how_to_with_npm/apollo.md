# 如何使用 Apollo 和 Deno

[Apollo Server](https://www.apollographql.com/) 是一个 GraphQL
服务器，您可以在几分钟内设置并将其与现有数据源(或 REST
API)一起使用。然后，您可以连接任何 GraphQL 客户端以接收数据并利用 GraphQL
的好处，例如类型检查和高效提取。

我们将启动一个简单的 Apollo 服务器，允许我们查询一些本地数据。
对此，我们只需要三个文件：

1. `schema.ts` 用于设置数据模型
2. `resolvers.ts` 用于设置我们将如何填充模式中的数据字段
3. 我们的 `main.ts`，其中服务器将启动

我们将从创建它们开始：

```shell, ignore
touch schema.ts resolvers.ts main.ts
```

让我们逐一了解如何设置每一个。

[在此处查看源代码。](https://github.com/denoland/examples/tree/main/with-apollo)

## schema.ts

我们的 `schema.ts` 文件描述了我们的数据。 在这种情况下，我们的数据是恐龙列表。
我们希望用户能够获取每个恐龙的名称和简短描述。 在 GraphQL 语言中，这意味着
`Dinosaur` 是我们的 **类型**，而 `name` 和 `description` 是我们的 **字段**。
我们还可以为每个字段定义数据类型。 在这种情况下，两者都是字符串。

这也是我们使用 GraphQL 中的特殊 **Query** 类型描述允许查询我们的数据的位置。
我们有两个查询：

- `dinosaurs` 获取所有恐龙的列表
- `dinosaur` 以恐龙的 `name` 作为参数，并返回有关该类恐龙的信息。

我们将在我们的 `typeDefs` 类型定义中导出所有这些变量:

```tsx, ignore
export const typeDefs = `
  type Dinosaur {
    name: String
    description: String
  }

  type Query {
    dinosaurs: [Dinosaur]
		dinosaur(name: String): Dinosaur
  }
`;
```

如果我们想编写数据，这也是我们将描述如何进行 **Mutation** 的位置。 Mutations
是您使用 GraphQL 编写数据的方式。
因为我们在此处使用的是静态数据集，因此我们将不会编写任何内容。

## resolvers.ts

解析器负责为每个查询填充数据。 在这里，我们有我们的恐龙列表， resolver
要么将该整个列表传递给客户端（如果用户请求 `dinosaurs`
查询），要么仅传递一个恐龙（如果用户请求 `dinosaur` 查询）。

```tsx, ignore
const dinosaurs = [
  {
    name: "Aardonyx",
    description: "An early stage in the evolution of sauropods.",
  },
  {
    name: "Abelisaurus",
    description: '"Abel\'s lizard" has been reconstructed from a single skull.',
  },
];

export const resolvers = {
  Query: {
    dinosaurs: () => dinosaurs,
    dinosaur: (_: any, args: any) => {
      return dinosaurs.find((dinosaur) => dinosaur.name === args.name);
    },
  },
};
```

对于后者，我们将来自客户端的参数传递到函数中以将名称与数据集中的名称匹配。

## main.ts

在我们的 `main.ts` 中，我们将导入 `ApolloServer`、`graphql`
以及来自模式和解析器的 `typeDefs`：

```tsx, ignore
import { ApolloServer } from "npm:@apollo/server@^4.1";
import { startStandaloneServer } from "npm:@apollo/server@4.1/standalone";
import { graphql } from "npm:graphql@16.6";
import { typeDefs } from "./schema.ts";
import { resolvers } from "./resolvers.ts";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.log(`Server running on: ${url}`);
```

我们将我们的 `typeDefs` 和 `resolvers` 传递给 `ApolloServer`
来启动一个新服务器。 最后，`startStandaloneServer`
是一个帮助函数，用于快速启动服务器。

## 运行服务器

现在只需运行服务器即可：

```shell, ignore
deno run --allow-net --allow-read --allow-env main.ts
```

您应该在终端中看到 `Server running on: 127.0.0.1:8000`。
如果您转到该地址，您将看到我们可以输入我们的 `dinosaurs` 查询的 Apollo 沙盒：

```graphql, ignore
query {
  dinosaurs {
    name
    description
  }
}
```

这将返回我们的数据集：

```graphql
{
  "data": {
    "dinosaurs": [
      {
        "name": "Aardonyx",
        "description": "An early stage in the evolution of sauropods."
      },
      {
        "name": "Abelisaurus",
        "description": "\"Abel's lizard\" has been reconstructed from a single skull."
      }
    ]
  }
}
```

或者，如果我们只需要一个 `dinosaur`：

```graphql, ignore
query {
  dinosaur(name:"Aardonyx") {
    name
    description
  }
}
```

这将返回：

```graphql, ignore
{
  "data": {
    "dinosaur": {
      "name": "Aardonyx",
      "description": "An early stage in the evolution of sauropods."
    }
  }
}
```

太棒了！

[在 Apollo 和 GraphQL 的教程中了解更多信息](https://www.apollographql.com/tutorials/)。
