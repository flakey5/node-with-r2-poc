'use strict';

export const ENDPOINT =
  process.env.ENDPOINT ??
  'https://07be8d2fbc940503ca1be344714cb0d1.r2.cloudflarestorage.com';

export const PROD_BUCKET = process.env.PROD_BUCKET ?? 'dist-prod';

export const STAGING_BUCKET = process.env.STAGING_BUCKET ?? 'dist-staging';

export const R2_RETRY_COUNT = 3;

/**
 * @type {Record<string, string>}
 */
export const DEV_BUCKET = {
  'metrics/index.html': '<p>metrics/index.html</p>',
  'metrics/logs/nodejs.org-access.log.20241222.0000000000.csv': '',

  'nodejs/chakracore-nightly/index.json': '{}',
  'nodejs/chakracore-nightly/v10.13.0-nightly2018112084bd6f3c82/SHASUMS256.txt':
    '',
  'nodejs/chakracore-nightly/v10.13.0-nightly2018112084bd6f3c82/docs/api/index.html':
    '<p>nodejs/chakracore-nightly/v10.13.0-nightly2018112084bd6f3c82/docs/api/index.html</p>\n',
  'nodejs/chakracore-nightly/v10.13.0-nightly2018112084bd6f3c82/win-arm64/.gitkeep':
    '',
  'nodejs/chakracore-nightly/v10.13.0-nightly2018112084bd6f3c82/win-x64/.gitkeep':
    '',
  'nodejs/chakracore-nightly/v10.13.0-nightly2018112084bd6f3c82/win-x86/.gitkeep':
    '',

  'nodejs/chakracore-rc/index.json': '{}',
  'nodejs/chakracore-rc/v10.0.0-rc.0/SHASUMS256.txt': '',
  'nodejs/chakracore-rc/v10.0.0-rc.0/win-arm64/.gitkeep': '',
  'nodejs/chakracore-rc/v10.0.0-rc.0/win-x64/.gitkeep': '',
  'nodejs/chakracore-rc/v10.0.0-rc.0/win-x86/.gitkeep': '',

  'nodejs/chakracore-release/index.json': '{}',
  'nodejs/chakracore-release/v10.0.0/SHASUMS256.txt': '',
  'nodejs/chakracore-release/v10.0.0/docs/api/index.html':
    '<p>nodejs/chakracore-release/v10.0.0/docs/api/index.html</p>\n',
  'nodejs/chakracore-release/v10.0.0/win-arm64/.gitkeep': '',
  'nodejs/chakracore-release/v10.0.0/win-x64/.gitkeep': '',
  'nodejs/chakracore-release/v10.0.0/win-x86/.gitkeep': '',

  'nodejs/docs/v0.0.1/index.html': '<p>nodejs/docs/v0.0.1/index.html</p>',

  'nodejs/nightly/index.json': '{}',
  'nodejs/nightly/v24.0.0-nightly20241219756077867b/SHASUMS256.txt': '',
  'nodejs/nightly/v24.0.0-nightly20241219756077867b/docs/api/index.html':
    '<p>nodejs/nightly/v24.0.0-nightly20241219756077867b/docs/api/index.html</p>\n',
  'nodejs/nightly/v24.0.0-nightly20241219756077867b/docs/apilinks.json': '{}',
  'nodejs/nightly/v24.0.0-nightly20241219756077867b/win-arm64/.gitkeep': '',
  'nodejs/nightly/v24.0.0-nightly20241219756077867b/win-x64/.gitkeep': '',

  'nodejs/rc/index.json': '{}',
  'nodejs/rc/v23.0.0-rc.3/SHASUMS256.txt': '',
  'nodejs/rc/v23.0.0-rc.3/docs/api/index.html':
    '<p>nodejs/rc/v23.0.0-rc.3/docs/api/index.html</p>\n',
  'nodejs/rc/v23.0.0-rc.3/docs/apilinks.json': '{}',
  'nodejs/rc/v23.0.0-rc.3/win-arm64/.gitkeep': '',
  'nodejs/rc/v23.0.0-rc.3/win-x64/.gitkeep': '',

  'nodejs/release/index.json': '{}',
  'nodejs/release/v20.0.0/SHASUMS256.txt': '',
  'nodejs/release/v20.0.0/docs/api/index.html':
    '<p>nodejs/release/v20.0.0/docs/api/index.html</p>\n',
  'nodejs/release/v20.0.0/docs/apilinks.json': '{}',
  'nodejs/release/v20.0.0/win-arm64/.gitkeep': '',
  'nodejs/release/v20.0.0/win-x64/.gitkeep': '',
  'nodejs/release/v20.0.0/win-x86/.gitkeep': '',

  'nodejs/test/index.json': '{}',
  'nodejs/test/v24.0.0-test6af5c4e2b40/SHASUMS256.txt': '',
  'nodejs/test/v24.0.0-test6af5c4e2b40/win-arm64/.gitkeep': '',
  'nodejs/test/v24.0.0-test6af5c4e2b40/win-x64/.gitkeep': '',

  'nodejs/v8-canary/index.json': '{}',
  'nodejs/v8-canary/v24.0.0-v8-canary202412221f947c1730/SHASUMS256.txt': '',
  'nodejs/v8-canary/v24.0.0-v8-canary202412221f947c1730/docs/api/index.html':
    '<p>nodejs/v8-canary/v24.0.0-v8-canary202412221f947c1730/docs/api/index.html</p>\n',
  'nodejs/v8-canary/v24.0.0-v8-canary202412221f947c1730/docs/apilinks.json':
    '{}',
};
