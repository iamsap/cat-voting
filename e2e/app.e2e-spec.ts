import { CatVotingPage } from './app.po';

describe('cat-voting App', () => {
  let page: CatVotingPage;

  beforeEach(() => {
    page = new CatVotingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
