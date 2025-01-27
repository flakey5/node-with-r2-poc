import { test } from 'node:test';
import { equal, strictEqual } from 'node:assert';
import { once } from './memo';

test('once()', () => {
  let callCount = 0;
  const getString = once(() => {
    callCount++;
    return 'asd123';
  });

  const str = getString();
  strictEqual(str, 'asd123');
  equal(callCount, 1);

  const str2 = getString();
  equal(str2, str);
  equal(callCount, 1);
});
