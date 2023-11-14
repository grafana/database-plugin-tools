import { setupWorker } from 'msw';

let handlers;

try {
  handlers = require('./playwright-handlers').default;
} catch (_) {
  handlers = [];
}

export const worker = setupWorker(...handlers);
