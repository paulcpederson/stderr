var execSync = require('child_process').execSync
var exec = require('child_process').exec
var spawn = require('cross-spawn')
var path = require('path')
var format = require('util').format
var fixture = path.join.bind(null, __dirname, 'fixtures')
var cli = path.join(__dirname, '..', 'bin', 'cli.js')
var test = require('tape')

function execute (command) {
  return execSync(command).toString('utf8')
}

test('should display usage text if no command is passed', function (t) {
  t.plan(1)
  var bin = spawn(cli)
  bin.stderr.setEncoding('utf8')
  bin.stderr.once('data', function (data) {
    t.equal(data.trim(), 'stderr: You must pass a command to stderr')
  })
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
  var bin = spawn(cli, ['node', 'banana'])
  bin.stderr.once('data', function (data) {
    var normal = spawn('node', ['banana'])
    normal.stderr.once('data', function (normalData) {
      t.equal(normalData.toString('utf8'), data.toString('utf8'))
    })
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

test('should pass through errors', function (t) {
  t.plan(1)
  exec(format('%s banana', cli), function (err) {
    t.ok(err)
  })
})
