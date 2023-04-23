<<<<<<< HEAD
# 如何在 Kinsta 上部署 Deno

[Kinsta 应用托管](https://kinsta.com/application-hosting) 是一个可以让你直接从
Git 代码库构建和部署 Web 应用的服务。

## 准备应用

在 **Kinsta** 上我们推荐使用
[`deno-bin`](https://www.npmjs.com/package/deno-bin) 包来运行 Deno 应用程序。

为此，你的 `package.json` 应该像这样：
=======
# How to Deploy Deno on Kinsta

[Kinsta Application Hosting](https://kinsta.com/application-hosting) is a
service that lets you build and deploy your web apps directly from your Git
repository.

## Preparing your application

At **Kinsta**, we recommend using the
[`deno-bin`](https://www.npmjs.com/package/deno-bin) package to run Deno
applications.

To do so, your `package.json` should look like this:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

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

<<<<<<< HEAD
## 应用示例
=======
## Example application
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```js
import { serve } from "https://deno.land/std@$STD_VERSION/http/server.ts";
import { parse } from "https://deno.land/std@$STD_VERSION/flags/mod.ts";

const { args } = Deno;
const argPort = parse(args).port ? Number(parse(args).port) : 8000;

serve((_req) => new Response("Hello, world"), { port: argPort });
```

<<<<<<< HEAD
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
=======
The application itself is self-explanatory. It's crucial not to hardcode the
`PORT` but use the environmental variable **Kinsta** provides.

There is also a [repository](https://github.com/kinsta/hello-world-deno) that
should help you to get started.

## Deployment

1. Register on
   [Kinsta Application Hosting](https://kinsta.com/signup/?product_type=app-db)
   or login directly to [My Kinsta](https://my.kinsta.com/) admin panel.
2. Go to the Applications tab.
3. Connect your GitHub repository.
4. Press the **Add service > Application button**.
5. Follow the wizard steps.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
