import { MetadataRoute } from 'next';

export const revalidate = 3600;

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'https://tiendakit.koliscode.com/api').replace(/\/api$/, '');
const API  = process.env.NEXT_PUBLIC_API_URL ?? 'https://tiendakit.koliscode.com/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const estaticas: MetadataRoute.Sitemap = [
    { url: BASE,                     lastModified: new Date(), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE}/productos`,      lastModified: new Date(), changeFrequency: 'daily',  priority: 0.9 },
    { url: `${BASE}/info/envios`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/info/tallas`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/info/pagos`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/contacto`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  try {
    const res = await fetch(`${API}/productos`, { next: { revalidate: 3600 } });
    if (!res.ok) return estaticas;
    const productos: { slug: string; updatedAt: string }[] = await res.json();
    const dinamicas: MetadataRoute.Sitemap = productos.map((p) => ({
      url: `${BASE}/productos/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
    return [...estaticas, ...dinamicas];
  } catch {
    return estaticas;
  }
}
