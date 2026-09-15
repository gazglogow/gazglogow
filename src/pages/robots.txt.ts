import type { APIRoute } from 'astro';
import { absoluteUrl } from '../data/urls';
export const GET: APIRoute = () => new Response(import.meta.env.PUBLIC_SITE_LIVE === 'true'
  ? `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
  : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
