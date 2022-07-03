## 发布时间表 {#release-schedule}

Deno 使用[语义化版本](https://semver.org/lang/zh-CN/)。

<<<<<<< HEAD
```plain
┌──────── Major (主版本)
│ ┌────── Minor (次版本)
│ │ ┌──── Patch (补丁版本)
│ │ │
x.y.z
```

每个月会发布一个 `deno` 的 minor 版本。在每月的第 3 个星期四发布。

在次要版本发布后，通常会有 2 到 3 个 patch 版本(每周发布一次)；然后新的功能会合并到 minor 版本。

即将发布的 minor 版本的发布日期为：

- 1.20.0: March 16, 2022
- 1.21.0: April 20, 2022
- 1.22.0: May 18, 2022

可以在 [GitHub releases 页面](https://github.com/denoland/deno/releases)查看所有的稳定版本。
=======
See [Milestones on Deno's GitHub](https://github.com/denoland/deno/milestones)
for the upcoming releases.

There are usually two or three patch releases (done weekly) after a minor
releases; after that a merge window for new features opens for the upcoming
minor release.

Stable releases can be found on the
[GitHub releases page](https://github.com/denoland/deno/releases).
>>>>>>> 780cc9177f9015a6cd4c3c0df1d54dbc6ad6b3f0

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
