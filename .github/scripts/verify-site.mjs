import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..', '..');
const contractPath = resolve(repoRoot, '.github', 'brand-contract.json');
const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
const failures = [];

function fail(message) {
  failures.push(message);
}

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

for (const relativePath of contract.requiredFiles) {
  const absolutePath = resolve(repoRoot, relativePath);
  if (!existsSync(absolutePath)) {
    fail(`Missing required file: ${relativePath}`);
  } else if (!statSync(absolutePath).isFile()) {
    fail(`Required path is not a file: ${relativePath}`);
  }
}

for (const relativePath of contract.forbiddenFiles) {
  if (existsSync(resolve(repoRoot, relativePath))) {
    fail(`Obsolete artifact must not exist: ${relativePath}`);
  }
}

for (const [relativePath, expectedHash] of Object.entries(contract.identityAssetSha256)) {
  const absolutePath = resolve(repoRoot, relativePath);
  if (existsSync(absolutePath)) {
    const actualHash = sha256(absolutePath);
    if (actualHash !== expectedHash) {
      fail(`Identity asset changed without a contract update: ${relativePath}\n  expected ${expectedHash}\n  actual   ${actualHash}`);
    }
  }
}

const html = readFileSync(resolve(repoRoot, 'index.html'), 'utf8');
const htmlLower = html.toLowerCase();

for (const snippet of contract.requiredHtmlSnippets) {
  if (!html.includes(snippet)) {
    fail(`Missing approved homepage marker: ${snippet}`);
  }
}

for (const snippet of contract.forbiddenHtmlSnippets) {
  if (htmlLower.includes(snippet.toLowerCase())) {
    fail(`Regressed homepage marker detected: ${snippet}`);
  }
}

for (const [snippet, expectedCount] of Object.entries(contract.expectedCounts)) {
  const actualCount = html.split(snippet).length - 1;
  if (actualCount !== expectedCount) {
    fail(`Unexpected count for ${snippet}: expected ${expectedCount}, found ${actualCount}`);
  }
}

if (!/<h1\b[^>]*>Software, taken personally\.<\/h1>/.test(html)) {
  fail('The approved hero headline is missing or no longer the sole h1 content.');
}

if (!/<header\b[^>]*id="site-header"[^>]*>/.test(html)) {
  fail('The approved fixed masthead header is missing.');
}

const llms = readFileSync(resolve(repoRoot, 'llms.txt'), 'utf8');
for (const requiredProduct of ['GenCatalog', 'Fieldnote', 'Street Legal', 'Shachar: A Shabbat Alarm']) {
  if (!llms.includes(requiredProduct)) {
    fail(`llms.txt is missing product: ${requiredProduct}`);
  }
}

const sitemap = readFileSync(resolve(repoRoot, 'sitemap.xml'), 'utf8');
if (!sitemap.includes('<loc>https://secondactlabs.com/</loc>')) {
  fail('sitemap.xml is missing the canonical homepage URL.');
}

if (failures.length > 0) {
  console.error(`Second Act Labs site verification failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`\n- ${failure}`);
  process.exit(1);
}

console.log(`Verified Second Act Labs ${contract.identity}: required identity, four-product hero, machine-readable copy, and ${Object.keys(contract.identityAssetSha256).length} pinned identity assets.`);
