# 代理服务

Deno 原生支持模块下载和 Web 标准 `fetch` API 的代理服务。

代理配置从环境变量中读取，包括 `HTTP_PROXY`、`HTTPS_PROXY` 和 `NO_PROXY`。

在 Windows 环境下，如果没有找到相应的环境变量，则会读取注册表中的代理配置。
