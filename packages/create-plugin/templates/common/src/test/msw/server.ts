import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from './handlers';

const baseUrl = 'http://localhost:3000';
const server = setupServer(...handlers(baseUrl));

export { baseUrl, rest, server };
