import log from '../dist/index.mjs';

// Test different log levels
log.info('This is an info message (ESM)');
log.error('This is an error message (ESM)');
log.warning('This is a warning message (ESM)');
log.debug('This is a debug message (ESM)');

// Test object logging
log.info({ user: 'test', action: 'login', module: 'esm' });

// Test error object logging
const error = new Error('Test error (ESM)');
log.error(error);