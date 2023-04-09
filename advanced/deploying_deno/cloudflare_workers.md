<<<<<<< HEAD
# 将 Deno 部署到 Cloudflare Workers

Cloudflare Workers 允许您在 Cloudflare 的边缘网络上运行 JavaScript。

本文介绍如何将 Deno 函数部署到 Cloudflare Workers。

注意：您只能部署[模块 Workers](https://developers.cloudflare.com/workers/learning/migrating-to-module-workers/)，而不能部署
Web 服务器或应用程序。

## 设置 `denoflare`

为了将 Deno 部署到 Cloudflare，我们将使用这个社区创建的 CLI
[`denoflare`](https://denoflare.dev/)。

[安装它](https://denoflare.dev/cli/#installation)：
=======
# Deploying Deno to Cloudflare Workers

Cloudflare Workers allows you to run JavaScript on Cloudflare's edge network.

This is a short How To guide on deploying a Deno function to Cloudflare Workers.

Note: You would only be able to deploy
[Module Workers](https://developers.cloudflare.com/workers/learning/migrating-to-module-workers/)
instead of web servers or apps.

## Setup `denoflare`

In order to deploy Deno to Cloudflare, we'll use this community created CLI
[`denoflare`](https://denoflare.dev/).

[Install it](https://denoflare.dev/cli/#installation):
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell, ignore
deno install --unstable --allow-read --allow-net --allow-env --allow-run --name denoflare --force \
https://raw.githubusercontent.com/skymethod/denoflare/v0.5.11/cli/cli.ts
```

<<<<<<< HEAD
## 创建您的函数

在一个新目录中，让我们创建一个 `main.ts` 文件，其中将包含我们的模块 Worker
函数：
=======
## Create your function

In a new directory, let's create a `main.ts` file, which will contain our Module
Worker function:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts, ignore
export default {
  fetch(request: Request): Response {
    return new Response("Hello, world!");
  },
};
```

<<<<<<< HEAD
至少，一个 Module Worker 函数必须 `export default` 一个对象，该对象公开一个
`fetch` 函数，该函数返回一个 `Response` 对象。

您可以通过运行以下命令在本地测试它：
=======
At the very minimum, a Module Worker function must `export default` an object
that exposes a `fetch` function, which returns a `Response` object.

You can test this locally by running:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```shell, ignore
denoflare serve main.ts
```

<<<<<<< HEAD
如果在浏览器中转到 `localhost: 8080`，您将看到响应会说：
=======
If you go to `localhost:8080` in your browser, you'll see the response will say:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```
Hello, world!
```

<<<<<<< HEAD
## 配置 `.denoflare`

下一步是创建一个 `.denoflare` 配置文件。在其中，让我们添加：
=======
## Configure `.denoflare`

The next step is to create a `.denoflare` config file. In it, let's add:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```json
{
  "$schema": "https://raw.githubusercontent.com/skymethod/denoflare/v0.5.11/common/config.schema.json",
  "scripts": {
    "main": {
      "path": "/absolute/path/to/main.ts",
      "localPort": 8000
    }
  },
  "profiles": {
    "myprofile": {
      "accountId": "abcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "apiToken": "abcxxxxxxxxx_-yyyyyyyyyyyy-11-dddddddd"
    }
  }
}
```

<<<<<<< HEAD
您可以通过转到[Cloudflare 仪表板](https://dash.cloudflare.com/)，单击
"Workers"，然后在右侧找到 "Account ID" 来查找您的 `accountId`。

您可以从您的[Cloudflare API Tokens settings](https://dash.cloudflare.com/profile/api-tokens)生成一个
`apiToken`。创建 API 令牌时，请确保使用模板 "编辑 Cloudflare Workers"。

在将两者都添加到您的 `.denoflare` 配置之后，让我们尝试将其推送到 Cloudflare：
=======
You can find your `accountId` by going to your
[Cloudflare dashboard](https://dash.cloudflare.com/), clicking "Workers", and
finding "Account ID" on the right side.

You can generate an `apiToken` from your
[Cloudflare API Tokens settings](https://dash.cloudflare.com/profile/api-tokens).
When you create an API token, be sure to use the template "Edit Cloudflare
Workers".

After you add both to your `.denoflare` config, let's try pushing it to
Cloudflare:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```
denoflare push main
```

<<<<<<< HEAD
接下来，您可以在 Cloudflare 帐户中查看您的新函数：

![New function on Cloudflare Workers](../../images/how-to/cloudflare-workers/main-on-cloudflare.png)

完美！
=======
Next, you can view your new function in your Cloudflare account:

![New function on Cloudflare Workers](../../images/how-to/cloudflare-workers/main-on-cloudflare.png)

Boom!
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
