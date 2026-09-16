import { spawnSync } from 'node:child_process';

const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', 'output/seo-production'], {
  stdio: 'inherit',
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', PUBLIC_SITE_LIVE: 'true' },
});
process.exit(result.status ?? 1);
