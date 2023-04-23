<<<<<<< HEAD
# 发布计划

每个月的第三个星期四会发布一个新的 `deno` 命令行的小版本。

请查看 [Deno 的 GitHub 里程碑](https://github.com/denoland/deno/milestones)
查看即将发布的版本。

通常会在小版本发布后进行两到三个补丁版本的更新（每个星期一次）。之后会开启一个新功能合并窗口，用于即将发布的小版本。

稳定版本可以在 [GitHub 发布页面](https://github.com/denoland/deno/releases)
找到。

## 飞行频道

除了上述的稳定频道外，canaries 将在每个主要 commit
之后每天发布多次。您可以通过运行以下命令来升级到最新的 canary 发布：
=======
# Release Schedule

A new minor release for the `deno` cli is released every month, on the third
Thursday of the month.

See [Milestones on Deno's GitHub](https://github.com/denoland/deno/milestones)
for the upcoming releases.

There are usually two or three patch releases (done weekly) after a minor
releases; after that a merge window for new features opens for the upcoming
minor release.

Stable releases can be found on the
[GitHub releases page](https://github.com/denoland/deno/releases).

## Canary channel

In addition to the stable channel described above, canaries are released
multiple times daily (for each commit on main). You can upgrade to the latest
canary release by running:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```
deno upgrade --canary
```

<<<<<<< HEAD
要更新到特定的 canary，请在 `--version` 选项中传递 commit 哈希：
=======
To update to a specific canary, pass the commit hash in the `--version` option:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```
deno upgrade --canary --version=973af61d8bb03c1709f61e456581d58386ed4952
```

<<<<<<< HEAD
要切换回稳定频道，请运行 `deno upgrade`。

Canaries 可以从 https://dl.deno.land 下载。
=======
To switch back to the stable channel, run `deno upgrade`.

Canaries can be downloaded from https://dl.deno.land.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
