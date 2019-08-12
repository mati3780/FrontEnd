import { Header } from './header';

describe('Header', () => {
  it('should create an instance', () => {
    expect(new Header("", "")).toBeTruthy();
  });
  it('should contain title and subtitle', () => {
    var header = new Header("title", "subtitle");
    expect(header.title).toBe("title");
    expect(header.subtitle).toBe("subtitle");
  });
});
