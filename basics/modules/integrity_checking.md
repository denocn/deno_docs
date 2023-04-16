<<<<<<< HEAD
# 完整性检查与锁定文件

## 介绍

假设你的模块依赖于远程模块
`https://some.url/a.ts`。当你第一次编译你的模块时，`a.ts`
会被检索、编译并缓存。它会一直保持这种状态，直到你在新的机器上运行你的模块（比如在生产环境中）或者重新加载缓存（例如通过
`deno cache --reload`）。但是如果远程 url `https://some.url/a.ts`
中的内容发生了变化呢？这可能导致你的生产模块与你的本地模块依赖代码不同。为了避免这种情况，Deno
使用完整性检查和锁定文件。

## 缓存和锁定文件

Deno 可以使用小型 JSON
文件存储并检查模块的子资源完整性。要选择锁定文件，可以使用以下方法之一：

1. 创建一个 `deno.json` 文件，位于当前目录或某个祖先目录中，这将自动在
   `deno.lock` 中创建一个累加锁定文件。
2. 使用 `--lock=deno.lock` 启用并指定锁定文件检查。要更新或创建锁定文件，请使用
   `--lock=deno.lock --lock-write`。`--lock=deno.lock` 告诉 Deno
   要使用的锁定文件，而 `--lock-write`
   用于将依赖哈希输出到锁定文件中（`--lock-write` 必须与 `--lock` 结合使用）。

一个 `deno.lock` 可能长这样，存储着文件的哈希值和依赖关系：
=======
# Integrity Checking & Lock Files

## Introduction

Let's say your module depends on remote module `https://some.url/a.ts`. When you
compile your module for the first time `a.ts` is retrieved, compiled and cached.
It will remain this way until you run your module on a new machine (say in
production) or reload the cache (through `deno cache --reload` for example). But
what happens if the content in the remote url `https://some.url/a.ts` is
changed? This could lead to your production module running with different
dependency code than your local module. Deno's solution to avoid this is to use
integrity checking and lock files.

## Caching and lock files

Deno can store and check subresource integrity for modules using a small JSON
file. To opt into a lock file, either:

1. Create a `deno.json` file in the current or an ancestor directory, which will
   automatically create an additive lockfile at `deno.lock`.
2. Use the `--lock=deno.lock` to enable and specify lock file checking. To
   update or create a lock use `--lock=deno.lock --lock-write`. The
   `--lock=deno.lock` tells Deno what the lock file to use is, while the
   `--lock-write` is used to output dependency hashes to the lock file
   (`--lock-write` must be used in conjunction with `--lock`).

A `deno.lock` might look like this, storing a hash of the file against the
dependency:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```json
{
  "https://deno.land/std@$STD_VERSION/textproto/mod.ts": "3118d7a42c03c242c5a49c2ad91c8396110e14acca1324e7aaefd31a999b71a4",
  "https://deno.land/std@$STD_VERSION/io/util.ts": "ae133d310a0fdcf298cea7bc09a599c49acb616d34e148e263bcb02976f80dee",
  "https://deno.land/std@$STD_VERSION/async/delay.ts": "35957d585a6e3dd87706858fb1d6b551cb278271b03f52c5a2cb70e65e00c26a",
   ...
}
```

<<<<<<< HEAD
### 自动生成的锁定文件

如上所述，当解析 Deno 配置文件（例如
`deno.json`）时，将自动生成一个累加锁定文件。默认情况下，该锁定文件的路径为
`deno.lock`。您可以通过更新 `deno.json` 来指定此路径：
=======
### Auto-generated lockfile

As mentioned above, when a Deno configuration file is resolved (ex. `deno.json`)
then an additive lockfile will be automatically generated. By default, the path
of this lockfile will be `deno.lock`. You can change this path by updating your
`deno.json` to specify this:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```jsonc
{
  "lock": "./lock.file"
}
```

<<<<<<< HEAD
或通过指定以下内容来禁用自动创建和验证锁定文件：
=======
Or disable automatically creating and validating a lockfile by specifying:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```jsonc
{
  "lock": false
}
```

<<<<<<< HEAD
### 使用 `--lock` 和 `--lock-write` 标志

一个典型的工作流过程如下：
=======
### Using `--lock` and `--lock-write` flags

A typical workflow will look like this:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

**src/deps.ts**

```ts, ignore
<<<<<<< HEAD
// 在“src/deps.ts”中添加一个新的依赖项，其他地方使用。
export { xyz } from "https://unpkg.com/xyz-lib@v0.9.0/lib.ts";
```

然后：

```shell
# 创建/更新锁定文件“deno.lock”。
deno cache --lock=deno.lock --lock-write src/deps.ts

# 将其包含在提交到源代码控制时。
=======
// Add a new dependency to "src/deps.ts", used somewhere else.
export { xyz } from "https://unpkg.com/xyz-lib@v0.9.0/lib.ts";
```

Then:

```shell
# Create/update the lock file "deno.lock".
deno cache --lock=deno.lock --lock-write src/deps.ts

# Include it when committing to source control.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
git add -u deno.lock
git commit -m "feat: Add support for xyz using xyz-lib"
git push
```

<<<<<<< HEAD
在另一台机器上进行协作（在新克隆的项目树中）：

```shell
# 将项目的依赖项下载到机器的缓存中，完整性检查每个资源。
deno cache --reload --lock=deno.lock src/deps.ts

# 完成！你可以安全地进行后续操作。
deno test --allow-read src
```

## 运行时验证

与上面的缓存一样，你也可以在使用 `deno run`
子命令期间使用锁定文件，检查运行期间所有锁定模块的完整性。请记住，这仅针对先前添加到锁定文件中的依赖项进行验证。

你也可以更进一步地使用 `--cached-only` 标志，要求远程依赖关系已经被缓存。
=======
Collaborator on another machine -- in a freshly cloned project tree:

```shell
# Download the project's dependencies into the machine's cache, integrity
# checking each resource.
deno cache --reload --lock=deno.lock src/deps.ts

# Done! You can proceed safely.
deno test --allow-read src
```

## Runtime verification

Like caching above, you can also use lock files during use of the `deno run` sub
command, validating the integrity of any locked modules during the run. Remember
that this only validates against dependencies previously added to the lock file.

You can take this a step further as well by using the `--cached-only` flag to
require that remote dependencies are already cached.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```shell
deno run --lock=deno.lock --cached-only mod.ts
```

<<<<<<< HEAD
如果 mod.ts 的依赖树中有任何未缓存的依赖项，此命令将失败。

<!-- TODO - 添加关于动态导入的详细信息 -->
=======
This will fail if there are any dependencies in the dependency tree for mod.ts
which are not yet cached.

<!-- TODO - Add detail on dynamic imports -->
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
