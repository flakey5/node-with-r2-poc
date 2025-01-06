import { describe, test } from 'node:test';
import { strictEqual } from 'node:assert';
import { toReadableBytes } from './object';

describe('toReadableBytes', () => {
  test('converts 10 bytes to `10 B`', () => {
    const result = toReadableBytes(10);
    strictEqual(result, '10 B');
  });

  test('converts 1 KiB to `1.0 KB`', () => {
    const result = toReadableBytes(1024);
    strictEqual(result, '1.0 KB');
  });

  test('converts 1 MiB to `1.0 MB`', () => {
    const result = toReadableBytes(1024 * 1024);
    strictEqual(result, '1.0 MB');
  });

  test('converts 1 GiB to `1.1 GB`', () => {
    const result = toReadableBytes(1024 * 1024 * 1024);
    strictEqual(result, '1.1 GB');
  });

  test('converts 1 TiB to `1.1 TB`', () => {
    const result = toReadableBytes(1024 * 1024 * 1024 * 1024);
    strictEqual(result, '1.1 TB');
  });
});
