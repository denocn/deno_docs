<<<<<<< HEAD
# 如何在 Deno 中使用 Express

[Express](https://expressjs.com/) 是一种流行的 Web
框架，以其简单、开明的特点和大量的中间件生态系统而闻名。

本教程将向您展示如何使用 Express 和 Deno 创建一个简单的 API。

[在此查看源代码。](https://github.com/denoland/examples/tree/main/with-express)

## 创建 `main.ts`

让我们创建 `main.ts`：
=======
# How to use Express with Deno

[Express](https://expressjs.com/) is a popular web framework known for being
simple and unopinionated with a large ecosystem of middleware.

This How To guide will show you how to create a simple API using Express and
Deno.

[View source here.](https://github.com/denoland/examples/tree/main/with-express)

## Create `main.ts`

Let's create `main.ts`:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```
touch main.ts
```

<<<<<<< HEAD
在 `main.ts` 中，让我们创建一个简单的服务器：
=======
In `main.ts`, let's create a simple server:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```ts, ignore
// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";

const app = express();

app.get("/", (req, res) => {
<<<<<<< HEAD
  res.send("欢迎使用恐龙 API！");
=======
  res.send("Welcome to the Dinosaur API!");
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
});

app.listen(8000);
```

<<<<<<< HEAD
让我们运行此服务器：
=======
Let's run this server:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```
deno run -A main.ts
```

<<<<<<< HEAD
并将浏览器指向 `localhost:8000`。您应该会看到：

```
欢迎使用恐龙 API！
```

## 添加数据和路由

接下来的步骤是添加一些数据。我们将使用从[此文章](https://www.thoughtco.com/dinosaurs-a-to-z-1093748)中找到的这些恐龙数据。随意从[这里复制](https://github.com/denoland/examples/blob/main/with-express/data.json)。

让我们创建 `data.json`：
=======
And point our browser to `localhost:8000`. You should see:

```
Welcome to the Dinosaur API!
```

## Add data and routes

The next step here is to add some data. We'll use this Dinosaur data that we
found from [this article](https://www.thoughtco.com/dinosaurs-a-to-z-1093748).
Feel free to
[copy it from here](https://github.com/denoland/examples/blob/main/with-express/data.json).

Let's create `data.json`:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```
touch data.json
```

<<<<<<< HEAD
并将恐龙数据粘贴到文件中。

接下来，让我们将数据导入 `main.ts`。在文件顶部添加以下行：
=======
And paste in the dinosaur data.

Next, let's import that data into `main.ts`. Let's add this line at the top of
the file:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```ts, ignore
import data from "./data.json" assert { type: "json" };
```

<<<<<<< HEAD
然后，我们可以创建用于访问数据的路由。为了保持简单，让我们只为 `/api/` 和
`/api/:dinosaur` 定义 `GET` 处理程序。在 `const app = express();`
行之后添加以下内容：

```ts, ignore
app.get("/", (req, res) => {
  res.send("欢迎使用恐龙 API！");
=======
Then, we can create the routes to access that data. To keep it simple, let's
just define `GET` handlers for `/api/` and `/api/:dinosaur`. Add the below after
the `const app = express();` line:

```ts, ignore
app.get("/", (req, res) => {
  res.send("Welcome to the Dinosaur API!");
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
});

app.get("/api", (req, res) => {
  res.send(data);
});

app.get("/api/:dinosaur", (req, res) => {
  if (req?.params?.dinosaur) {
    const found = data.find(item => item.name.toLowerCase() === req.params.dinosaur.toLowerCase());
    if (found) {
      res.send(found)
    } else {
<<<<<<< HEAD
      res.send("未找到此类恐龙。");
=======
      res.send("No dinosaurs found.");
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
    }
  }
});

app.listen(8000);
```

<<<<<<< HEAD
让我们使用 `deno run -A main.ts` 运行服务器，并查看
`localhost:8000/api`。您应该会看到恐龙列表：
=======
Let's run the server with `deno run -A main.ts` and check out
`localhost:8000/api`. You should see a list of dinosaurs:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```json, ignore
[
  {
    "name": "Aardonyx",
    "description": "An early stage in the evolution of sauropods."
  },
  {
    "name": "Abelisaurus",
    "description": "\"Abel's lizard\" has been reconstructed from a single skull."
  },
  {
    "name": "Abrictosaurus",
    "description": "An early relative of Heterodontosaurus."
  },
...
```

<<<<<<< HEAD
当我们转到 `localhost:8000/api/aardonyx` 时：
=======
And when we go to `localhost:8000/api/aardonyx`:
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```json, ignore
{
  "name": "Aardonyx",
  "description": "An early stage in the evolution of sauropods."
}
```

<<<<<<< HEAD
太好了！
=======
Great!
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
