/** Prefix internal routes and public assets for either a domain root or Pages project. */
export function withBase(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
}

export function absoluteUrl(path: string): string {
  return new URL(withBase(path), import.meta.env.SITE || 'https://gazglogow.pl').href;
}
