const express = require("express");
const Jobs = require("./jobScript");

const app = express();
const port = 9000;

app.get("/", async (req, res) => {
  const jobs = await Jobs.getJobs();
  res.json(jobs);
});

app.get("/test", (req, res) => {
  const puppeteer = require("puppeteer");
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(
      "https://www.google.com/search?q=what+is+puppeteer+js&oq=wh&aqs=chrome.0.69i59j69i64j0l3j5l3.7647j0j7&sourceid=chrome&ie=UTF-8"
    );

    await page.setViewport({ width: 1366, height: 669 });

    await page.waitForSelector(
      ".g:nth-child(3) > .rc:nth-child(1) > .r > a > .LC20lb"
    );
    await page.click(".g:nth-child(3) > .rc:nth-child(1) > .r > a > .LC20lb");

    await page.waitForSelector(
      ".blog_post-main_content > .blog_post-body > .blog_post_body > p > a:nth-child(3)"
    );
    await page.click(
      ".blog_post-main_content > .blog_post-body > .blog_post_body > p > a:nth-child(3)"
    );

    await browser.close();
  })();
});

app.listen(port, () => {});
