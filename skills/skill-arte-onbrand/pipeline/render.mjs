import puppeteer from "puppeteer";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

let browserPromise = null;
function getBrowser() {
  if (!browserPromise) {
    browserPromise = puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return browserPromise;
}

export async function closeBrowser() {
  if (browserPromise) {
    const b = await browserPromise;
    await b.close();
    browserPromise = null;
  }
}

export async function renderPng(html, outputPath, { width = 1080, height = 1080, deviceScaleFactor = 2 } = {}) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setViewport({ width, height, deviceScaleFactor });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    await mkdir(dirname(outputPath), { recursive: true });
    const buf = await page.screenshot({ type: "png", omitBackground: false, clip: { x: 0, y: 0, width, height } });
    await writeFile(outputPath, buf);
    return outputPath;
  } finally {
    await page.close();
  }
}
