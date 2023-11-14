import { cleanup } from '@testing-library/react';
import * as rxjs from 'rxjs';
import { restore as sinonRestore, spy as sinonSpy, stub as sinonStub } from 'sinon';

import * as grafanaRuntime from '@grafana/runtime';

import './.config/jest-setup';
import 'isomorphic-fetch';

import { server } from './src/test/msw/server';

/**
 * Fetch requires a full URL. Any relative URLs starting with a '/' will concatenate to something like 'http://localh
 * @param url
 * @param params
 */
const normalizeUrl = (url: string, params?: Record<string, string>): string => {
  let response = 'http://' + `${window.location.host}${url}`.replace(/\/{2}/g, '/');
  if (params) {
    response += `?${new URLSearchParams(params).toString()}`;
  }
  return response;
};
type FetchMethod = 'GET' | 'PUT' | 'POST';
type MockBackendSrvFnProps = {
  data?: any;
  ignoreEmptyData?: boolean;
  method?: FetchMethod;
  params?: Record<string, string>;
  returnHeaders?: boolean;
  url: string;
};
const mockBackendSrvFn = async <T>({
  data,
  ignoreEmptyData = false,
  method,
  params,
  returnHeaders = false,
  url,
}: MockBackendSrvFnProps): Promise<T> => {
  const response = await fetch(normalizeUrl(url, params), {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(data && { body: JSON.stringify(data) }),
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  if (returnHeaders) {
    // @ts-ignore
    return { data: await response.json(), headers: response.headers };
  }

  try {
    return await response.json();
  } catch (e) {
    if (ignoreEmptyData) {
      // @ts-ignore
      return '';
    }
    throw e;
  }
};

const backendSrvFunctions = {
  fetch: async <T>(options: { url: string; method: FetchMethod; params?: Record<string, string> }) =>
    mockBackendSrvFn({ url: options.url, method: options.method, params: options.params, returnHeaders: true }),
  get: async <T>(url: string, params?: Record<string, string>): Promise<T> =>
    mockBackendSrvFn({ url, method: 'GET', params: params }),
  put: async <T>(url: string, data: T, _: Partial<grafanaRuntime.BackendSrvRequest>): Promise<T> =>
    mockBackendSrvFn({ url, method: 'PUT', data, ignoreEmptyData: true }),
  post: async <T>(url: string, data: T, _: Partial<grafanaRuntime.BackendSrvRequest>): Promise<T> =>
    mockBackendSrvFn({ url, method: 'POST', data, ignoreEmptyData: true }),
} as unknown as grafanaRuntime.BackendSrv;

beforeAll(() => server.listen());
beforeEach(() => {
  jest.clearAllMocks();

  const originalConsoleError = console.error;

  sinonStub(console, 'error').callsFake((message: string) => {
    if (message && JSON.stringify(message).includes('validateDOMNesting')) {
      // the <Field /> component causes this error message to pop up in test, and we can't fix that.
      return;
    }
    originalConsoleError(message);
  });

  // Returns the argument it receives. Since we are mocking getBackendSrv to return promises instead of observables
  sinonStub(rxjs, 'lastValueFrom').value((arg: Promise<unknown>) => arg);
  sinonStub(grafanaRuntime, 'getBackendSrv').returns(backendSrvFunctions);
  // default the "grafana" version to 10.0.0
  sinonStub(grafanaRuntime.config, 'buildInfo').value({
    version: '10.0.0',
  });
});
afterEach(() => {
  cleanup();
  sinonRestore();
  server.resetHandlers();
});
afterAll(() => server.close());
