<<<<<<< HEAD
# dnt - 将 Deno 模块发布到 Node.js 上

开发者希望让他们的 Deno 模块可用于 Node.js 用户。使用
[dnt](https://github.com/denoland/dnt) 构建工具可以实现此目的。

dnt 工具允许开发者基本保持 Deno 模块的现状，并使用单个 Deno
脚本来构建、类型检查和测试一个 npm
包在输出目录中。构建完成后，你只需将输出目录进行 `npm publish`
操作，即可将其发布给 Node.js 用户。

有关更多详细信息，请参阅 https://github.com/denoland/dnt。
=======
# dnt - Publishing Deno modules for Node.js

Library authors may want to make their Deno modules available to Node.js users.
This is possible by using the [dnt](https://github.com/denoland/dnt) build tool.

dnt allows you to develop your Deno module mostly as-is and use a single Deno
script to build, type check, and test an npm package in an output directory.
Once built, you only need to `npm publish` the output directory to distribute it
to Node.js users.

For more details, see https://github.com/denoland/dnt
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
