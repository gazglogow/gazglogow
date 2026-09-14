import type { APIRoute } from 'astro';
export const GET: APIRoute = () => new Response(import.meta.env.PUBLIC_SITE_LIVE === 'true'
  ? 'User-agent: *\nAllow: /\nSitemap: https://gazglogow.pl/sitemap.xml\n'
  : 'User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
