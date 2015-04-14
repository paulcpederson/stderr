#!/usr/bin/env node
var stderr = require('../')
var argv = process.argv.slice(2)
var command = argv.shift()

if (command) {
  stderr(command, argv)
} else {
  console.error('stderr: You must pass a command to stderr')
}
