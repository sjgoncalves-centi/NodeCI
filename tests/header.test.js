const CustomPage = require('./helpers/page');

let page;

beforeEach( async () => {
    page = await CustomPage.build();
    await page.goto('http://localhost:3000');
})

afterEach( async () => {
    await page.close();
});

test('Correct logo', async () => {   
    const text = await page.getContentsOf('a.brand-logo');
    expect(text).toEqual('Blogster');
});

test('Login OAuth', async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});

test('Sign in and show logout button', async () => {
    await page.login();
    const text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');
});

