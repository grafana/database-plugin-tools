import { rest } from 'msw';
import { fakeData } from '../data/index';

const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15.09 8.59 22 9 17 13 18.18 19.5 12 16.5 5.82 19.5 7 13 2 9 8.91 8.59 12 2" />
</svg>
`;

export const handlers = (baseUrl: string) => [
  rest.get(`${baseUrl}`, (req, res, context) => {
    return res(context.json(fakeData), context.status(200));
  }),

  rest.get(`*.svg`, (req, res, context) => {
    return res(context.delay(250), context.set('Content-Type', 'image/svg+xml'), context.body(starSvg));
  }),
];
