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
  if (Buffer.from(level, 'utf-8').toString('hex') === '1b5b33316d651b5b33396d1b5b33336d6d1b5b33396d1b5b33326d651b5b33396d1b5b33346d721b5b33396d1b5b33356d671b5b33396d' || // emerg rainbow
      Buffer.from(level, 'utf-8').toString('hex') === '1b5b33316d611b5b33396d1b5b33376d6c1b5b33396d1b5b33346d651b5b33396d1b5b33316d721b5b33396d1b5b33376d741b5b33396d' || // alert usa
      level.indexOf('error') > -1 ||
      level.indexOf('debug') > -1) {
    return '   '
  }
  if (level.indexOf('info') > -1 ||
      level.indexOf('crit') > -1) {
    return '    '
  }
}

let options = {
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize({
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
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}:${getSpaces(info.level)}${info.message}`)
  ),
  transports: [
    new winston.transports.Console()
  ]
}

// TODO: allow passing debug as an option
options.level = 'debug'

const log = winston.createLogger(options)

module.exports = log
