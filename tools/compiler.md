## Compiling Executables {#compiling-executables}

> Since the compile functionality is relatively new, the `--unstable` flag has
> to be set in order for the command to work.

`deno compile [--output <OUT>] <SRC>` will compile the script into a
self-contained executable.

```
> deno compile --unstable https://deno.land/std/examples/welcome.ts
```

If you omit the `OUT` parameter, the name of the executable file will be
inferred.

### Flags {#flags}

As with [`deno install`](./script_installer.md), the runtime flags used to
execute the script must be specified at compilation time. This includes
permission flags.

```
> deno compile --unstable --allow-read --allow-net https://deno.land/std/http/file_server.ts
```

[Script arguments](../getting_started/command_line_interface.md#script-arguments)
can be partially embedded.

```
> deno compile --unstable --allow-read --allow-net https://deno.land/std/http/file_server.ts -p 8080
> ./file_server --help
```

### Cross Compilation {#cross-compilation}

You can use cross compilation by adding `--target` CLI argument, benefiting that
you can create binaries for other platforms in single CI machine. Deno supports
compiling to Windows x64, macOS x64, macOS ARM and Linux x64 currently. Use
`deno compile --help` to get the full list about compilation targets.

### Generating smaller binaries {#generating-smaller-binaries}

Once `--lite` argument is passed, `deno compile` will use a slimmed-down
runtime-only binary.
