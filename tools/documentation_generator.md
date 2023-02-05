<<<<<<< HEAD
## Documentation Generator {#documentation-generator}
=======
# Documentation Generator
>>>>>>> baf5c8d4040e9c71457ce377be2b3c16c2fc9145

`deno doc` followed by a list of one or more source files will print the JSDoc
documentation for each of the module's **exported** members.

For example, given a file `add.ts` with the contents:

```ts
/**
 * Adds x and y.
 * @param {number} x
 * @param {number} y
 * @returns {number} Sum of x and y
 */
export function add(x: number, y: number): number {
  return x + y;
}
```

Running the Deno `doc` command, prints the function's JSDoc comment to `stdout`:

```shell
deno doc add.ts
function add(x: number, y: number): number
  Adds x and y. @param {number} x @param {number} y @returns {number} Sum of x and y
```

Use the `--json` flag to output the documentation in JSON format. This JSON
format is consumed by the
[deno doc website](https://github.com/denoland/docland) and is used to generate
module documentation.
