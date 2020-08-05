const express = require("express");

const app = express();
const port = 9000;

app.get("/", (req, res) => {
  const puppeteer = require("puppeteer");
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation();

    await page.goto("http://masteringbackend.herokuapp.com/");

    await page.setViewport({ width: 1366, height: 669 });

    await navigationPromise;

    await page.waitForSelector(
      ".container > #navbarSupportedContent > .navbar-nav > .nav-item:nth-child(2) > .nav-link"
    );
    await page.click(
      ".container > #navbarSupportedContent > .navbar-nav > .nav-item:nth-child(2) > .nav-link"
    );

    await navigationPromise;

    await page.waitForSelector(
      ".card:nth-child(2) > .card-header > .card-title > h3 > .title"
    );
    await page.click(
      ".card:nth-child(2) > .card-header > .card-title > h3 > .title"
    );

    await navigationPromise;

    await page.waitForSelector(
      ".container > #navbarSupportedContent > .navbar-nav > .nav-item:nth-child(4) > .nav-link"
    );
    await page.click(
      ".container > #navbarSupportedContent > .navbar-nav > .nav-item:nth-child(4) > .nav-link"
    );

    await navigationPromise;

    await page.waitForSelector(
      ".container > #navbarSupportedContent > .navbar-nav > .nav-item:nth-child(5) > .nav-link"
    );
    await page.click(
      ".container > #navbarSupportedContent > .navbar-nav > .nav-item:nth-child(5) > .nav-link"
    );

    await browser.close();
  })();
  // res.send("hello world!");
});

app.listen(port, () => {});
