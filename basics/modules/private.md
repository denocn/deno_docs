# 私有模块和存储库

在某些情况下，您可能想要加载位于私人存储库中的远程模块，例如 GitHub
上的私人存储库。

Deno 支持在请求远程模块时发送 bearer 令牌。Bearer 令牌是 OAuth 2.0
中使用的主要访问令牌类型，并且被许多托管服务广泛支持（例如
GitHub、GitLab、BitBucket、Cloudsmith 等）。

## DENO_AUTH_TOKENS

Deno CLI 将查找名为 `DENO_AUTH_TOKENS`
的环境变量，以确定在请求远程模块时应使用哪些身份验证令牌。环境变量的值是由分号（`;`）分隔的
_n_ 个令牌格式，其中每个令牌是以下之一：

- 格式为 `{token}@{hostname[:port]}` 的 bearer 令牌

- 格式为 `{username}:{password}@{hostname[:port]}` 的基本身份验证数据

例如，单个令牌如下：

```sh
DENO_AUTH_TOKENS=a1b2c3d4e5f6@deno.land
```

或

```sh
DENO_AUTH_TOKENS=username:password@deno.land
```

多个令牌如下：

```sh
DENO_AUTH_TOKENS=a1b2c3d4e5f6@deno.land;f1e2d3c4b5a6@example.com:8080,username:password@deno.land
```

当 Deno 去获取远程模块时，其中主机名匹配远程模块的主机名时，Deno 将请求的
`Authorization` 标头设置为 `Bearer {token}` 或 `Basic {base64EncodedData}`
的值。这使得远程服务器能够识别该请求是授权用户的授权请求，并提供对服务器上的适当资源和模块的访问。

## GitHub

要能够访问 GitHub 上的私有存储库，您需要发行_个人访问令牌_。您可以通过登录
GitHub 并转到_Settings -> Developer settings -> Personal access tokens_
来完成此操作：

![Personal access tokens settings on GitHub](../../images/private-pat.png)

然后，您将选择_生成新令牌_ 并为您的令牌提供描述和适当的访问权限：

![Creating a new personal access token on GitHub](../../images/private-github-new-token.png)

生成令牌后，GitHub 将仅显示新令牌一次，您需要在环境变量中使用该值：

![Display of newly created token on GitHub](../../images/private-github-token-display.png)

为访问存储在 GitHub 私有存储库中的模块，您需要在限定为
`raw.githubusercontent.com` 主机名的 `DENO_AUTH_TOKENS`
环境变量中使用生成的令牌。例如：

```sh
DENO_AUTH_TOKENS=a1b2c3d4e5f6@raw.githubusercontent.com
```

这应该允许 Deno 访问令牌颁发给的用户具有访问权限的任何模块。

如果令牌错误或用户无法访问模块，则GitHub 将发出 `404 Not Found`
状态，而不是未经授权的状态。因此，如果您在命令行上遇到无法找到尝试访问的模块的错误，请检查环境变量设置和个人访问令牌设置。

此外，`deno run -L debug`
应该打印出有关解析环境变量中的令牌数量的调试消息。如果它认为任何令牌无效，则会打印错误消息。出于安全考虑，它不会打印有关令牌的任何详细信息。
