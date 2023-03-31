# 如何在 Kinsta 上部署 Deno

[Kinsta 应用托管](https://kinsta.com/application-hosting) 是一个可以让你直接从
Git 代码库构建和部署 Web 应用的服务。

## 准备应用

在 **Kinsta** 上我们推荐使用
[`deno-bin`](https://www.npmjs.com/package/deno-bin) 包来运行 Deno 应用程序。

为此，你的 `package.json` 应该像这样：

```json
{
  "name": "deno app",
  "scripts": {
    "start": "deno run --allow-net index.js --port=${PORT}"
  },
  "devDependencies": {
    "deno-bin": "^1.28.2"
  }
}
```

## 应用示例

```js
import { serve } from "https://deno.land/std@$STD_VERSION/http/server.ts";
import { parse } from "https://deno.land/std@$STD_VERSION/flags/mod.ts";

const { args } = Deno;
const argPort = parse(args).port ? Number(parse(args).port) : 8000;

serve((_req) => new Response("Hello, world"), { port: argPort });
```

应用程序本身是不言自明的。重要的是不要硬编码 `PORT` 而是使用 **Kinsta**
提供的环境变量。

还有一个[仓库](https://github.com/kinsta/hello-world-deno)，可以帮助你入门。

## 部署

1. 在[Kinsta 应用托管](https://kinsta.com/signup/?product_type=app-db)上注册或直接登录到
   [我的 Kinsta](https://my.kinsta.com/) 管理面板。
2. 进入“应用”选项卡。
3. 连接你的 GitHub 代码库。
4. 点击“添加服务 > 应用程序”按钮。
5. 按照向导步骤操作即可。
