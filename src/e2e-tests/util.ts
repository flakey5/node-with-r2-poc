import { join } from 'node:path';
import { readdir, readFile, stat } from 'node:fs/promises';
import { Miniflare } from 'miniflare';
import type { Env } from '../env';

const DEV_BUCKET_PATH = join(import.meta.dirname, '..', '..', 'dev-bucket');

/**
 * Fills the provided R2 bucket with the contents of the dev bucket
 */
async function populateR2Bucket(bucket: R2Bucket): Promise<void> {
  const paths = await readdir(DEV_BUCKET_PATH, { recursive: true });

  const promises: Array<Promise<unknown>> = [];

  for (const path of paths) {
    const relativePath = join(DEV_BUCKET_PATH, path);

    const statResult = await stat(relativePath);

    if (!statResult.isFile()) {
      continue;
    }

    promises.push(
      new Promise<void>((resolve, reject) => {
        readFile(relativePath, 'utf8')
          .then(contents => {
            bucket
              .put(path, contents, {
                customMetadata: {
                  // This is added by rclone when copying the release assets to the
                  //  bucket
                  mtime: `${Math.floor(Date.now() / 1000)}`,
                },
              })
              .then(() => resolve())
              .catch(reject);
          })
          .catch(reject);
      })
    );
  }

  await Promise.all(promises);
}

export async function setupMiniflare(
  env?: Partial<Omit<Env, 'R2_BUCKET'>>
): Promise<[Miniflare, URL]> {
  const mf = new Miniflare({
    scriptPath: join(import.meta.dirname, '..', '..', 'dist', 'worker.js'),
    modules: true,
    bindings: {
      ENVIRONMENT: 'e2e-tests',
      LOG_ERRORS: true,
      ...env,
    },
    r2Buckets: ['R2_BUCKET'],
  });

  const url = await mf.ready;

  const bucket = await mf.getR2Bucket('R2_BUCKET');

  // @ts-expect-error misc type mismatch
  await populateR2Bucket(bucket);

  return [mf, url];
}
