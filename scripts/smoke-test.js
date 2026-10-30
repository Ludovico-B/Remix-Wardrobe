const puppeteer = require("puppeteer-core");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Attende che l'animazione Hero sia partita (idratazione completata)
  await page.waitForFunction(
    () => document.querySelector("h1") && Number(getComputedStyle(document.querySelector("h1")).opacity) > 0.5,
    { timeout: 15000 }
  );
  console.log("idrato ✓");
  const h1Opacity = await page.$eval("h1", (el) => getComputedStyle(el).opacity);
  console.log("h1 opacity:", h1Opacity);

  await page.screenshot({ path: "/tmp/opencode/p1_hero.png" });

  // 2. Click sul tile "Lacoste" → filtro brand
  await page.evaluate(() => document.querySelector("#marchi").scrollIntoView());
  await sleep(800);
  const tiles = await page.$$("section#marchi button");
  await tiles[3].click();
  await sleep(1200);
  const brandValue = await page.$eval("#catalogo select", (el) => el.value);
  console.log("filtro brand dopo click tile:", brandValue);
  const cards = await page.$$eval("#catalogo article", (els) => els.length);
  console.log("card mostrate (Lacoste):", cards);

  // 3. Reset filtri
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("#catalogo button")];
    btns.find((b) => b.textContent.includes("Azzera")).click();
  });
  await sleep(600);
  const cardsAll = await page.$$eval("#catalogo article", (els) => els.length);
  console.log("card dopo reset:", cardsAll);

  // 4. Aggiungi al carrello
  await page.evaluate(() => document.querySelector("#catalogo").scrollIntoView());
  await sleep(500);
  await page.$eval("#catalogo article button", (b) => b.click());
  await sleep(800);
  const badge = await page.$eval(
    "header button[aria-label='Apri il carrello'] span",
    (el) => el.textContent
  );
  console.log("badge carrello:", badge);

  // 5. Drawer
  await page.click("header button[aria-label='Apri il carrello']");
  await sleep(900);
  const drawerVisible = await page.$eval("aside", (el) => {
    const r = el.getBoundingClientRect();
    return r.right > 0 && r.width > 0;
  });
  console.log("drawer visibile:", drawerVisible);
  await page.screenshot({ path: "/tmp/opencode/p2_drawer.png" });

  // 6. Checkout
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("aside button")].find((x) =>
      x.textContent.includes("Vai al checkout")
    );
    b.click();
  });
  await sleep(900);
  const coVisible = await page.evaluate(() =>
    [...document.querySelectorAll("h2")].some((h) => h.textContent.includes("Checkout"))
  );
  console.log("checkout aperto:", coVisible);
  await page.screenshot({ path: "/tmp/opencode/p3_checkout.png" });

  // 7. Scheda prodotto
  await page.keyboard.press("Escape");
  await sleep(600);
  await page.evaluate(() => {
    document
      .querySelector("#catalogo article .aspect-4\\/5")
      .scrollIntoView({ block: "center" });
  });
  await sleep(800);
  await page.$eval("#catalogo article .aspect-4\\/5", (el) => el.click());
  await sleep(1000);
  const pd = await page.evaluate(() => {
    const dt = [...document.querySelectorAll("dl dt")].some((d) => d.textContent === "Condizioni");
    const box = document.querySelector('[role="dialog"] > div');
    const r = box ? box.getBoundingClientRect() : null;
    return { dt, boxVisible: !!r && r.width > 300 && r.height > 200 };
  });
  console.log("scheda prodotto:", JSON.stringify(pd));
  await page.screenshot({ path: "/tmp/opencode/p4_prodotto.png" });

  await browser.close();
  console.log("TEST COMPLETATI");
})().catch((e) => {
  console.error("ERRORE:", e.message);
  process.exit(1);
});
