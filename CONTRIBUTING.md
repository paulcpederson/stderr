# Contributing

> Contributions are welcome!

## Installation

1. Fork and clone the repo
2. `cd errify && npm intall`
3. `npm link`

This will set up everything you need to develop and test. The `npm link` gives you access to the `errify` command which is important for testing.

## Code Style

Code style and conventions are automatically checked when you run `npm test` with [standard](https://www.npmjs.com/package/standard).

## Testing

Tests are written with [tape](https://www.npmjs.com/package/tape) and run with [faucet](https://www.npmjs.com/package/faucet).

Before opening a pull request, make sure you can run `npm test` with no errors. If you add a new feature, you should also write tests for it! Find a bug? Write a failing test!
