const puppeteer = require("puppeteer");

async function sendMessages(data, messageTemplate) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com");
  console.log("Please scan the QR code...");

  await page.waitForSelector("._3Nsgw", { timeout: 60000 });

  for (const row of data) {
    const name = row.Name || "";
    const phone = row.Phone || row.Number;
    const message = messageTemplate.replace("{name}", name);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    await page.goto(url);
    await page.waitForSelector("a[href*='send']", { timeout: 10000 });
    await page.click("a[href*='send']");
    await page.waitForTimeout(5000);
  }

  await browser.close();
}

module.exports = { sendMessages };
