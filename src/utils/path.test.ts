import { describe, test } from 'node:test';
import { equal } from 'node:assert';
import { isDirectoryPath } from './path';

describe('isDirectoryPath', () => {
  test('returns true for `/dist/`', () => {
    equal(isDirectoryPath('/dist/'), true);
  });

  test('returns true for `/dist`', () => {
    equal(isDirectoryPath('/dist'), true);
  });

  test('returns true for `/dist/latest-v20.x`', () => {
    equal(isDirectoryPath('/dist/latest-v20.x'), true);
  });

  test('returns true for `/dist/v20.20.2`', () => {
    equal(isDirectoryPath('/dist/v20.20.2'), true);
  });

  test('returns false for `/dist/index.json`', () => {
    equal(isDirectoryPath('/dist/index.json'), false);
  });

  // https://github.com/nodejs/release-cloudflare-worker/issues/71
  test('returns false for `/download/release/latest/win-x64/node_pdb.7z`', () => {
    equal(
      isDirectoryPath('/download/release/latest/win-x64/node_pdb.7z'),
      false
    );
  });

  // https://github.com/nodejs/release-cloudflare-worker/issues/99
  test('returns true for `/docs/latest/api`', () => {
    equal(isDirectoryPath('/docs/latest/api'), true);
  });
});
