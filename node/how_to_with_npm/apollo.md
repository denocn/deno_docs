<<<<<<< HEAD
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
=======
# How to use Apollo with Deno

[Apollo Server](https://www.apollographql.com/) is a GraphQL server that you can
set up in minutes and use with your existing data source (or REST API). You can
then connect any GraphQL client to it to receive the data and take advantage of
GraphQL benefits, such as type-checking and efficient fetching.

We're going to get a simple Apollo server up and running that will allow us to
query some local data. We’re only going to need three files for this:

1. `schema.ts` to set up our data model
2. `resolvers.ts` to set up how we’re going to populate the data fields in our
   schema
3. Our `main.ts` where the server is going to launch

We’ll start by creating them:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```shell, ignore
touch schema.ts resolvers.ts main.ts
```

<<<<<<< HEAD
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
=======
Let’s go through setting up each.

[View source here.](https://github.com/denoland/examples/tree/main/with-apollo)

## schema.ts

Our `schema.ts` file describes our data. In this case, our data is a list of
dinosaurs. We want our users to be able to get the name and a short description
of each dino. In GraphQL language, this means that `Dinosaur` is our **type**,
and `name` and `description` are our **fields**. We can also define the data
type for each field. In this case, both are strings.

This is also where we describe the queries we allow for our data, using the
special **Query** type in GraphQL. We have two queries:

- `dinosaurs` which gets a list of all dinosaurs
- `dinosaur` which takes in the `name` of a dinosaur as an argument and returns
  information about that one type of dinosaur.

We’re going to export all this within our `typeDefs` type definitions, variable:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

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

<<<<<<< HEAD
如果我们想编写数据，这也是我们将描述如何进行 **Mutation** 的位置。 Mutations
是您使用 GraphQL 编写数据的方式。
因为我们在此处使用的是静态数据集，因此我们将不会编写任何内容。

## resolvers.ts

解析器负责为每个查询填充数据。 在这里，我们有我们的恐龙列表， resolver
要么将该整个列表传递给客户端（如果用户请求 `dinosaurs`
查询），要么仅传递一个恐龙（如果用户请求 `dinosaur` 查询）。
=======
If we wanted to write data, this is also where we would describe the
**Mutation** to do so. Mutations are how you write data with GraphQL. Because we
are using a static dataset here, we won’t be writing anything.

## resolvers.ts

A resolver is responsible for populating the data for each query. Here we have
our list of dinosaurs and all the resolver is going to do is either a) pass that
entire list to the client if the user requests the `dinosaurs` query, or pass
just one if the user requests the `dinosaur` query.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

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

<<<<<<< HEAD
对于后者，我们将来自客户端的参数传递到函数中以将名称与数据集中的名称匹配。

## main.ts

在我们的 `main.ts` 中，我们将导入 `ApolloServer`、`graphql`
以及来自模式和解析器的 `typeDefs`：
=======
With the latter, we pass the arguments from the client into a function to match
the name to a name in our dataset.

## main.ts

In our `main.ts` we’re going to import the `ApolloServer` as well as `graphql`
and our `typeDefs` from the schema and our resolvers:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

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

<<<<<<< HEAD
我们将我们的 `typeDefs` 和 `resolvers` 传递给 `ApolloServer`
来启动一个新服务器。 最后，`startStandaloneServer`
是一个帮助函数，用于快速启动服务器。

## 运行服务器

现在只需运行服务器即可：
=======
We pass our `typeDefs` and `resolvers` to `ApolloServer` to spool up a new
server. Finally, `startStandaloneServer` is a helper function to get the server
up and running quickly.

## Running the server

All that is left to do now is run the server:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```shell, ignore
deno run --allow-net --allow-read --allow-env main.ts
```

<<<<<<< HEAD
您应该在终端中看到 `Server running on: 127.0.0.1:8000`。
如果您转到该地址，您将看到我们可以输入我们的 `dinosaurs` 查询的 Apollo 沙盒：
=======
You should see `Server running on: 127.0.0.1:8000` in your terminal. If you go
to that address you will see the Apollo sandbox where we can enter our
`dinosaurs` query:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```graphql, ignore
query {
  dinosaurs {
    name
    description
  }
}
```

<<<<<<< HEAD
这将返回我们的数据集：
=======
This will return our dataset:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

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

<<<<<<< HEAD
或者，如果我们只需要一个 `dinosaur`：
=======
Or if we want just one `dinosaur`:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```graphql, ignore
query {
  dinosaur(name:"Aardonyx") {
    name
    description
  }
}
```

<<<<<<< HEAD
这将返回：
=======
Which returns:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

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

<<<<<<< HEAD
太棒了！

[在 Apollo 和 GraphQL 的教程中了解更多信息](https://www.apollographql.com/tutorials/)。
=======
Awesome!

[Learn more about using Apollo and GraphQL in their tutorials](https://www.apollographql.com/tutorials/).
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
