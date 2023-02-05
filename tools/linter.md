<<<<<<< HEAD
## Linter {#linter}
=======
# Linter
>>>>>>> baf5c8d4040e9c71457ce377be2b3c16c2fc9145

Deno ships with a built-in code linter for JavaScript and TypeScript.

```shell
# lint all JS/TS files in the current directory and subdirectories
deno lint
# lint specific files
deno lint myfile1.ts myfile2.ts
# lint all JS/TS files in specified directory and subdirectories
deno lint src/
# print result as JSON
deno lint --json
# read from stdin
cat file.ts | deno lint -
```

For more detail, run `deno lint --help`.

<<<<<<< HEAD
### Available rules {#available-rules}
=======
## Available rules
>>>>>>> baf5c8d4040e9c71457ce377be2b3c16c2fc9145

For a complete list of supported rules visit
[the deno_lint rule documentation](https://lint.deno.land).

<<<<<<< HEAD
### Ignore directives {#ignore-directives}

#### Files {#files}
=======
## Ignore directives

### Files
>>>>>>> baf5c8d4040e9c71457ce377be2b3c16c2fc9145

To ignore whole file `// deno-lint-ignore-file` directive should placed at the
top of the file:

```ts
// deno-lint-ignore-file

function foo(): any {
  // ...
}
```

Ignore directive must be placed before first statement or declaration:

```ts, ignore
// Copyright 2020 the Deno authors. All rights reserved. MIT license.

/**
 * Some JS doc
 */

// deno-lint-ignore-file

import { bar } from "./bar.js";

function foo(): any {
  // ...
}
```

You can also ignore certain diagnostics in the whole file

```ts
// deno-lint-ignore-file no-explicit-any no-empty

function foo(): any {
  // ...
}
```

<<<<<<< HEAD
#### Diagnostics {#diagnostics}
=======
### Diagnostics
>>>>>>> baf5c8d4040e9c71457ce377be2b3c16c2fc9145

To ignore certain diagnostic `// deno-lint-ignore <codes...>` directive should
be placed before offending line. Specifying ignored rule name is required:

```ts
// deno-lint-ignore no-explicit-any
function foo(): any {
  // ...
}

// deno-lint-ignore no-explicit-any explicit-function-return-type
function bar(a: any) {
  // ...
}
```

## Configuration

Starting with Deno v1.14 a linter can be customized using either
[a configuration file](../getting_started/configuration_file.md) or following
CLI flags:

- `--rules-tags` - List of tag names that will be run. Empty list disables all
  tags and will only use rules from `include`. Defaults to "recommended".

- `--rules-exclude` - List of rule names that will be excluded from configured
  tag sets. Even if the same rule is in `include` it will be excluded; in other
  words, `--rules-exclude` has higher precedence over `--rules-include`.

- `--rules-include` - List of rule names that will be run. If the same rule is
  in `exclude` it will be excluded.
