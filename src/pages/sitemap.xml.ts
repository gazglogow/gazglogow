import type { APIRoute } from 'astro';
import { services } from '../data/services';
import { absoluteUrl } from '../data/urls';
export const GET: APIRoute = () => {
  const paths = ['/', ...services.map(service => `/uslugi/${service.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${absoluteUrl(path)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
