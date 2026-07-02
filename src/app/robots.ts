import { MetadataRoute } from 'next';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'https://tiendakit.koliscode.com/api').replace(/\/api$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/carrito', '/orden'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
