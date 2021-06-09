const Page = require('./helpers/page');

let page;

afterAll(() => setTimeout(() => process.exit(), 1000));

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('The header has the correct text', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();
  // console.log('url', url);

  expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in, shows logout button', async () => {
  await page.login();

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  expect(text).toEqual('Logout');
});
