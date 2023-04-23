<<<<<<< HEAD
# 发布模块

Deno
并不规定开发者如何提供模块，模块可以从任何源导入。为了帮助发布和分发模块，提供了独立的解决方案。

## 在 deno.land/x 上发布

发布 Deno 模块的常见方式是通过官方的 [https://deno.land/x](https://deno.land/x)
托管服务。它缓存了开源模块的发布版本，并以易于记忆的域名提供服务。

要使用它，模块必须在 GitHub
的公共存储库中开发和托管。然后在标签创建时将源代码发布到
deno.land/x。然后可以通过以下格式的 URL 访问它们：
=======
# Publishing Modules

Deno is not prescriptive about how developers make their modules
available—modules may be imported from any source. To help publish and
distribute modules, separate standalone solutions are provided.

## Publishing on deno.land/x

A common way to publish Deno modules is via the official
[https://deno.land/x](https://deno.land/x) hosting service. It caches releases
of open source modules and serves them at one easy to remember domain.

To use it, modules must be developed and hosted in public repositories on
GitHub. Their source is then published to deno.land/x on tag creation. They can
then be accessed by using a url in the following format:
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51

```
https://deno.land/x/<module_name>@<tag_name>/<file_path>
```

<<<<<<< HEAD
模块版本是持久且不可变的。因此，不可能编辑或删除模块（或版本），以防止依赖此模块的程序出现错误。如果有法律原因需要删除模块，则可以删除模块。有关更多详细信息，请参阅
[添加模块](https://deno.land/add_module)。

## 自动为模块生成文档

发布模块时，会分析模块的内容。一种自动化过程识别包含 Deno
可理解代码的模块并基于代码生成文档。对于每个路径，包括根路径，它尝试标识默认模块。按优先顺序查找具有
Deno 可理解扩展名（ts、tsx、js、jsx、mjs 或 mts）的 "mod"、"lib"、"main" 或
"index" 文件。在查看路径的模块文档时，将显示默认模块。

如果无法识别默认模块，则提供可以记录文档的模块列表。在生成文档时，不仅解析实际代码以生成文档，还使用
JSDoc（/ ** /）形式的内联文档来丰富文档。许多 JSDoc
标记都受支持。要提供模块级文档（也成为包含在默认模块中时的路径级文档），请在模块的第一个
JSDoc 块末尾使用 @module 标记。

## 为 Node.js/npm 发布 Deno 模块

我们构建了一个工具，可协助将专门用于 Deno 的代码发布到 npm，在 Node.js 或
JavaScript 生态系统的其他部分下运行。请参阅
[dnt - Deno to Node.js Transform](./publishing/dnt.md)。
=======
Module versions are persistent and immutable. It is thus not possible to edit or
delete a module (or version), to prevent breaking programs that rely on this
module. Modules may be removed if there is a legal reason to do so (for example
copyright infringement).

For more details, see [Adding a Module](https://deno.land/add_module).

## Auto-generating documentation for modules

When a module is published, the contents of the module is analyzed. An automated
process identifies modules that contain code that Deno understands and generates
documentation based on the code. For each path, including the root path, it
attempts to identify the default module. In order of preference it looks for
`mod`, `lib`, `main`, or `index` files with an extension that Deno understands
(ts,tsx,js,jsx,mjs, or mts). When viewing the documentation for the module for a
path, the default module will shown.

If a default module cannot be identified, a list of modules that can be
documented will be provided instead. When generating the documentation, not only
is the actual code parsed to generate it, inline documentation, in the form of
JSDoc (/** */) is used to enrich the documentation. Many JSDoc tags are
supported. To provide module level documentation (which also becomes the path
level documentation when it is included in a default module), use the @module
tag at the end of the first JSDoc block in the module.

## Publishing Deno modules for Node.js/npm

We have built a tool that assists in the process of taking Deno specific code
and publishing it to npm to work under Node.js or other parts of the JavaScript
ecosystem. See [dnt - Deno to Node.js Transform](./publishing/dnt.md).
>>>>>>> 500f1f0131c56360b81018fb92e6a15cc5cf6d51
