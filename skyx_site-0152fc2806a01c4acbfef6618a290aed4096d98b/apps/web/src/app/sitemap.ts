import type { MetadataRoute } from 'next';

const BASE_URL = 'https://skyxtecnologia.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Rotas institucionais e principais
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/empresa`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cases`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/capsula`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/noticias`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Tentativa de buscar dinamicamente as notícias para indexação individual profunda
  try {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const cleanUrl = apiUrl.replace(/\/$/, '');
    const res = await fetch(`${cleanUrl}/api/news`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (res.ok) {
      const newsList = await res.json();
      if (Array.isArray(newsList)) {
        const newsRoutes: MetadataRoute.Sitemap = newsList.map((item: { id: string; createdAt?: string; updatedAt?: string }) => ({
          url: `${BASE_URL}/noticias/${item.id}`,
          lastModified: item.updatedAt ? new Date(item.updatedAt) : item.createdAt ? new Date(item.createdAt) : currentDate,
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
        return [...routes, ...newsRoutes];
      }
    }
  } catch (error) {
    // Caso a API não esteja acessível em tempo de compilação, o sitemap estático garante 100% de disponibilidade
    console.warn('Sitemap dynamic fetch skipped or backend offline:', error);
  }

  return routes;
}
