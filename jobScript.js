const puppeteer = require("puppeteer");
const jobUrl = `https://www.dice.com/jobs?q=backend&countryCode=US&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=ONE&language=en`;

let page;
let browser;
let cardArr = [];

class Jobs {
  static async init() {
    // console.log('Loading Page ...')
    browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    page = await browser.newPage();

    await page.goto(jobUrl, { waitUntil: "networkidle2" });
    await page.waitForSelector(".search-card");
  }

  static async resolve() {
    await this.init();
    // console.log('Grabbing List of Job URLS ...')
    const jobURLs = await page.evaluate(() => {
      const cards = document.querySelectorAll(".search-card");
      cardArr = Array.from(cards);

      const cardLinks = [];
      cardArr.map((card) => {
        const cardTitle = card.querySelector(".card-title-link");
        const cardDesc = card.querySelector(".card-description");
        const cardCompany = card.querySelector(
          'a[data-cy="search-result-company-name"]'
        );
        const cardDate = card.querySelector(".posted-date");
        const { text } = cardTitle;
        const { host } = cardTitle;
        const { protocol } = cardTitle;
        const pathName = cardTitle.pathname;
        const query = cardTitle.search;
        const titleURL = protocol + "//" + host + pathName + query;
        const company = cardCompany.textContent;

        cardLinks.push({
          jobText: text,
          jobURLHost: host,
          jobURLPathname: pathName,
          jobURLSearchQuery: query,
          jobURL: titleURL,
          jobDesc: cardDesc.innerHTML,
          jobCompany: company,
          jobDate: cardDate.textContent,
        });
      });
      return cardLinks;
    });

    return jobURLs;
  }

  static async getJobs() {
    const jobs = await this.resolve();
    await browser.close();
    // console.log(jobs)
    return jobs;
  }
}

module.exports = Jobs;
