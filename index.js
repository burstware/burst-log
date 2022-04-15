reset = "\x1b[0m"
bright = "\x1b[1m"
dim = "\x1b[2m"
underscore = "\x1b[4m"
blink = "\x1b[5m"
reverse = "\x1b[7m"
hidden = "\x1b[8m"

fgBlack = "\x1b[30m"
fgRed = "\x1b[31m"
fgGreen = "\x1b[32m"
fgYellow = "\x1b[33m"
fgBlue = "\x1b[34m"
fgMagenta = "\x1b[35m"
fgCyan = "\x1b[36m"
fgWhite = "\x1b[37m"

bgBlack = "\x1b[40m"
bgRed = "\x1b[41m"
bgGreen = "\x1b[42m"
bgYellow = "\x1b[43m"
bgBlue = "\x1b[44m"
bgMagenta = "\x1b[45m"
bgCyan = "\x1b[46m"
bgWhite = "\x1b[47m"

const log = (...args) => {
  console.log(...args)
}

const pretty = function (...args) {
  const prettyArgs = []
  for (arg of args) {
    prettyArgs.push(JSON.stringify(arg, null,2))
  }
  this(...prettyArgs)
}

const warn = (...args) => {
  console.log(`${fgYellow}%s`, ...args, reset)
}

warn.pretty = pretty


log.pretty = pretty
log.warn = warn
log.warning = warn

log('something')
log([1,2,3])
log({foo: 'bar', baz: undefined})
log.pretty({foo: 'bar', baz: undefined})
log.warn('something')
log.warn.pretty({foo: 'bar'})

/**
 * Usage:
 * 
 * log('something')
 * log([1,2,3])
 * log({foo: 'bar', baz: undefined})
 * log.pretty({foo: 'bar', baz: undefined})
 * log.warn('something')
 * log.warn.pretty({foo: 'bar'})
 */

/** TODO:
 * - hide logs if not in LOG_LEVEL
 * - finish other log types
 *  - emerg
    - alert
    - crit
    - error
    - warning (warn)
    - notice
    - info (default)
    - debug

   - add timestamp
   - move from travis to github actions
 */