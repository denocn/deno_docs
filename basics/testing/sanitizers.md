<<<<<<< HEAD
# 测试消毒剂

测试运行程序提供了几种消毒剂，以确保测试的行为是合理和符合预期的。

## 资源消毒剂

Deno 中的某些操作会创建资源，这些资源将存储在资源表中
（[在此处了解更多](../../references/contributing/architecture.md)）。

在使用这些资源后，应将它们关闭。

对于每个测试定义，测试运行程序都会检查此测试中创建的所有资源是否已关闭。这样可以防止资源泄漏。对于所有测试，默认启用此选项，但可以通过在测试定义中将
`sanitizeResources` 布尔值设置为 false 来禁用它。
=======
# Test Sanitizers

The test runner offers several sanitizers to ensure that the test behaves in a
reasonable and expected way.

## Resource sanitizer

Certain actions in Deno create resources in the resource table
([learn more here](../../references/contributing/architecture.md)).

These resources should be closed after you are done using them.

For each test definition, the test runner checks that all resources created in
this test have been closed. This is to prevent resource 'leaks'. This is enabled
by default for all tests, but can be disabled by setting the `sanitizeResources`
boolean to false in the test definition.
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```ts
Deno.test({
  name: "leaky resource test",
  async fn() {
    await Deno.open("hello.txt");
  },
  sanitizeResources: false,
});
```

<<<<<<< HEAD
## Op 消毒剂

对于像与文件系统交互等异步操作也是同样如此。测试运行程序检查测试中启动的每个操作是否在测试结束之前完成。对于所有测试，默认启用此选项，但可以通过在测试定义中将
`sanitizeOps` 布尔值设置为 false 来禁用它。
=======
## Op sanitizer

The same is true for async operation like interacting with the filesystem. The
test runner checks that each operation you start in the test is completed before
the end of the test. This is enabled by default for all tests, but can be
disabled by setting the `sanitizeOps` boolean to false in the test definition.
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```ts
Deno.test({
  name: "leaky operation test",
  fn() {
    crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode("a".repeat(100000000)),
    );
  },
  sanitizeOps: false,
});
```

<<<<<<< HEAD
## 退出消毒剂

还有退出消毒剂，它可以确保被测试的代码不会调用 `Deno.exit()` 以表示测试通过。

对于所有测试，默认启用此选项，但可以通过在测试定义中将 `sanitizeExit`
布尔值设置为 false 来禁用它。
=======
## Exit sanitizer

There's also the exit sanitizer which ensures that tested code doesn't call
`Deno.exit()` signaling a false test success.

This is enabled by default for all tests, but can be disabled by setting the
`sanitizeExit` boolean to false in the test definition.
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6

```ts
Deno.test({
  name: "false success",
  fn() {
    Deno.exit(0);
  },
  sanitizeExit: false,
});

<<<<<<< HEAD
// 由于进程在“false success”测试期间退出，因此此测试永远不会运行
=======
// This test never runs, because the process exits during "false success" test
>>>>>>> 32dbb0e3cc471040eb7db9ffed0e0938276720d6
Deno.test({
  name: "failing test",
  fn() {
    throw new Error("this test fails");
  },
});
```
