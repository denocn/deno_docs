<<<<<<< HEAD
## Compiling Executables {#compiling-executables}
=======
# Compiling Executables
>>>>>>> abe2a87f2b55ed14182cacd4a41f01aa3548c400

`deno compile [--output <OUT>] <SRC>` will compile the script into a
self-contained executable.

```
> deno compile https://deno.land/std/examples/welcome.ts
```

If you omit the `OUT` parameter, the name of the executable file will be
inferred.

<<<<<<< HEAD
### Flags {#flags}
=======
## Flags
>>>>>>> abe2a87f2b55ed14182cacd4a41f01aa3548c400

As with [`deno install`](./script_installer.md), the runtime flags used to
execute the script must be specified at compilation time. This includes
permission flags.

```
> deno compile --allow-read --allow-net https://deno.land/std/http/file_server.ts
```

[Script arguments](../getting_started/command_line_interface.md#script-arguments)
can be partially embedded.

```
> deno compile --allow-read --allow-net https://deno.land/std/http/file_server.ts -p 8080
> ./file_server --help
```

<<<<<<< HEAD
### Cross Compilation {#cross-compilation}
=======
## Cross Compilation
>>>>>>> abe2a87f2b55ed14182cacd4a41f01aa3548c400

You can compile binaries for other platforms by adding the `--target` CLI flag.
Deno currently supports compiling to Windows x64, macOS x64, macOS ARM and Linux
x64. Use `deno compile --help` to list the full values for each compilation
target.

## Unavailable in executables

- [Workers](../runtime/workers.md)
- Dynamic Imports
- [Web Storage API](../runtime/web_storage_api.md)
