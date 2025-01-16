import winston from 'winston';
import type { Logger, LoggerOptions } from 'winston';

function getSpaces(level: string): string {
  if (level.indexOf('warning') > -1) {
    return ' ';
  }
  if (level.indexOf('notice') > -1) {
    return '  ';
  }
  if (level.indexOf('emerg') > -1 ||
      level.indexOf('alert') > -1 ||
      level.indexOf('error') > -1 ||
      level.indexOf('debug') > -1) {
    return '   ';
  }
  if (level.indexOf('info') > -1 ||
      level.indexOf('crit') > -1) {
    return '    ';
  }
  return '';
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
});

interface LoggerInfo {
  timestamp?: string;
  level: string;
  message: string;
  stack?: string;
}

const options: LoggerOptions = {
  levels: winston.config.syslog.levels,
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf((info: LoggerInfo) => {
      if (info.stack) {
        return `${info.stack}`;
      }
      return '';
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf((info: LoggerInfo) => {
      const timestamp = info.timestamp;
      const level = info.level;
      const message = info.message;
      const stack = info.stack;
      const spaces = getSpaces(level);

      if (stack) {
        return `${timestamp}${colorizer.colorize(level, ` ${level}:${spaces}${stack}`)}`;
      } else {
        return `${timestamp}${colorizer.colorize(level, ` ${level}:${spaces}${message}`)}`;
      }
    })
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'info',
      handleExceptions: true
    })
  ]
};

const log = winston.createLogger(options);

const wrapper = (original: any): any => {
  return ((...args: any[]): Logger => {
    if (args.length === 0) return original('');
    
    const formattedArgs = args.map(arg => {
      if (arg instanceof Error) {
        return `${arg.message} ${arg.stack || ''}`;
      }
      return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
    });
    
    return original(formattedArgs.join(' '));
  });
};

log.emerg = wrapper(log.emerg.bind(log));
log.alert = wrapper(log.alert.bind(log));
log.crit = wrapper(log.crit.bind(log));
log.error = wrapper(log.error.bind(log));
log.warning = wrapper(log.warning.bind(log));
log.notice = wrapper(log.notice.bind(log));
log.info = wrapper(log.info.bind(log));
log.debug = wrapper(log.debug.bind(log));

export default log;
