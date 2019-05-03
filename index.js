const winston = require('winston')

function getSpaces (level) {
  // There are control characters so equality doesn't work
  // console.log('level', level)
  // console.log('buffer level', Buffer.from(level, 'utf-8').toString('hex'))
  // console.log('buffer literal', Buffer.from('info', 'utf-8').toString('hex'))
  if (level.indexOf('warning') > -1) {
    return ' '
  }
  if (level.indexOf('notice') > -1) {
    return '  '
  }
  if (level.indexOf('emerg') > -1 ||
      level.indexOf('alert') > -1 ||
      level.indexOf('error') > -1 ||
      level.indexOf('debug') > -1) {
    return '   '
  }
  if (level.indexOf('info') > -1 ||
      level.indexOf('crit') > -1) {
    return '    '
  }
}

const colorizer = winston.format.colorize({
  all: true,
  colors: {
    emerg: 'rainbow',
    alert: 'america',
    crit: 'magenta',
    error: 'red',
    warning: 'yellow',
    notice: 'cyan',
    info: 'blue',
    debug: 'gray'
  }
})

let options = {
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => {
      if (info.stack) {
        return `${info.stack}`
      }
    }),
    // colorizer,
    winston.format.errors({ stack: true }),
    winston.format.printf(info => {
      const timestamp = info.timestamp
      const level = info.level
      const message = info.message
      const stack = info.stack
      const spaces = getSpaces(level)

      if (stack) {
        return timestamp + colorizer.colorize(level, level, ` ${level}:${spaces}${stack}`)
      } else {
        return timestamp + colorizer.colorize(level, level, ` ${level}:${spaces}${message}`)
      }
    })
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true
    })
  ]
}

// TODO: allow passing debug as an option
options.level = 'debug'

const log = winston.createLogger(options)

module.exports = log
