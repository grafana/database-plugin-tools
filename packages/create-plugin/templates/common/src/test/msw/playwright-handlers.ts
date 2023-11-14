import { rest } from 'msw';

import { fakeData } from '../data/index';

/** A collection of handlers to be used by default for all tests. */
export default [
  rest.get(`/api`, (req, res, context) => {
    return res(context.json(fakeData), context.status(200));
  }),
];
