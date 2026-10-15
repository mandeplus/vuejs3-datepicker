// Packs the library the same way npm publishes it and installs the tarball into the
// playground, so the app and tests run against the published contents, not the source.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const playgroundDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const rootDir = resolve(playgroundDir, '..');

if (!existsSync(join(rootDir, 'build', 'vuejs3-datepicker.js'))) {
  console.error('Library build not found. Run `npm run build:lib` in the repository root first.');
  process.exit(1);
}

const packDir = mkdtempSync(join(tmpdir(), 'vuejs3-datepicker-'));
const output = execFileSync('npm', ['pack', '--json', '--pack-destination', packDir], {
  cwd: rootDir,
  encoding: 'utf8',
  env: { ...process.env, HUSKY: '0' },
});
// npm lifecycle scripts may print before the JSON report
const [{ filename }] = JSON.parse(output.slice(output.search(/^\[/m)));
const tarball = join(packDir, filename);

console.log(`Installing ${tarball}`);
execFileSync('npm', ['install', '--no-save', tarball], { cwd: playgroundDir, stdio: 'inherit' });
