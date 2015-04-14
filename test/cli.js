var exec = require('child_process').execSync
var spawn = require('cross-spawn')
var path = require('path')
var format = require('util').format
var fixture = path.join.bind(null, __dirname, 'fixtures')
var cli = path.join(__dirname, '..', 'bin', 'cli.js')
var test = require('tape')

function execute (command) {
  return exec(command).toString('utf8')
}

test('should display usage text if no command is passed', function (t) {
  t.plan(1)
  t.equal(execute(cli).replace(/\r\n/g, '\n'), 'stderr: You must pass a command to stderr\n')
})

test('should correctly write to stdout', function (t) {
  t.plan(1)
  var command = '%s ls -l'
  var normal = format(command, '')
  var bin = format(command, cli)
  t.equal(execute(normal), execute(bin))
})

test('should correctly write to stderr', function (t) {
  t.plan(1)
  var bin = spawn(cli, ['ls', '-l', 'banana'])
  bin.stderr.setEncoding('utf8')
  bin.stderr.once('data', function (data) {
    t.equal(data.trim(), 'ls: banana: No such file or directory')
  })
})

test('should correctly read from stdin', function (t) {
  t.plan(1)
  var file = fixture('stdin/in.txt')
  var command = 'cat %s | %s grep test'
  var normal = format(command, file, '')
  var bin = format(command, file, cli)
  t.equal(execute(normal), execute(bin))
})

// TODO: Report the original bash error, not a node error
test('should throw errors from invalid bash commands', function (t) {
  t.plan(1)
  var bin = spawn(cli, ['banana'])
  bin.once('close', function (code) {
    t.notEqual(code, 0)
  })
})
