## WebAssembly 支持 {#webassembly-support}

Deno 可以用与[浏览器提供](https://developer.mozilla.org/en-US/docs/WebAssembly)相同的接口来执行
[WebAssembly](https://webassembly.org/) 模块。

<!-- deno-fmt-ignore -->

```ts
// This WASM binary exports a `main` function that just returns `42` upon
// invocation.
const wasmCode = new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 133, 128, 128, 128, 0, 1, 96, 0, 1, 127,
  3, 130, 128, 128, 128, 0, 1, 0, 4, 132, 128, 128, 128, 0, 1, 112, 0, 0,
  5, 131, 128, 128, 128, 0, 1, 0, 1, 6, 129, 128, 128, 128, 0, 0, 7, 145,
  128, 128, 128, 0, 2, 6, 109, 101, 109, 111, 114, 121, 2, 0, 4, 109, 97,
  105, 110, 0, 0, 10, 138, 128, 128, 128, 0, 1, 132, 128, 128, 128, 0, 0,
  65, 42, 11
]);
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule);
const main = wasmInstance.exports.main as CallableFunction
console.log(main().toString());
```

从文件中加载：

```ts
const wasmCode = await Deno.readFile("main.wasm");
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule);
const main = wasmInstance.exports.main as CallableFunction;
console.log(main().toString());
```

And for loading WebAssembly modules over the network (note that the file must be
served with `application/wasm` MIME type):

```ts
const { instance, module } = await WebAssembly.instantiateStreaming(
  fetch("https://wpt.live/wasm/incrementer.wasm"),
);
const increment = instance.exports.increment as (input: number) => number;
console.log(increment(41));
```
