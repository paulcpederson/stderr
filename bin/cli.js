#!/usr/bin/env node
var errify = require('../')

var argv = process.argv.slice(2)
errify(argv.shift(), argv)
