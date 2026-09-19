import { SERVICE_LINKS } from './service-links.model';

describe('SERVICE_LINKS', () => {
  it('defines exactly eight deck services', () => {
    expect(SERVICE_LINKS.length).toBe(8);
  });

  it('uses unique slugs and absolute app routes', () => {
    const slugs = SERVICE_LINKS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const link of SERVICE_LINKS) {
      expect(link.link.startsWith('/')).toBeTrue();
      expect(link.label.length).toBeGreaterThan(3);
    }
  });
});
