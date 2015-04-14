# stderr

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

> Flash an OS notification when a process writes to `stderr`

![Demo](preview.gif)

## Install

```
npm install stderr --save
```

or

```
npm install stderr -g
```

## Usage

stderr exports one, single function. Require it and pass in a command, an array of arguments, and (optional) options.

```js
var stderr = require('stderr')
stderr('ls', ['-la'])
```

This is the same API (and options) as [`child_process.spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options). All options other than `stdio` will be passed through.

## CLI

The cli is made to be as simple as possible. Simply prefix your command with `stderr` like so:

```
stderr ls -la
```

Commands and their output will be exactly like normal. The only exception being that if the process writes to `stderr` a system notification will appear letting you know something went wrong.

## Why

Say Tom is using something like [watchify](https://github.com/substack/watchify) to monitor his JavaScript files and create a new bundle every time a file is updated. At some point while Tom is writing his JavaScript he misses a closing bracket. He keeps refreshing his web browser, wondering what is wrong with his JavaScript and why the bundle isn't updating. He then kicks himself for not realizing it before and switches over to his terminal finding a helpful error message awaiting him.

With stderr, Tom just prepends the word `stderr` to his `watchify` command and now his computer magically notifies him that he stupidly missed a closing bracket. This saves him time and needless refreshing.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidelines.

## License

[ISC](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/stderr.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/stderr
[travis-image]: https://img.shields.io/travis/paulcpederson/stderr.svg?style=flat-square
[travis-url]: https://travis-ci.org/paulcpederson/stderr
