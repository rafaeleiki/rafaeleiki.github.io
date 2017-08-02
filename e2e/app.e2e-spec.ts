import { Rafaeleiki.Github.IoPage } from './app.po';

describe('rafaeleiki.github.io App', () => {
  let page: Rafaeleiki.Github.IoPage;

  beforeEach(() => {
    page = new Rafaeleiki.Github.IoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
