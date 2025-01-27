import assert from 'node:assert';
import test, { after, before, describe } from 'node:test';
import { type Miniflare, type DispatchFetch } from 'miniflare';
import { setupMiniflare } from './util';
import { CACHE_HEADERS } from '../constants/cache';

describe('file tests', async () => {
  let mf: Miniflare;
  let url: URL;

  before(async () => {
    [mf, url] = await setupMiniflare();
  });

  const sendRequest: DispatchFetch = (path, init) => {
    if (typeof path === 'string' && path.startsWith('/')) {
      path = path.substring(1);
    }

    return mf.dispatchFetch(`${url}${path}`, init);
  };

  // TODO go through each file and make sure it works

  // test('GET `/dist/index.json`', async () => {
  //   const res = await sendRequest('/dist/index.json')

  //   assert.strictEqual(res.status, 200)
  //   assert.strictEqual(res.headers.get('content-type'), 'application/json')
  //   assert.strictEqual(res.headers.get('cache-control'), CACHE_HEADERS.success)
  //   assert.ok(res.headers.has('etag'))
  //   assert.ok(res.headers.has('last-modified'))

  //   const body = await res.text();
  //   // assert.strictEqual(body, )
  // })

  test('returns 404 for missing file', async () => {
    const res = await sendRequest('/dist/asd123.json');

    assert.equal(res.status, 404);
    assert.strictEqual(res.headers.get('cache-control'), CACHE_HEADERS.failure);

    const body = await res.text();
    assert.strictEqual(body, 'File not found');
  });

  test('if-modified-since', async () => {
    let lastModified: string;

    // Make first request to grab its last modified date
    {
      const res = await sendRequest('/dist/index.json');

      assert.strictEqual(res.status, 200);
      assert.ok(res.headers.has('last-modified'));

      lastModified = res.headers.get('last-modified')!;
    }

    // Make sure it returns a 304 when if-modified-since >= the file's last
    //  modified
    {
      const res = await sendRequest('/dist/index.json', {
        headers: {
          'if-modified-since': lastModified,
        },
      });

      assert.equal(res.status, 304);
    }

    // Now let's send a request to before the file's last modified date.
    //  This should give us a 200 since the file has changed.
    {
      const res = await sendRequest('/dist/index.json', {
        headers: {
          'if-modified-since': new Date(0).toUTCString(),
        },
      });

      assert.equal(res.status, 200);
    }
  });

  test('if-unmodified-since', async () => {
    let lastModified: string;

    // Send request to get the file's last modified date
    {
      const res = await sendRequest('/dist/index.json');

      assert.equal(res.status, 200);
      assert.ok(res.headers.has('last-modified'));

      lastModified = res.headers.get('last-modified')!;
    }

    // Send request before the last modified. This should return a 412.
    {
      const res = await sendRequest('/dist/index.json', {
        headers: {
          'if-unmodified-since': new Date(0).toUTCString(),
        },
      });

      assert.equal(res.status, 412);
    }

    // Send request after the last modified. This should return a 200
    {
      const timestamp = new Date(lastModified);
      timestamp.setMinutes(timestamp.getMinutes() + 1);

      const res = await sendRequest('/dist/index.json', {
        headers: {
          'if-unmodified-since': timestamp.toUTCString(),
        },
      });

      assert.equal(res.status, 412);
    }
  });

  test('if-match', async () => {});

  after(async () => {
    await mf.dispose();
  });
});
