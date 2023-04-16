<<<<<<< HEAD
# 在 Deno 中配置 JSX

Deno 对 `.jsx` 文件和 `.tsx` 文件都具有内置的 JSX 支持。在 Deno 中使用 JSX
可以方便地进行服务器端渲染或生成供浏览器使用的代码。

## 默认配置

Deno CLI 具有默认的 JSX 配置，与 `tsc` 的默认配置不同。Deno 通过以下 TypeScript
编译器选项默认使用
[TypeScript 编译器选项](https://www.typescriptlang.org/docs/handbook/compiler-options.html):
=======
# Configuring JSX in Deno

Deno has built-in support for JSX in both `.jsx` files and `.tsx` files. JSX in
Deno can be handy for server-side rendering or generating code for consumption
in a browser.

## Default configuration

The Deno CLI has a default configuration for JSX that is different than the
defaults for `tsc`. Effectively Deno uses the following
[TypeScript compiler](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
options by default:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "React.createElement",
    "jsxFragmentFactory": "React.Fragment"
  }
}
```

<<<<<<< HEAD
## JSX 导入源

在 React 17 中，React 团队添加了所谓的
[新的 JSX 转换](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)。这增强了
JSX 转换的 API，同时还为自动导入 JSX
库到模块提供了一种机制，而不需要显式导入它或将其作为全局范围的一部分。一般来说，这使得在应用程序中使用
JSX 更容易。

截至 Deno 1.16，已添加了对这些转换的初始支持。Deno 支持 JSX 导入源编译指示以及在
[配置文件](../../getting_started/configuration_file.md) 中配置 JSX 导入源。

### JSX 运行时

当使用自动转换时，Deno 将尝试导入预计符合 _新的_ JSX API 的 JSX
运行时模块，该模块位于 `jsx-runtime` 或 `jsx-dev-runtime`。例如，如果将 JSX
导入源配置为 `react`，则输出的代码将添加以下内容：
=======
## JSX import source

In React 17, the React team added what they called
[the _new_ JSX transforms](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).
This enhanced and modernized the API for JSX transforms as well as provided a
mechanism to automatically import a JSX library into a module, instead of having
to explicitly import it or make it part of the global scope. Generally this
makes it easier to use JSX in your application.

As of Deno 1.16, initial support for these transforms was added. Deno supports
both the JSX import source pragma as well as configuring a JSX import source in
a [configuration file](../../getting_started/configuration_file.md).

### JSX runtime

When using the automatic transforms, Deno will try to import a JSX runtime
module that is expected to conform to the _new_ JSX API and is located at either
`jsx-runtime` or `jsx-dev-runtime`. For example if a JSX import source is
configured to `react`, then the emitted code will add this to the emitted file:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```jsx, ignore
import { jsx as _jsx } from "react/jsx-runtime";
```

<<<<<<< HEAD
Deno
通常使用显式的规范器，这意味着它不会在运行时尝试任何未发出的规范器。这意味着为了成功加载
JSX 运行时，`"react/jsx-runtime"` 需要解析为模块。有一点需要说明，Deno
支持远程模块，大多数 CDN 都可以轻松解析规范器。

例如，如果要在 [esm.sh](https://esm.sh/) CDN 中使用
[Preact](https://preactjs.com/)，则应使用 `https://esm.sh/preact` 作为 JSX
导入源，然后 esm.sh 会将 `https://esm.sh/preact/jsx-runtime`
解析为模块，包括在响应中提供一个标题，告诉 Deno 在哪里找到 Preact 的类型定义。

### 使用 JSX 导入源编译指示

不管您是否为项目配置了 JSX 导入源，或者是否正在使用默认的“旧版”配置，您都可以将
JSX 导入源编译指示添加到 `.jsx` 或 `.tsx` 模块中，Deno 将予以尊重。

`@jsxImportSource` 编译指示需要位于模块的前导注释中。例如，要从 esm.sh 使用
Preact，您可以像这样做：
=======
Deno generally works off explicit specifiers, which means it will not try any
other specifier at runtime than the one that is emitted. Which means to
successfully load the JSX runtime, `"react/jsx-runtime"` would need to resolve
to a module. Saying that, Deno supports remote modules, and most CDNs resolve
the specifier easily.

For example, if you wanted to use [Preact](https://preactjs.com/) from the
[esm.sh](https://esm.sh/) CDN, you would use `https://esm.sh/preact` as the JSX
import source, and esm.sh will resolve `https://esm.sh/preact/jsx-runtime` as a
module, including providing a header in the response that tells Deno where to
find the type definitions for Preact.

### Using the JSX import source pragma

Whether you have a JSX import source configured for your project, or if you are
using the default "legacy" configuration, you can add the JSX import source
pragma to a `.jsx` or `.tsx` module, and Deno will respect it.

The `@jsxImportSource` pragma needs to be in the leading comments of the module.
For example to use Preact from esm.sh, you would do something like this:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```jsx, ignore
/** @jsxImportSource https://esm.sh/preact */

export function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}
```

<<<<<<< HEAD
### 在配置文件中使用 JSX 导入源

如果想要为整个项目配置 JSX 导入源，以便不需要在每个模块中插入该指示，可以使用
[配置文件](../../getting_started/configuration_file.md) 中的 `"compilerOptions"`
来指定。例如，如果您使用来自 esm.sh 的 Preact 作为 JSX
库，则在配置文件中配置以下内容：
=======
### Using JSX import source in a configuration file

If you want to configure a JSX import source for a whole project, so you don't
need to insert the pragma on each module, you can use the `"compilerOptions"` in
a [configuration file](../../getting_started/configuration_file.md) to specify
this. For example if you were using Preact as your JSX library from esm.sh, you
would configure the following, in the configuration file:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "https://esm.sh/preact"
  }
}
```

<<<<<<< HEAD
### 使用 import 映射

在导入源加上 `/jsx-runtime` 或 `/jsx-dev-runtime`
后，如果不能解析正确的模块，可以使用 import 映射来指示 Deno
在哪里找到模块。也可以使用 import 映射来使导入源更“干净”。例如，如果要从
skypack.dev 使用 Preact 并在 skypack.dev 中包含所有类型信息，则可以设置 import
映射如下：
=======
### Using an import map

In situations where the import source plus `/jsx-runtime` or `/jsx-dev-runtime`
is not resolvable to the correct module, an import map can be used to instruct
Deno where to find the module. An import map can also be used to make the import
source "cleaner". For example, if you wanted to use Preact from skypack.dev and
have skypack.dev include all the type information, you could setup an import map
like this:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```json
{
  "imports": {
    "preact/jsx-runtime": "https://cdn.skypack.dev/preact/jsx-runtime?dts",
    "preact/jsx-dev-runtime": "https://cdn.skypack.dev/preact/jsx-dev-runtime?dts"
  }
}
```

<<<<<<< HEAD
然后，您可以使用以下编译指示：
=======
And then you could use the following pragma:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```jsx, ignore
/** @jsxImportSource preact */
```

<<<<<<< HEAD
或者您可以在编译器选项中进行配置：
=======
Or you could configure it in the compiler options:
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

<<<<<<< HEAD
然后，您需要在命令行上传递 `--import-map` 选项（如果使用配置文件，则还需要传递
`--config` 选项）或者在 IDE 中设置 `deno.importMap` 选项（以及 `deno.config`
选项）。

### 当前限制

目前 JSX 导入源支持的有两个限制:

- 当没有任何导入或导出的 JSX 模块在类型检查时不能正确地转译（请参见:
  [microsoft/TypeScript#46723](https://github.com/microsoft/TypeScript/issues/46723)）。将在运行时看到关于
  `_jsx` 未定义的错误。要解决这个问题，将 `export {}` 添加到文件中或使用
  `--no-check` 标志，这将使得该模块可以正确地输出。
- 使用 `"jsx-reactdev"` 编译器选项与 `--no-emit`/打包/编译不兼容（请参见:
  [swc-project/swc#2656](https://github.com/swc-project/swc/issues/2656)）。将出现各种有关无法加载
  `jsx-runtime` 模块的运行时错误。要解决此问题，改用 `"jsx-react"`
  编译器选项，或者不要使用 `--no-emit`、打包或编译。
=======
You would then need to pass the `--import-map` option on the command line (along
with the `--config` option is using a config file) or set the `deno.importMap`
option (and `deno.config` option) in your IDE.

### Current limitations

There are two current limitations of the support of the JSX import source:

- A JSX module that does not have any imports or exports is not transpiled
  properly when type checking (see:
  [microsoft/TypeScript#46723](https://github.com/microsoft/TypeScript/issues/46723)).
  Errors will be seen at runtime about `_jsx` not being defined. To work around
  the issue, add `export {}` to the file or use the `--no-check` flag which will
  cause the module to be emitted properly.
- Using `"jsx-reactdev"` compiler option is not supported with
  `--no-emit`/bundling/compiling (see:
  [swc-project/swc#2656](https://github.com/swc-project/swc/issues/2656)).
  Various runtime errors will occur about not being able to load `jsx-runtime`
  modules. To work around the issue, use the `"jsx-react"` compiler option
  instead, or don't use `--no-emit`, bundling or compiling.
>>>>>>> f66f5ac99824533702df0e6b89a7e4d862da402f
