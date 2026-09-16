import type { APIRoute } from 'astro';
import { absoluteUrl } from '../data/urls';
import { isIndexable } from '../data/seo';
export const GET: APIRoute = () => new Response(isIndexable
  ? `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
  : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
