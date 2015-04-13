var notifier = require('node-notifier')
var spawn = require('child_process').spawn
var util = require('util')

var errify = function (command, args, options) {
  options = options || {}
  options.stdio = [process.stdin, process.stdout, 'pipe']

  var child = spawn(command, args, options)
  child.stderr.on('data', function (data) {
    notifier.notify({
      'title': util.format('Error running %s %s', command, args.join(' ')),
      'message': data.toString('utf8')
    })
    process.stderr.write(data)
  })
}

module.exports = errify
