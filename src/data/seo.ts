import { absoluteUrl } from './urls';
import { site } from './site';

// A deployment preview must never compete with the primary domain.
export const isIndexable = import.meta.env.PUBLIC_SITE_LIVE === 'true'
  && import.meta.env.SITE === site.url
  && import.meta.env.BASE_URL === '/';

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${absoluteUrl('/')}#website`,
  url: absoluteUrl('/'),
  name: 'Usługi gazowe · Głogów',
  inLanguage: 'pl-PL',
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })),
  };
}
