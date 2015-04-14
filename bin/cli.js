#!/usr/bin/env node
var stderr = require('../')

var argv = process.argv.slice(2)
stderr(argv.shift(), argv)
