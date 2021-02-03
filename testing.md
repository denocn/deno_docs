# Testing {#testing}

Deno has a built-in test runner that you can use for testing JavaScript or
TypeScript code.

## Writing tests {#writing-tests}

To define a test you need to call `Deno.test` with a name and function to be
tested. There are two styles you can use.

```ts
import { assertEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";

// Simple name and function, compact form, but not configurable
Deno.test("hello world #1", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

// Fully fledged test definition, longer form, but configurable (see below)
Deno.test({
  name: "hello world #2",
  fn: () => {
    const x = 1 + 2;
    assertEquals(x, 3);
  },
});
```

## Assertions {#assertions}

There are some useful assertion utilities at
https://deno.land/std@$STD_VERSION/testing#usage to make testing easier:

```ts
import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";

Deno.test("hello world", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
  assertArrayIncludes([1, 2, 3, 4, 5, 6], [3], "Expected 3 to be in the array");
});
```

### Async functions {#async-functions}

You can also test asynchronous code by passing a test function that returns a
promise. For this you can use the `async` keyword when defining a function:

```ts
import { delay } from "https://deno.land/std@$STD_VERSION/async/delay.ts";

Deno.test("async hello world", async () => {
  const x = 1 + 2;

  // await some async task
  await delay(100);

  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
```

### Resource and async op sanitizers {#resource-and-async-op-sanitizers}

Certain actions in Deno create resources in the resource table
([learn more here](./contributing/architecture.md)). These resources should be
closed after you are done using them.

For each test definition, the test runner checks that all resources created in
this test have been closed. This is to prevent resource 'leaks'. This is enabled
by default for all tests, but can be disabled by setting the `sanitizeResources`
boolean to false in the test definition.

The same is true for async operation like interacting with the filesystem. The
test runner checks that each operation you start in the test is completed before
the end of the test. This is enabled by default for all tests, but can be
disabled by setting the `sanitizeOps` boolean to false in the test definition.

```ts
Deno.test({
  name: "leaky test",
  fn() {
    Deno.open("hello.txt");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
```

## Running tests {#running-tests}

To run the test, call `deno test` with the file that contains your test
function. You can also omit the file name, in which case all tests in the
current directory (recursively) that match the glob
`{*_,*.,}test.{js,mjs,ts,jsx,tsx}` will be run. If you pass a directory, all
files in the directory that match this glob will be run.

```shell
# Run all tests in the current directory and all sub-directories
deno test

# Run all tests in the util directory
deno test util/

# Run just my_test.ts
deno test my_test.ts
```

`deno test` uses the same permission model as `deno run` and therefore will
require, for example, `--allow-write` to write to the file system during
testing.

To see all runtime options with `deno test`, you can reference the command line
help:

```shell
deno help test
```

## Filtering {#filtering}

There are a number of options to filter the tests you are running.

### Command line filtering {#command-line-filtering}

Tests can be run individually or in groups using the command line `--filter`
option.

The filter flags accept a string or a pattern as value.

Assuming the following tests:

```ts
Deno.test({ name: "my-test", fn: myTest });
Deno.test({ name: "test-1", fn: test1 });
Deno.test({ name: "test2", fn: test2 });
```

This command will run all of these tests because they all contain the word
"test".

```shell
deno test --filter "test" tests/
```

On the flip side, the following command uses a pattern and will run the second
and third tests.

```shell
deno test --filter "/test-*\d/" tests/
```

_To let Deno know that you want to use a pattern, wrap your filter with
forward-slashes like the JavaScript syntactic sugar for a REGEX._

### Test definition filtering {#test-definition-filtering}

Within the tests themselves, you have two options for filtering.

#### Filtering out (Ignoring these tests) {#filtering-out-ignoring-these-tests}

Sometimes you want to ignore tests based on some sort of condition (for example
you only want a test to run on Windows). For this you can use the `ignore`
boolean in the test definition. If it is set to true the test will be skipped.

```ts
Deno.test({
  name: "do macOS feature",
  ignore: Deno.build.os !== "darwin",
  fn() {
    doMacOSFeature();
  },
});
```

#### Filtering in (Only run these tests) {#filtering-in-only-run-these-tests}

Sometimes you may be in the middle of a problem within a large test class and
you would like to focus on just that test and ignore the rest for now. For this
you can use the `only` option to tell the test framework to only run tests with
this set to true. Multiple tests can set this option. While the test run will
report on the success or failure of each test, the overall test run will always
fail if any test is flagged with `only`, as this is a temporary measure only
which disables nearly all of your tests.

```ts
Deno.test({
  name: "Focus on this test only",
  only: true,
  fn() {
    testComplicatedStuff();
  },
});
```

## Failing fast {#failing-fast}

If you have a long running test suite and wish for it to stop on the first
failure, you can specify the `--fail-fast` flag when running the suite.

```shell
deno test --fail-fast
```

## Test coverage {#test-coverage}

Deno will automatically determine test coverage for your code if you specify the
`--coverage` flag when starting `deno test`. Coverage is determined on a line by
line basis for modules that share the parent directory with at-least one test
module that is being executed.

This coverage information is acquired directly from the JavaScript engine (V8).
Because of this, the coverage reports are very accurate.

When all tests are done running a summary of coverage per file is printed to
stdout. In the future there will be support for `lcov` output too.

```
$ git clone git@github.com:denosaurs/deno_brotli.git && cd deno_brotli
$ deno test --coverage --unstable
Debugger listening on ws://127.0.0.1:9229/ws/5a593019-d185-478b-a928-ebc33e5834be
Check file:///home/deno/deno_brotli/$deno$test.ts
running 2 tests
test compress ... ok (26ms)
test decompress ... ok (13ms)

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (40ms)

test coverage:
file:///home/deno/deno_brotli/mod.ts 100.000%
file:///home/deno/deno_brotli/wasm.js 100.000%
```
