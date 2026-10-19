// Run with: node --test scripts/update-stats.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sumInstallerDownloads, badge, INSTALLER } from './update-stats.mjs';

const asset = (name, n) => ({ name, download_count: n });

test('counts both installer names of every version release and nothing else', () => {
  const releases = [
    { tag_name: 'v1.20.1', draft: false, assets: [asset('AionCore-Setup-1.20.1.exe', 400), asset('AionCore-Setup.exe', 30), asset('latest.json', 3000), asset('latest.json.sig', 500)] },
    { tag_name: 'v1.19.0', draft: false, assets: [asset('AionCore-Setup-1.19.0.exe', 800), asset('AionCore-Setup.exe', 20)] },
    { tag_name: 'mapas-2026.10.17', draft: false, assets: [asset('map-pack-overview.zip', 9999)] },
    { tag_name: 'v1.21.0', draft: true, assets: [asset('AionCore-Setup-1.21.0.exe', 7)] },
  ];
  assert.equal(sumInstallerDownloads(releases), 400 + 30 + 800 + 20);
});

test('installer names: only the two real ones', () => {
  for (const ok of ['AionCore-Setup.exe', 'AionCore-Setup-1.20.1.exe']) assert.ok(INSTALLER.test(ok), ok);
  for (const bad of ['AionCore-Setup.exe.sig', 'AionCore-Setup-1.20.exe', 'xAionCore-Setup.exe', 'AionCore-Setup-1.20.1.exe.zip', 'latest.json']) assert.ok(!INSTALLER.test(bad), bad);
});

test('a strange counter stops the run instead of publishing a wrong number', () => {
  assert.throws(() => sumInstallerDownloads([{ tag_name: 'v1.0.0', assets: [asset('AionCore-Setup.exe', -1)] }]), /unexpected download_count/);
  assert.throws(() => sumInstallerDownloads([{ tag_name: 'v1.0.0', assets: [asset('AionCore-Setup.exe', '5')] }]), /unexpected download_count/);
  assert.throws(() => sumInstallerDownloads({ not: 'an array' }), /not an array/);
});

test('badge payload follows the Shields endpoint schema', () => {
  assert.deepEqual(badge(12345), { schemaVersion: 1, label: 'installer downloads', message: '12,345', color: '1a9bbd' });
});
