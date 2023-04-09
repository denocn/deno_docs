<<<<<<< HEAD
# 使用流式 WebAssembly API

获取、编译和实例化 WebAssembly 模块最高效的方法是使用 WebAssembly API
的流式变体。例如，您可以使用 `instantiateStreaming` 结合 `fetch`
来一次完成所有三个步骤：
=======
# Using the Streaming WebAssembly APIs

The
[most efficient](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiateStreaming)
way to fetch, compile and instantiate a WebAssembly module is to use the
streaming variants of the WebAssembly API. For example, you can use
`instantiateStreaming` combined with `fetch` to perform all three steps in one
go:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
const { instance, module } = await WebAssembly.instantiateStreaming(
  fetch("https://wpt.live/wasm/incrementer.wasm"),
);

const increment = instance.exports.increment as (input: number) => number;
console.log(increment(41));
```

<<<<<<< HEAD
注意，`.wasm` 文件必须以 `application/wasm` MIME
类型进行服务。如果您想在实例化之前对模块进行更多的工作，您可以使用
`compileStreaming`：
=======
Note that the `.wasm` file must be served with the `application/wasm` MIME type.
If you want to do additional work on the module before instantiation you can
instead use `compileStreaming`:
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

```ts
const module = await WebAssembly.compileStreaming(
  fetch("https://wpt.live/wasm/incrementer.wasm"),
);

<<<<<<< HEAD
/* 进行一些额外的工作 */
=======
/* do some more stuff */
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b

const instance = await WebAssembly.instantiate(module);
instance.exports.increment as (input: number) => number;
```

<<<<<<< HEAD
如果出于某种原因您无法使用流式方法，则可以回退到较少效率的 `compile` 和
`instantiate`
方法。例如，请参阅[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate)。更深入地了解流式方法更高效的原因，请参阅[此文章](https://hacks.mozilla.org/2018/01/making-webassembly-even-faster-firefoxs-new-streaming-and-tiering-compiler/)。
=======
If for some reason you cannot make use of the streaming methods you can fall
back to the less efficient `compile` and `instantiate` methods. See for example
the
[MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate).
For a more in-depth look on what makes the streaming methods more performant,
see for example
[this post](https://hacks.mozilla.org/2018/01/making-webassembly-even-faster-firefoxs-new-streaming-and-tiering-compiler/).
>>>>>>> 5cae25fe7acffa9cdf01787f3c699c11dc1f135b
