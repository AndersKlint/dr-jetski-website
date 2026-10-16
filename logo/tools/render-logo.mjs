import { mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.argv.includes('--help')) {
  console.log(`Usage: node logo/tools/render-logo.mjs [output-directory]

Install: xargs npm install --no-save --package-lock=false --prefix logo/tools < logo/tools/requirements.txt

Renders the main SVG on charcoal at 1600px and 768px wide.
Output defaults to logo/tools/previews.
Requires Google Chrome; set CHROME_PATH to use another Chromium executable.`);
  process.exit(0);
}

const { chromium } = await import('playwright-core');
const logoUrl = new URL('../dr-jetski-studios-logo.svg', import.meta.url);
const outputDirectory = process.argv[2]
  ? resolve(process.argv[2])
  : fileURLToPath(new URL('./previews/', import.meta.url));

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : { channel: 'chrome' }),
  headless: true,
});

try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 540 } });
  await page.goto(logoUrl.href);

  if (await page.locator('parsererror').count()) {
    throw new Error('The logo SVG could not be parsed.');
  }

  await page.evaluate(() => { document.documentElement.style.background = '#221d17'; });
  await page.screenshot({ path: join(outputDirectory, 'logo-charcoal-1600.png') });

  await page.evaluate(() => {
    document.documentElement.style.width = '768px';
    document.documentElement.style.height = '259.2px';
  });
  await page.setViewportSize({ width: 768, height: 260 });
  await page.screenshot({ path: join(outputDirectory, 'logo-charcoal-768.png') });
  console.log(`Logo previews saved to ${outputDirectory}`);
} finally {
  await browser.close();
}
