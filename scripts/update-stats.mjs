// Counts the installer downloads of every published release, for the badge in the README. Node 20+, no dependencies.
//
//   GH_TOKEN=<token> node scripts/update-stats.mjs out.json
//
// Only GitHub's own download counters are read: the repository does not track anyone. The result is a Shields
// "endpoint" file ({ schemaVersion, label, message, color }). If anything looks wrong the script exits with 1 and
// writes nothing, so a failed run never replaces a good number.

import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const REPO = 'filvoch/AionCoreUpdate';
// The installer of a release has two names: the stable one (AionCore-Setup.exe) and the versioned one (AionCore-Setup-1.2.3.exe).
// latest.json, latest.json.sig and the map packs (releases "mapas-*") are NOT installers and are never counted.
export const INSTALLER = /^AionCore-Setup(?:-\d+\.\d+\.\d+)?\.exe$/;
const VERSION_TAG = /^v\d+\.\d+\.\d+$/;

/** Total downloads of the installer files of all published version releases (vX.Y.Z). Installs and automatic updates both count. */
export function sumInstallerDownloads(releases) {
  if (!Array.isArray(releases)) throw new Error('the releases list is not an array');
  let total = 0;
  for (const r of releases) {
    if (r.draft || !VERSION_TAG.test(r.tag_name ?? '')) continue;
    for (const a of r.assets ?? []) {
      if (!INSTALLER.test(a.name)) continue;
      if (!Number.isSafeInteger(a.download_count) || a.download_count < 0) throw new Error(`unexpected download_count in ${r.tag_name}/${a.name}`);
      total += a.download_count;
    }
  }
  return total;
}

/** Shields endpoint payload: https://shields.io/badges/endpoint-badge */
export function badge(total) {
  return { schemaVersion: 1, label: 'installer downloads', message: total.toLocaleString('en-US'), color: '1a9bbd' };
}

async function fetchAllReleases(token) {
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'aioncore-stats', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) throw new Error(`GitHub API answered ${res.status} for page ${page}`);
    const part = await res.json();
    if (!Array.isArray(part)) throw new Error('unexpected answer from the GitHub API');
    all.push(...part);
    if (part.length < 100) return all;
  }
  throw new Error('more than 2000 releases: raise the page limit on purpose');
}

async function main() {
  const out = process.argv[2];
  if (!out) { console.error('usage: node scripts/update-stats.mjs <output.json>'); return 2; }
  const releases = await fetchAllReleases(process.env.GH_TOKEN);
  const total = sumInstallerDownloads(releases);
  if (!(total > 0)) throw new Error('total is 0: refusing to publish a suspicious number');
  writeFileSync(out, JSON.stringify(badge(total)) + '\n', 'utf8');
  console.log(`installer downloads: ${total} (${releases.length} releases read)`);
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((code) => { process.exitCode = code; }, (e) => { console.error(e.message); process.exitCode = 1; });
}
