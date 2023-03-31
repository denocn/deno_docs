# 依赖管理

`deno vendor <specifiers>...` 将会下载指定模块的所有远程依赖到本地的 `vendor`
文件夹中。例如：

```shell
# Vendor 依赖
$ deno vendor main.ts

# 文件系统树结构
$ tree
.
├── main.ts
└── vendor
    ├── deno.land
    ├── import_map.json
    └── raw.githubusercontent.com

# 将目录加入源码控制
$ git add -u vendor
$ git commit
```

为了在你的程序中使用这些已下载的依赖，只需在 Deno 命令中添加
`--import-map=vendor/import_map.json`。你还可以添加 `--no-remote`
选项来禁用远程模块的获取，确保使用 vendor 文件夹内的模块。

```shell
deno run --no-remote --import-map=vendor/import_map.json main.ts
```

请注意，你可以在 vendoring 时指定多个模块和远程模块。

```shell
deno vendor main.ts test.deps.ts https://deno.land/std/path/mod.ts
```

运行 `deno vendor --help` 获取更多详细信息。
