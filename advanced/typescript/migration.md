<<<<<<< HEAD:typescript/migration.md
## Migrating to and from JavaScript {#migrating-to-and-from-javascript}
=======
# Migrating to and from JavaScript
>>>>>>> 0bd9bb8ec404ca5f4e983086a5b8fe2b65d590f5:advanced/typescript/migration.md

One of the advantages of Deno is that it treats TypeScript and JavaScript pretty
equally. This might mean that transitioning from JavaScript to TypeScript or
even from TypeScript to JavaScript is something you want to accomplish. There
are several features of Deno that can help with this.

<<<<<<< HEAD:typescript/migration.md
### Type checking JavaScript {#type-checking-javascript}
=======
## Type checking JavaScript
>>>>>>> 0bd9bb8ec404ca5f4e983086a5b8fe2b65d590f5:advanced/typescript/migration.md

You might have some JavaScript that you would like to ensure is more type sound
but you don't want to go through a process of adding type annotations
everywhere.

Deno supports using the TypeScript type checker to type check JavaScript. You
can mark any individual file by adding the check JavaScript pragma to the file:

```js
// @ts-check
```

This will cause the type checker to infer type information about the JavaScript
code and raise any issues as diagnostic issues.

These can be turned on for all JavaScript files in a program by providing a
configuration file with the check JS option enabled:

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

And setting the `--config` option on the command line.

<<<<<<< HEAD:typescript/migration.md
### Using JSDoc in JavaScript {#using-jsdoc-in-javascript}
=======
## Using JSDoc in JavaScript
>>>>>>> 0bd9bb8ec404ca5f4e983086a5b8fe2b65d590f5:advanced/typescript/migration.md

If you are type checking JavaScript, or even importing JavaScript into
TypeScript you can use JSDoc in JavaScript to express more types information
than can just be inferred from the code itself. Deno supports this without any
additional configuration, you simply need to annotate the code in line with the
supported
[TypeScript JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).
For example to set the type of an array:

```js
/** @type {string[]} */
const a = [];
```

<<<<<<< HEAD:typescript/migration.md
### Skipping type checking {#skipping-type-checking}
=======
## Skipping type checking
>>>>>>> 0bd9bb8ec404ca5f4e983086a5b8fe2b65d590f5:advanced/typescript/migration.md

You might have TypeScript code that you are experimenting with, where the syntax
is valid but not fully type safe. You can always bypass type checking for a
whole program by passing the `--no-check`.

You can also skip whole files being type checked, including JavaScript if you
have check JS enabled, by using the no-check pragma:

```js
// @ts-nocheck
```

<<<<<<< HEAD:typescript/migration.md
### Just renaming JS files to TS files {#just-renaming-js-files-to-ts-files}
=======
## Just renaming JS files to TS files
>>>>>>> 0bd9bb8ec404ca5f4e983086a5b8fe2b65d590f5:advanced/typescript/migration.md

While this might work in some cases, it has some severe limits in Deno. This is
because Deno, by default, runs type checking in what is called _strict mode_.
This means a lot of unclear or ambiguous situations where are not caught in
non-strict mode will result in diagnostics being generated, and JavaScript is
nothing but unclear and ambiguous when it comes to types.
