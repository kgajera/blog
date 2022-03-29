---
slug: how-to-test-yargs-cli-with-jest
title: How to Test Yargs CLI with Jest
image: ./image.png
authors: [kgajera]
tags: [cli, jest, yargs]
---

The [yargs](http://yargs.js.org) library is my preferred library to implement a CLI. One of the challenges I've come across with yargs is figuring out how to write unit tests using [Jest](https://jestjs.io). Let me show you the pattern that I've started to use to test my commands.

<!--truncate-->

To test a yargs command, we need to do the following:

1. Set `process.argv` to the positional and option arguments to run the yargs command
1. Require the yargs CLI script
1. Use mocks and spies to verify the command handler functionality

In order to repeat the steps above to test multiple commands, we will need to delete the yargs CLI script from [`require.cache`](https://nodejs.org/api/modules.html#requirecache) after each test. We will be leveraging `jest.resetModules()` for this. If you don't clear the cache, you will see the same results from the command run in your first test in subsequent tests.

Let's use the following script as an example for which we can write tests:

```js title="cli.js"
#!/usr/bin/env node

require("yargs")
  .command(
    "install <name>",
    "Install a package",
    (yargs) => {
      yargs.positional("name", {
        type: "string",
      });
    },
    function () {
      console.log("Installing");
    }
  )
  .command(
    "uninstall <name>",
    "Uninstall a package",
    (yargs) => {
      yargs.positional("name", {
        type: "string",
      });
    },
    function () {
      console.log("Uninstalling");
    }
  )
  .help().argv;
```

This script contains two commands:

- `install <name>` that will log "Installing" to the console
- `uninstall <name>` that will log "Uninstalling" to the console

Below is a documented example of how we can test both these commands:

```js title="cli.test.js"
describe("cli", () => {
  let originalArgv;

  beforeEach(() => {
    // Remove all cached modules. The cache needs to be cleared before running
    // each command, otherwise you will see the same results from the command
    // run in your first test in subsequent tests.
    jest.resetModules();

    // Each test overwrites process arguments so store the original arguments
    originalArgv = process.argv;
  });

  afterEach(() => {
    jest.resetAllMocks();

    // Set process arguments back to the original value
    process.argv = originalArgv;
  });

  it("should run install command", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    await runCommand("install", "some-package", "--save");

    expect(consoleSpy).toBeCalledWith("Installing");
  });

  it("should run uninstall command", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    await runCommand("uninstall", "some-package");

    expect(consoleSpy).toBeCalledWith("Uninstalling");
  });
});

/**
 * Programmatically set arguments and execute the CLI script
 *
 * @param {...string} args - positional and option arguments for the command to run
 */
async function runCommand(...args) {
  process.argv = [
    "node", // Not used but a value is required at this index in the array
    "cli.js", // Not used but a value is required at this index in the array
    ...args,
  ];

  // Require the yargs CLI script
  return require("./cli");
}
```

If you want to see another example, I used this approach to write tests for the [`create-bison-app`](https://github.com/echobind/bisonapp) CLI: https://github.com/echobind/bisonapp/blob/canary/packages/create-bison-app/test/cli.test.js

Hope this helps you unit test your CLI! Get in touch with any questions or comments.
