var notifier = require('node-notifier')
var spawn = require('child_process').spawn
var util = require('util')

function notify (command, args, data) {
  try {
    return notifier.notify({
      'title': util.format('Error running %s %s', command, args.join(' ')),
      'message': data.toString('utf8')
    })
  } catch (err) {
    return false
  }
}

var stderr = function (command, args, options) {
  options = options || {}
  options.stdio = [process.stdin, process.stdout, 'pipe']

  var child = spawn(command, args, options)

  child.on('error', function (err) {
    process.stderr.write(err)
    notify(command, args, err)
  })

  child.stderr.on('data', function (data) {
    process.stderr.write(data)
    notify(command, args, data)
  })

}

module.exports = stderr
