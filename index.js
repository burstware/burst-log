const winston = require('winston')

function getSpaces (level) {
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

// should allow passing debug as an option
options.level = 'debug'

const log = winston.createLogger(options)

// Bodge to accept multiple args
const wrapper = (original) => {
  return (...args) => original(args.join(' '))
}

log.emerg = wrapper(log.emerg)
log.alert = wrapper(log.alert)
log.crit = wrapper(log.crit)
log.error = wrapper(log.error)
log.warning = wrapper(log.warning)
log.notice = wrapper(log.notice)
log.info = wrapper(log.info)
log.debug = wrapper(log.debug)

module.exports = log
