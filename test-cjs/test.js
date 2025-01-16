const log = require('../dist/index.js').default;

// Test different log levels
log.info('This is an info message (CJS)');
log.error('This is an error message (CJS)');
log.warning('This is a warning message (CJS)');
log.debug('This is a debug message (CJS)');

// Test object logging
log.info({ user: 'test', action: 'login', module: 'cjs' });

// Test error object logging
const error = new Error('Test error (CJS)');
log.error(error);
