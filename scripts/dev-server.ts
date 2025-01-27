// Starts the dev server with the R2 bucket populated with the contents of the
//  `dev-bucket` directory

// TODO this is still annoying since autoreload doesn't work

import { setupMiniflare } from '../src/e2e-tests/util';
import type { Env } from '../src/env';

const [, url] = await setupMiniflare(getEnvironment());

console.log(`Listening on ${url}`);

function getEnvironment() {
  const environment: Partial<Env> = {};

  const environmentVariables: Array<keyof Env> = [
    'ENVIRONMENT',
    'LOG_ERRORS',
    'S3_ENDPOINT',
    'S3_ACCESS_KEY_ID',
    'S3_ACCESS_KEY_SECRET',
    'BUCKET_NAME',
    'SENTRY_DSN',
    'ORIGIN_HOST',
  ];

  for (const variable of environmentVariables) {
    if (variable in process.env) {
      // @ts-expect-error todo
      environment[variable as keyof Env] = process.env[variable]!;
    }
  }

  if (environment.LOG_ERRORS) {
    // Parse string value to boolean
    environment.LOG_ERRORS = JSON.parse(environment.LOG_ERRORS);
  }

  return environment;
}
