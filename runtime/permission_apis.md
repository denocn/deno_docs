## 权限 APIs {#permission-apis}

运行 `deno` 命令时，会从 CLI 授予权限。用户代码通常会假定自己拥有一组必需的权限，但是在执行过程中不能保证 _已授予的_ 权限集会与此对齐。

在某些情况下，确保容错程序需要一种在运行时与权限系统进行交互的方法。

### 权限描述符 {#permission-descriptors}

在 CLI 上，对 `/foo/bar` 的读取许可被表示为 `--allow-read=/foo/bar`。在运行时 JS 中，它表示如下：

```ts
const desc = { name: "read", path: "/foo/bar" } as const;
```

其他例子：

```ts
// Global write permission.
const desc1 = { name: "write" } as const;

// Write permission to `$PWD/foo/bar`.
const desc2 = { name: "write", path: "foo/bar" } as const;

// Global net permission.
const desc3 = { name: "net" } as const;

// Net permission to 127.0.0.1:8000.
const desc4 = { name: "net", host: "127.0.0.1:8000" } as const;

// High-resolution time permission.
const desc5 = { name: "hrtime" } as const;
```

### 查询权限 {#query-permissions}

通过描述符检查是否授予许可。

```ts
// deno run --allow-read=/foo main.ts

const desc1 = { name: "read", path: "/foo" } as const;
console.log(await Deno.permissions.query(desc1));
// PermissionStatus { state: "granted" }

const desc2 = { name: "read", path: "/foo/bar" } as const;
console.log(await Deno.permissions.query(desc2));
// PermissionStatus { state: "granted" }

const desc3 = { name: "read", path: "/bar" } as const;
console.log(await Deno.permissions.query(desc3));
// PermissionStatus { state: "prompt" }
```

### 权限状态 {#permission-states}

权限状态可以是 “已授予”（granted），“提示”（prompt） 或 “被拒绝”（denied）。从 CLI 授予的权限将查询到
`{ state: "granted" }`。那些没有被授予查询的对象默认情况下会查询到 `{ state: "prompt" }`，而
`{ state: "denied" }` 保留给那些被明确拒绝的对象。 这将在 [请求权限](#request-permissions) 中出现。

### 权限强度 {#permission-strength}

对 [查询权限](#query-permissions) 中第二个查询的结果的直观理解是，授予了对 `/foo` 的读取访问权限，并且 `/foo/bar`
位于 `/foo` 之内，因此允许读取 `/foo/bar`。

我们也可以说 `desc1` 比 `desc2`
_[更高](https://www.w3.org/TR/permissions/#ref-for-permissiondescriptor-stronger-than)_。
这意味着对于任何 CLI 授予的权限：

1. 如果 `desc1` 查询到 `{ state: "granted" }`，那么 `desc2` 也必须如此。
2. 如果 `desc2` 查询到 `{ state: "denied" }`，那么 `desc1` 也必须如此。

更多示例：

```ts
const desc1 = { name: "write" } as const;
// is stronger than
const desc2 = { name: "write", path: "/foo" } as const;

const desc3 = { name: "net", host: "127.0.0.1" } as const;
// is stronger than
const desc4 = { name: "net", host: "127.0.0.1:8000" } as const;
```

### 请求权限 {#request-permissions}

通过 CLI 提示符请求用户的非授权权限。

```ts
// deno run main.ts

const desc1 = { name: "read", path: "/foo" } as const;
const status1 = await Deno.permissions.request(desc1);
// ⚠️ Deno requests read access to "/foo". Grant? [g/d (g = grant, d = deny)] g
console.log(status1);
// PermissionStatus { state: "granted" }

const desc2 = { name: "read", path: "/bar" } as const;
const status2 = await Deno.permissions.request(desc2);
// ⚠️ Deno requests read access to "/bar". Grant? [g/d (g = grant, d = deny)] d
console.log(status2);
// PermissionStatus { state: "denied" }
```

如果当前许可状态为 “提示”（prompt），则提示将出现在用户的终端上，询问他们是否要批准该请求。授予对 `desc1`
的请求，因此将返回其新状态，并且执行将继续，就像在 `CLI` 上指定了 `--allow-read=/foo` 一样。对 `desc2`
的请求被拒绝，因此其许可状态从 “提示”（prompt） 降为 “拒绝”。

如果当前许可状态已经是 “已授予”（granted） 或
“已拒绝”，则请求的行为将类似于查询，并仅返回当前状态。这样既可以防止提示已授予的权限，也可以防止先前拒绝的请求。

### 撤消权限 {#revoke-permissions}

将权限从 “已授予”（granted） 降级为 “提示”（prompt）。

```ts
// deno run --allow-read=/foo main.ts

const desc = { name: "read", path: "/foo" } as const;
console.log(await Deno.permissions.revoke(desc));
// PermissionStatus { state: "prompt" }
```

但是，当您尝试撤消仅属于 CLI 授予的权限的 _一部分_ 时，会发生什么情况？

```ts
// deno run --allow-read=/foo main.ts

const desc = { name: "read", path: "/foo/bar" } as const;
console.log(await Deno.permissions.revoke(desc));
// PermissionStatus { state: "granted" }
```

它没有被撤销。

要了解这种行为，可以想象 Deno 存储了一组内部的 _显式授予的权限描述符_。在 CLI 上指定 `--allow-read=/foo,/bar`
可以将此设置初始化为：

```ts
[
  { name: "read", path: "/foo" },
  { name: "read", path: "/bar" },
];
```

授予运行时请求 `{ name: "write", path: "/foo" }` 的集合，将其更新为：

```ts
[
  { name: "read", path: "/foo" },
  { name: "read", path: "/bar" },
  { name: "write", path: "/foo" },
];
```

Deno 的权限撤销算法的工作原理是从该集合中删除参数权限描述符比其参数 _强_ 的每个元素因此，要确保不再授予
`desc`，请传递一个比任何显式授予的权限描述符都要 _强_ 于 `desc` _强_ 的参数描述符。

```ts
// deno run --allow-read=/foo main.ts

const desc = { name: "read", path: "/foo/bar" } as const;
console.log(await Deno.permissions.revoke(desc)); // Insufficient.
// PermissionStatus { state: "granted" }

const strongDesc = { name: "read", path: "/foo" } as const;
await Deno.permissions.revoke(strongDesc); // Good.

console.log(await Deno.permissions.query(desc));
// PermissionStatus { state: "prompt" }
```
