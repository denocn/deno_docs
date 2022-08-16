## 发布时间表 {#release-schedule}

Deno 使用[语义化版本](https://semver.org/lang/zh-CN/)。

```plain
┌──────── Major (主版本)
│ ┌────── Minor (次版本)
│ │ ┌──── Patch (补丁版本)
│ │ │
x.y.z
```

See [Milestones on Deno's GitHub](https://github.com/denoland/deno/milestones)
for the upcoming releases.

在次要版本发布后，通常会有 2 到 3 个 patch 版本(每周发布一次)；然后新的功能会合并到 minor 版本。

可以在 [GitHub releases 页面](https://github.com/denoland/deno/releases)查看所有的稳定版本。

### Canary 频道 {#canary-channel}

除了上述稳定频道之外，Canary 每天还会发布多次（对应于主仓库的 main 分支的每次提交）。可以通过运行以下命令升级到最新的 Canary 版本：

```
deno upgrade --canary
```

要更新到特定的 canary，可以在 `--version` 选项中设置特定的哈希值：

```
deno upgrade --canary --version=973af61d8bb03c1709f61e456581d58386ed4952
```

运行 `deno upgrade` 可以切回稳定版本。

所有版本均可以在 https://dl.deno.js.cn 下载。
