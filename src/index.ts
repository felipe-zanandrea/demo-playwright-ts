import express from "express";
import { chromium } from "playwright";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API de scraping rodando 🚀");
});

app.get("/scrape", async (req, res) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.google.com");
  await page.fill('textarea[name="q"], input[name="q"]', "teste");
  await page.keyboard.press("Enter");

  await page.waitForTimeout(2000);

  const title = await page.title();

  await browser.close();

  res.json({ message: "Busca realizada", title });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});