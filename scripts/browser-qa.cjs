const { chromium } = require("playwright");
const path = require("path");

const baseURL = process.env.QA_BASE_URL || "http://127.0.0.1:3022/app";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const iphoneUA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1";

async function inspect(page, width) {
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.locator(".functions-section").scrollIntoViewIfNeeded();
  for (const card of await page.locator(".feature-card").all()) await card.scrollIntoViewIfNeeded();
  await page.locator(".feature-grid").evaluate((element) => element.scrollTo({ left: 0, behavior: "instant" }));
  await page.locator(".feature-image img").evaluateAll((images) => Promise.all(
    images.map((image) => image.complete
      ? Promise.resolve()
      : new Promise((resolve) => image.addEventListener("load", resolve, { once: true })))
  ));
  const data = await page.evaluate(() => {
    const featureGrid = document.querySelector(".feature-grid");
    const phone = document.querySelector(".phone-frame");
    const laptop = document.querySelector(".laptop-frame");
    const shell = document.querySelector(".shell");
    const deviceTitles = [...document.querySelectorAll(".device-card h3")].map((item) => item.textContent.trim());
    const disabled = [...document.querySelectorAll(".device-link.is-disabled")].map((item) => ({
      tag: item.tagName,
      tabIndex: item.tabIndex,
      ariaDisabled: item.getAttribute("aria-disabled")
    }));
    return {
      statusText: document.readyState,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      sectionCount: document.querySelectorAll("main > section").length,
      featureCount: document.querySelectorAll(".feature-card").length,
      deviceCount: document.querySelectorAll(".device-card").length,
      deviceTitles,
      disabled,
      computerHref: document.querySelector(".device-card:last-child a")?.href || "",
      browserHref: document.querySelector(".browser-link")?.href || "",
      gridDisplay: getComputedStyle(featureGrid).display,
      gridColumns: getComputedStyle(featureGrid).gridTemplateColumns.split(" ").filter(Boolean).length,
      scrollSnapType: getComputedStyle(featureGrid).scrollSnapType,
      carouselScrollable: featureGrid.scrollWidth > featureGrid.clientWidth,
      cardRatio: document.querySelector(".feature-card").getBoundingClientRect().width / innerWidth,
      phoneRatio: phone.getBoundingClientRect().width / innerWidth,
      laptopDisplay: getComputedStyle(laptop).display,
      shellWidth: shell.getBoundingClientRect().width
    };
  });

  data.functionImages = await page.locator(".feature-image img").evaluateAll((images) => images.map((image) => {
    const imageBox = image.getBoundingClientRect();
    const previewBox = image.parentElement.getBoundingClientRect();
    return {
      objectFit: getComputedStyle(image).objectFit,
      renderedRatio: image.clientWidth / image.clientHeight,
      naturalRatio: image.naturalWidth / image.naturalHeight,
      fullyInsidePreview: imageBox.top >= previewBox.top && imageBox.bottom <= previewBox.bottom && imageBox.left >= previewBox.left && imageBox.right <= previewBox.right
    };
  }));

  if (width === 390) {
    await page.locator(".primary-button").click();
    await page.waitForTimeout(700);
    data.downloadTopAfterCTA = await page.locator("#download").evaluate((element) => Math.round(element.getBoundingClientRect().top));

    const carousel = page.locator(".feature-grid");
    const before = await carousel.evaluate((element) => element.scrollLeft);
    await carousel.evaluate((element) => element.scrollTo({ left: element.scrollWidth, behavior: "instant" }));
    await page.waitForTimeout(100);
    const after = await carousel.evaluate((element) => element.scrollLeft);
    data.carouselMoved = after > before;

    await page.reload({ waitUntil: "networkidle" });
    await page.locator(".brand").focus();
    data.keyboardTarget = await page.evaluate(() => ({
      text: document.activeElement?.textContent?.trim() || "",
      outline: getComputedStyle(document.activeElement).outlineStyle
    }));
  }

  return { width, status: response?.status(), consoleErrors, pageErrors, ...data };
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath });
  const results = [];

  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 900 : 1000 },
      deviceScaleFactor: 1,
      isMobile: width < 768,
      hasTouch: width < 768,
      userAgent: width < 768 ? iphoneUA : undefined
    });
    const page = await context.newPage();
    results.push(await inspect(page, width));

    if (width === 390 || width === 1440) {
      await page.goto(baseURL, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((resolve) => setTimeout(resolve, 250));
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(150);
      await page.locator(".functions-section").screenshot({
        path: path.join(process.cwd(), `output/playwright/functions-${width}.png`),
        animations: "disabled"
      });
      await page.screenshot({
        path: path.join(process.cwd(), `output/playwright/final-${width}.png`),
        fullPage: true
      });
    }
    await context.close();
  }

  const androidContext = await browser.newContext({
    viewport: { width: 390, height: 900 },
    isMobile: true,
    hasTouch: true,
    userAgent: "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Chrome/140.0 Mobile Safari/537.36"
  });
  const androidPage = await androidContext.newPage();
  await androidPage.goto(baseURL, { waitUntil: "networkidle" });
  const androidFirst = await androidPage.locator(".device-card h3").first().textContent();
  await androidContext.close();

  const failures = [];
  for (const result of results) {
    if (result.status !== 200) failures.push(`${result.width}: HTTP ${result.status}`);
    if (result.overflow) failures.push(`${result.width}: page overflow ${result.scrollWidth}/${result.viewport}`);
    if (result.sectionCount !== 4) failures.push(`${result.width}: ${result.sectionCount} sections`);
    if (result.featureCount !== 4 || result.deviceCount !== 3) failures.push(`${result.width}: card counts incorrect`);
    if (result.consoleErrors.length || result.pageErrors.length) failures.push(`${result.width}: browser errors`);
    if (result.width >= 1024 && result.gridColumns !== 4) failures.push(`${result.width}: expected 4 function columns, got ${result.gridColumns}`);
    if (result.width <= 430 && (result.cardRatio < .84 || result.cardRatio > .88)) failures.push(`${result.width}: carousel card ratio ${result.cardRatio}`);
    if (result.width <= 430 && (result.phoneRatio < .65 || result.phoneRatio > .75)) failures.push(`${result.width}: phone ratio ${result.phoneRatio}`);
    if (result.width <= 430 && result.laptopDisplay !== "none") failures.push(`${result.width}: laptop visible`);
    if (result.width === 768 && result.laptopDisplay === "none") failures.push("768: laptop hidden");
    if (result.width <= 430 && result.deviceTitles[0] !== "iPhone / iPad") failures.push(`${result.width}: iOS card not first`);
    if (result.disabled.length !== 0) failures.push(`${result.width}: configured store controls are unexpectedly disabled`);
    if (result.width === 1920 && result.shellWidth > 1241) failures.push(`1920: shell too wide ${result.shellWidth}`);
    if (result.functionImages.some((image) => image.objectFit !== "contain" || Math.abs(image.renderedRatio - image.naturalRatio) > .002 || !image.fullyInsidePreview)) failures.push(`${result.width}: a function screenshot is cropped or distorted`);
  }
  const mobile = results.find((result) => result.width === 390);
  if (!mobile.carouselMoved) failures.push("390: carousel did not move");
  if (Math.abs(mobile.downloadTopAfterCTA) > 50) failures.push(`390: CTA scroll ended at ${mobile.downloadTopAfterCTA}`);
  if (!mobile.keyboardTarget.text.includes("Client Portal AKC") || mobile.keyboardTarget.outline === "none") failures.push("390: keyboard focus not visible on first link");
  if (androidFirst.trim() !== "Android") failures.push(`Android card not first: ${androidFirst}`);

  await browser.close();
  console.log(JSON.stringify({ results, androidFirst: androidFirst.trim(), failures }, null, 2));
  if (failures.length) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
