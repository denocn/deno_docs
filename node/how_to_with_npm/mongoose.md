<<<<<<< HEAD
# 如何在 Deno 中使用 Mongoose

[Mongoose](https://mongoosejs.com/) 是一个流行的基于 schema
的库，用于对[MongoDB](https://www.mongodb.com/)中的数据进行建模。它简化了编写
MongoDB 验证、转换和其他相关业务逻辑的操作。

本教程将向您展示如何在 Deno 项目中设置 Mongoose 和 MongoDB。

[查看源代码](https://github.com/denoland/examples/tree/main/with-mongoose) 或
[查看视频指南](https://youtu.be/dmZ9Ih0CR9g)。

## 创建一个 Mongoose 模型

让我们创建一个简单的应用程序，连接到 MongoDB，创建一个名为 `Dinosaur`
的模型，并将恐龙添加到数据库中。

首先，我们将创建必要的文件和目录：
=======
# How to use Mongoose with Deno

[Mongoose](https://mongoosejs.com/) is a popular, schema-based library that
models data for [MongoDB](https://www.mongodb.com/). It simplifies writing
MongoDB validation, casting, and other relevant business logic.

This tutorial will show you how to setup Mongoose and MongoDB with your Deno
project.

[View source](https://github.com/denoland/examples/tree/main/with-mongoose) or
[check out the video guide](https://youtu.be/dmZ9Ih0CR9g).

## Creating a Mongoose Model

Let's create a simple app that connects to MongoDB, creates a `Dinosaur` model,
and adds and updates a dinosaur to the database.

First, we'll create the necessary files and directories:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```
$ touch main.ts && mkdir model && touch model/Dinosaur.ts
```

<<<<<<< HEAD
在 `/model/Dinosaur.ts` 中，我们将导入 `npm:mongoose`，定义[schema]，并导出它：
=======
In `/model/Dinosaur.ts`, we'll import `npm:mongoose`, define the [schema], and
export it:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
import { model, Schema } from "npm:mongoose@^6.7";

<<<<<<< HEAD
// 定义 schema。
=======
// Define schema.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
const dinosaurSchema = new Schema({
  name: { type: String, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

<<<<<<< HEAD
// 验证
=======
// Validations
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
dinosaurSchema.path("name").required(true, "Dinosaur name cannot be blank.");
dinosaurSchema.path("description").required(
  true,
  "Dinosaur description cannot be blank.",
);

<<<<<<< HEAD
// 导出模型。
export default model("Dinosaur", dinosaurSchema);
```

## 连接 MongoDB

现在，在我们的 `main.ts` 文件中，我们将导入 mongoose 和 `Dinosaur`
schema，并连接到 MongoDB：
=======
// Export model.
export default model("Dinosaur", dinosaurSchema);
```

## Connecting to MongoDB

Now, in our `main.ts` file, we'll import mongoose and the `Dinosaur` schema, and
connect to MongoDB:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
import mongoose from "npm:mongoose@^6.7";
import Dinosaur from "./model/Dinosaur.ts";

await mongoose.connect("mongodb://localhost:27017");

<<<<<<< HEAD
// 检查连接状态。
console.log(mongoose.connection.readyState);
```

因为 Deno 支持顶级 `await`，我们可以简单地`await mongoose.connect()`。

运行这个命令，我们应该期望一个日志为 `1`：
=======
// Check to see connection status.
console.log(mongoose.connection.readyState);
```

Because Deno supports top-level `await`, we're able to simply
`await mongoose.connect()`.

Running this, we should expect a log of `1`:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell, ignore
$ deno run --allow-read --allow-sys --allow-env --allow-net main.ts
1
```

<<<<<<< HEAD
它工作了！

## 操作数据

让我们在 `/model/Dinosaur.ts` 中为 `Dinosaur` schema
添加一个实例[方法](https://mongoosejs.com/docs/guide.html#methods)：
=======
It worked!

## Manipulating Data

Let's add an instance [method](https://mongoosejs.com/docs/guide.html#methods)
to our `Dinosaur` schema in `/model/Dinosaur.ts`:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
// ./model/Dinosaur.ts

<<<<<<< HEAD
// 方法。
dinosaurSchema.methods = {
  // 更新描述。
=======
// Methods.
dinosaurSchema.methods = {
  // Update description.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
  updateDescription: async function (description: string) {
    this.description = description;
    return await this.save();
  },
};

// ...
```

<<<<<<< HEAD
这个实例方法 `updateDescription` 将允许您更新记录的描述。

回到 `main.ts`，让我们开始在 MongoDB 中添加和操作数据。
=======
This instance method, `updateDescription`, will allow you to update a record's
description.

Back in `main.ts`, let's start adding and manipulating data in MongoDB.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
// main.ts

<<<<<<< HEAD
// 创建一个新的 Dinosaur。
=======
// Create a new Dinosaur.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
const deno = new Dinosaur({
  name: "Deno",
  description: "The fastest dinosaur ever lived.",
});

<<<<<<< HEAD
// // 插入 deno。
await deno.save();

// 按名称查找 Deno。
=======
// // Insert deno.
await deno.save();

// Find Deno by name.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
const denoFromMongoDb = await Dinosaur.findOne({ name: "Deno" });
console.log(
  `Finding Deno in MongoDB -- \n  ${denoFromMongoDb.name}: ${denoFromMongoDb.description}`,
);

<<<<<<< HEAD
// 更新 Deno 的描述并保存。
=======
// Update description for Deno and save it.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
await denoFromMongoDb.updateDescription(
  "The fastest and most secure dinosaur ever lived.",
);

<<<<<<< HEAD
// 检查 MongoDB 以查看 Deno 的更新描述。
=======
// Check MongoDB to see Deno's updated description.
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
const newDenoFromMongoDb = await Dinosaur.findOne({ name: "Deno" });
console.log(
  `Finding Deno (again) -- \n  ${newDenoFromMongoDb.name}: ${newDenoFromMongoDb.description}`,
);
```

<<<<<<< HEAD
运行代码，我们得到：
=======
Running the code, we get:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```
Finding Deno in MongoDB --
  Deno: The fastest dinosaur ever lived.
Finding Deno (again) --
  Deno: The fastest and most secure dinosaur ever lived.
```

<<<<<<< HEAD
太好了！

有关使用 Mongoose
的更多信息，请参阅[它们的文档](https://mongoosejs.com/docs/guide.html)。
=======
Boom!

For more info on using Mongoose, please refer to
[their documentation](https://mongoosejs.com/docs/guide.html).
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
