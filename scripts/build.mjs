// Builds the live site (index.html + vendor/dc-runtime.js) from the Claude Design
// export in design/. Run after every re-export:  node scripts/build.mjs
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'design', 'Portfolio Mockups.dc.html');

const SITE = {
  title: 'Beatrice Capule — Software Development Lead, Full-Stack Developer & Digital Designer',
  description:
    'Portfolio of Beatrice Capule, a Computer Science graduate turning curiosity into meaningful digital experiences across software development, full-stack engineering and digital design.',
  themeColor: '#1B0230',
};

let html = readFileSync(SRC, 'utf8');

// Each step must change the file exactly as expected, so a re-export that moved
// things around fails here instead of shipping a half-converted page.
function replaceOnce(label, pattern, replacement) {
  const hits = html.match(new RegExp(pattern.source, pattern.flags.replace('g', '') + 'g'));
  if (!hits || hits.length !== 1) {
    throw new Error(`build: expected exactly one match for "${label}", found ${hits ? hits.length : 0}`);
  }
  html = html.replace(pattern, replacement);
}

// 1. The review bar ("Portfolio mockup — not the live site", Prototype / Mobile / System).
replaceOnce(
  'mockup bar',
  /<div style="position:sticky;top:0;z-index:200;[\s\S]*?\[PH\] = placeholder<\/span>\s*<\/div>\s*/,
  ''
);

// 2. The Mobile and System review tabs; only the prototype view is the site.
replaceOnce(
  'mobile + system views',
  /<sc-if value="\{\{ isMobileView \}\}">[\s\S]*<\/sc-if>(?=\s*<\/div>\s*<\/x-dc>)/,
  ''
);

// 3. Layout that subtracted the 34px review bar from the viewport.
if (!html.includes('calc(100vh - 34px)')) throw new Error('build: no "calc(100vh - 34px)" to rewrite');
html = html.replaceAll('calc(100vh - 34px)', '100vh');

// 4. Document head: language, metadata, and local copies of React and the runtime.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
replaceOnce('html tag', /<html>/, '<html lang="en">');
replaceOnce(
  'runtime script tag',
  /<script src="\.\/support\.js"><\/script>/,
  [
    `<title>${esc(SITE.title)}</title>`,
    `<meta name="description" content="${esc(SITE.description)}">`,
    `<meta name="theme-color" content="${SITE.themeColor}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${esc(SITE.title)}">`,
    `<meta property="og:description" content="${esc(SITE.description)}">`,
    `<meta property="og:image" content="assets/bea-grad.jpg">`,
    `<link rel="icon" href="favicon.svg" type="image/svg+xml">`,
    `<script src="vendor/react.production.min.js"></script>`,
    `<script src="vendor/react-dom.production.min.js"></script>`,
    `<script src="vendor/dc-runtime.js"></script>`,
  ].join('\n')
);

writeFileSync(join(root, 'index.html'), html);
copyFileSync(join(root, 'design', 'support.js'), join(root, 'vendor', 'dc-runtime.js'));

console.log(`Built index.html (${(html.length / 1024).toFixed(0)} KB) from design/Portfolio Mockups.dc.html`);
