import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect } from 'vitest';
import { server } from '../src/mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

// add jest-dom's custom assertions
expect.extend(matchers);

// establish API mocking before all tests
beforeAll(() => server.listen());

// reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => server.resetHandlers());

// clean up once the tests are done
afterAll(() => server.close());

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
  });