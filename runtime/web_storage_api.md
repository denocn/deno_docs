# Web Storage API

Deno 1.10
引入了[Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)，提供了一个存储字符串键值对的
API。数据持久化的方式类似于浏览器，并且有一个 10MB 的存储限制。全局的
`sessionStorage` 对象仅在当前执行上下文中保留数据，而 `localStorage`
可以在多次执行之间保留数据。

在浏览器中，`localStorage`
根据来源唯一保留数据（实际上是协议加主机名加端口号）。在 Deno 1.16 中，Deno
有一组规则来确定什么是唯一的存储位置：

- 当使用 `--location` 标志时，使用位置的来源唯一存储数据。这意味着
  `http://example.com/a.ts`、`http://example.com/b.ts` 和
  `http://example.com:80/` 的位置将共享相同的存储空间，但 `https://example.com/`
  将不同。
- 如果没有位置说明符，但指定了 `--config`
  配置文件，则使用该配置文件的绝对路径。这意味着
  `deno run --config deno.jsonc a.ts` 和 `deno run --config deno.jsonc b.ts`
  将共享相同的存储空间，但是 `deno run --config tsconfig.json a.ts` 将不同。
- 如果没有配置或位置说明符，Deno 使用主模块的绝对路径来确定共享什么存储。Deno
  REPL 生成一个“合成的”主模块，该模块基于启动 `deno`
  的当前工作目录。这意味着在相同路径中多次调用 REPL 将共享持久化的
  `localStorage` 数据。

这意味着，与版本 1.16 之前的版本不同，`localStorage` 在主进程中始终可用。

<<<<<<< HEAD
## 示例
=======
## Example
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

下面的代码片段访问当前来源的本地存储桶，并使用 `setItem()` 添加数据条目。

```ts
localStorage.setItem("myDemo", "Deno App");
```

读取 localStorage 项目的语法如下：

```ts
const cat = localStorage.getItem("myDemo");
```

删除 localStorage 项目的语法如下：

```ts
localStorage.removeItem("myDemo");
```

删除所有 localStorage 项目的语法如下：

```ts
localStorage.clear();
```
