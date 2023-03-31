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

```
$ touch main.ts && mkdir model && touch model/Dinosaur.ts
```

在 `/model/Dinosaur.ts` 中，我们将导入 `npm:mongoose`，定义[schema]，并导出它：

```ts, ignore
import { model, Schema } from "npm:mongoose@^6.7";

// 定义 schema。
const dinosaurSchema = new Schema({
  name: { type: String, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// 验证
dinosaurSchema.path("name").required(true, "Dinosaur name cannot be blank.");
dinosaurSchema.path("description").required(
  true,
  "Dinosaur description cannot be blank.",
);

// 导出模型。
export default model("Dinosaur", dinosaurSchema);
```

## 连接 MongoDB

现在，在我们的 `main.ts` 文件中，我们将导入 mongoose 和 `Dinosaur`
schema，并连接到 MongoDB：

```ts, ignore
import mongoose from "npm:mongoose@^6.7";
import Dinosaur from "./model/Dinosaur.ts";

await mongoose.connect("mongodb://localhost:27017");

// 检查连接状态。
console.log(mongoose.connection.readyState);
```

因为 Deno 支持顶级 `await`，我们可以简单地`await mongoose.connect()`。

运行这个命令，我们应该期望一个日志为 `1`：

```shell, ignore
$ deno run --allow-read --allow-sys --allow-env --allow-net main.ts
1
```

它工作了！

## 操作数据

让我们在 `/model/Dinosaur.ts` 中为 `Dinosaur` schema
添加一个实例[方法](https://mongoosejs.com/docs/guide.html#methods)：

```ts, ignore
// ./model/Dinosaur.ts

// 方法。
dinosaurSchema.methods = {
  // 更新描述。
  updateDescription: async function (description: string) {
    this.description = description;
    return await this.save();
  },
};

// ...
```

这个实例方法 `updateDescription` 将允许您更新记录的描述。

回到 `main.ts`，让我们开始在 MongoDB 中添加和操作数据。

```ts, ignore
// main.ts

// 创建一个新的 Dinosaur。
const deno = new Dinosaur({
  name: "Deno",
  description: "The fastest dinosaur ever lived.",
});

// // 插入 deno。
await deno.save();

// 按名称查找 Deno。
const denoFromMongoDb = await Dinosaur.findOne({ name: "Deno" });
console.log(
  `Finding Deno in MongoDB -- \n  ${denoFromMongoDb.name}: ${denoFromMongoDb.description}`,
);

// 更新 Deno 的描述并保存。
await denoFromMongoDb.updateDescription(
  "The fastest and most secure dinosaur ever lived.",
);

// 检查 MongoDB 以查看 Deno 的更新描述。
const newDenoFromMongoDb = await Dinosaur.findOne({ name: "Deno" });
console.log(
  `Finding Deno (again) -- \n  ${newDenoFromMongoDb.name}: ${newDenoFromMongoDb.description}`,
);
```

运行代码，我们得到：

```
Finding Deno in MongoDB --
  Deno: The fastest dinosaur ever lived.
Finding Deno (again) --
  Deno: The fastest and most secure dinosaur ever lived.
```

太好了！

有关使用 Mongoose
的更多信息，请参阅[它们的文档](https://mongoosejs.com/docs/guide.html)。
