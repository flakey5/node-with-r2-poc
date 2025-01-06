import { describe, test } from 'node:test';
import { notEqual, strictEqual } from 'node:assert';
import { parseRangeHeader } from './request';

// TODO parseConditionalHeaders invalid date tests

describe('parseRangeHeader', () => {
  test('`bytes=0-10`', () => {
    const result = parseRangeHeader('bytes=0-10');

    strictEqual(result, {
      offset: 0,
      length: 11,
    });
  });

  test('`bytes=0-10, 15-20, 20-30`', () => {
    const result = parseRangeHeader('bytes=0-10, 15-20, 20-30');
    notEqual(result, undefined);

    strictEqual(result, {
      offset: 0,
      length: 11,
    });
  });

  test('`bytes=0-`', () => {
    const result = parseRangeHeader('bytes=0-');
    notEqual(result, undefined);

    strictEqual(result, {
      offset: 0,
    });
  });

  test('`bytes=-10`', () => {
    const result = parseRangeHeader('bytes=-10');

    strictEqual(result, { suffix: 10 });
  });

  test('`bytes=-`', () => {
    const result = parseRangeHeader('bytes=-');

    strictEqual(result, undefined);
  });

  test('`some-other-unit=-`', () => {
    const result = parseRangeHeader('some-other-unit=-');

    strictEqual(result, undefined);
  });

  test('`bytes=10-0`', () => {
    const result = parseRangeHeader('bytes=10-0');

    strictEqual(result, undefined);
  });
});
