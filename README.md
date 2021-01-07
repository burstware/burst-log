# Burst Log [![Build Status](https://travis-ci.com/JBaczuk/burst-log.svg?token=29qnEeDFvpCBmjssZsMZ&branch=master)](https://travis-ci.com/JBaczuk/burst-log) [![Coverage](https://img.shields.io/badge/coverage-0%25-red)](https://www.npmjs.org/@burstware/burst-log)

[<img src="https://s3-us-west-2.amazonaws.com/burstware.com/img/burstware+horizontal.png" width="50%" />](https://burstware.com)

[![NPM](https://img.shields.io/badge/npm-1.1.0-blue)](https://www.npmjs.org/@burstware/burst-log)

Burst logging tool

## Usage
The following values are available for log levels on the `LOG_LEVEL` environment variable:
* `emerg`
* `alert`
* `crit`
* `error`
* `warning`
* `notice`
* `info` (default)
* `debug`

```javascript
const log = require('@burstware/burst-log')

log.emerg("127.0.0.1 - there's no place like home")
log.alert("127.0.0.1 - there's no place like home")
log.crit("127.0.0.1 - there's no place like home")
log.error("127.0.0.1 - there's no place like home")
log.warning("127.0.0.1 - there's no place like home")
log.notice("127.0.0.1 - there's no place like home")
log.info("127.0.0.1 - there's no place like home")
// Note: LOG_LEVEL=debug must be set on the environment to see debug level logs
log.debug("127.0.0.1 - there's no place like home")
```

![screenshot](https://github.com/JBaczuk/burst-log/raw/master/screenshot.png)

## Changelog
`v1.1.0` Now the log level is defined by the environment variable `LOG_LEVEL` and is set to `info` by default
