import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();

  await page.goto("https://www.google.com", { waitUntil: "domcontentloaded" });

  const possibleButtons = [
    "button:has-text('Aceitar tudo')",
    "button:has-text('Aceitar')",
    "button:has-text('Concordo')",
    "button:has-text('I agree')",
    "button:has-text('Accept all')",
  ];

  for (const sel of possibleButtons) {
    try {
      const btn = page.locator(sel);
      if (await btn.first().isVisible({ timeout: 1000 })) {
        await btn.first().click();
        break;
      }
    } catch {}
  }


  for (const frame of page.frames()) {
    for (const sel of possibleButtons) {
      try {
        const btn = frame.locator(sel);
        if (await btn.first().isVisible({ timeout: 800 })) {
          await btn.first().click();
          break;
        }
      } catch {}
    }
  }

  const searchBox = page.locator('textarea[name="q"], input[name="q"]').first();
  await searchBox.waitFor({ state: "visible", timeout: 10000 });
  await searchBox.click({ force: true });
  await searchBox.fill("teste");
  await page.keyboard.press("Enter");

  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});