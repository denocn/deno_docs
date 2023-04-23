<<<<<<< HEAD
# 通过 CDN 使用 npm

目前，大多数开发者通过使用其中一种 CDN 导入 npm 模块来在 Deno
中使用它们。你可以在你的 Deno 代码中或直接在你的浏览器中引用 CDN 的 URL 作为 ES
Module。这些 CDN URL 可以重复使用，它们也提供了如何在
Deno、浏览器等中使用的说明。

从 Deno release 1.28 开始，Deno 还提供了稳定支持
[`npm:` specifiers](./npm_specifiers.md)，这是一种在 Deno 中使用 npm
模块的新方式。

从 Deno release 1.31 开始，如果存在，则 Deno 支持解析
[package.json 中的 npm 依赖项](./package_json.md)。

### esm.sh

[esm.sh](https://esm.sh/) 是一个专门为 Deno 设计的 CDN，虽然解决 Deno
的问题也使它成为了访问 npm packages 的 ES Module bundles 的通用 CDN。esm.sh 使用
[esbuild](https://esbuild.github.io/) 来处理任意 npm package，并确保它可以作为
ES Module 使用。在许多情况下，你可以将 npm package 导入到你的 Deno 应用程序中：
=======
# npm via CDNs

Most developers currently use npm modules in Deno by importing them using one of
many CDNs. You can reference the CDN URL in your Deno code or directly in your
browser as an ES Module. These CDN URLs are reusable - they also provide
instructions on how to be used in Deno, the browser, etc.

**Starting with Deno release 1.28**, Deno also offers stabilized support for
[`npm:` specifiers](./npm_specifiers.md), which are a new way of using npm
modules in Deno.

**Starting with Deno release 1.31**, Deno supports resolving npm dependencies
[from package.json](./package_json.md) if it exists.

### esm.sh

[esm.sh](https://esm.sh/) is a CDN that was specifically designed for Deno,
though addressing the concerns for Deno also makes it a general purpose CDN for
accessing npm packages as ES Module bundles. esm.sh uses
[esbuild](https://esbuild.github.io/) to take an arbitrary npm package and
ensure that it is consumable as an ES Module. In many cases you can just import
the npm package into your Deno application:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx
import React from "https://esm.sh/react";

export default class A extends React.Component {
  render() {
    return <div></div>;
  }
}
```

esm.sh 支持使用特定版本的 packages，以及使用 [semver](https://semver.npmjs.com/)
版本的 packages，因此，在导入它时，你可以以类似于 `package.json`
文件的方式表示你的依赖关系。例如，要获取特定版本的 package：

```tsx
import React from "https://esm.sh/react@17.0.2";
```

或获取一个次要版本的最新补丁发布：

```tsx
import React from "https://esm.sh/react@~16.13.0";
```

<<<<<<< HEAD
或导入子模块：
=======
Or to get a submodule:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx
import { renderToString } from "https://esm.sh/react-dom/server";
```

<<<<<<< HEAD
或导入常规文件：
=======
Or to import regular files:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```tsx, ignore
import "https://esm.sh/tailwindcss/dist/tailwind.min.css";
```

<<<<<<< HEAD
esm.sh 还会自动设置一个 header，Deno 识别该 header 使得 Deno 可以检索
package/module 的类型定义。关于如何使用该 header，请参阅本手册中的
[Using `X-TypeScript-Types` header](../advanced/typescript/types.md#using-x-typescript-types-header)。

esm.sh 还提供有关如何自托管 CDN 的信息，请参见
[self hosting the CDN](https://github.com/ije/esm.sh/blob/main/HOSTING.md)。

有关 CDN 如何使用和具有哪些功能的更详细信息，请查看
[esm.sh homepage](https://esm.sh/)。

### UNPKG

[UNPKG](https://unpkg.com/) 是最知名的 npm packages 的 CDN。对于在其 ES Module
distribution 中包括浏览器等项目的 package，你可以直接从 UNPKG
使用它们。尽管如此，所有在 UNPKG 上可用的资源都可以在更适合 Deno 的 CDN 上使用。

### JSPM

[jspm.io](https://jspm.io) CDN 是专门设计为以适合 import maps 的方式提供 npm
和其他 registry packages 作为 ES Modules。虽然它目前还不支持 Deno，但是由于 Deno
可以使用 import maps，因此你可以使用
[JSPM.io generator](https://generator.jspm.io/) 生成你想要使用的所有 packages 的
import-map，并从 CDN 中提供这些 packages。
=======
esm.sh also automatically sets a header which Deno recognizes that allows Deno
to be able to retrieve type definitions for the package/module. See
[Using `X-TypeScript-Types` header](../advanced/typescript/types.md#using-x-typescript-types-header)
in this manual for more details on how this works.

esm.sh also provides information on
[self hosting the CDN](https://github.com/ije/esm.sh/blob/main/HOSTING.md).

Check out the [esm.sh homepage](https://esm.sh/) for more detailed information
on how the CDN can be used and what features it has.

### UNPKG

[UNPKG](https://unpkg.com/) is the most well known CDN for npm packages. For
packages that include an ES Module distribution for things like the browsers,
many of them can be used directly off of UNPKG. That being said, everything
available on UNPKG is available on more Deno friendly CDNs.

### JSPM

The [jspm.io](https://jspm.io) CDN is specifically designed to provide npm and
other registry packages as ES Modules in a way that works well with import maps.
While it doesn't currently cater to Deno, the fact that Deno can utilize import
maps, allows you to use the [JSPM.io generator](https://generator.jspm.io/) to
generate an import-map of all the packages you want to use and have them served
up from the CDN.
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
