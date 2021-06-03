const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  // await browser.close();
});

test('The header has the correct text', async () => {
  const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();
  // console.log('url', url);

  expect(url).toMatch(/accounts\.google\.com/);
});

test.only('when signed in, shows logout button', async () => {
  const Buffer = require('safe-buffer').Buffer;
  const Keygrip = require('keygrip');
  const keys = require('../config/keys');

  const id = '60b89ce257929fd22ecbc08e';
  const sessionObject = {
    passport: {
      user: id,
    },
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    'base64'
  );
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign('session=' + sessionString);

  await page.setCookie({ name: 'session', value: sessionString });
  await page.setCookie({ name: 'session.sig', value: sig });

  await page.goto('localhost:3000');
  await page.waitFor('a[href="/auth/logout"]');
  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);

  expect(text).toEqual('Logout');
});
