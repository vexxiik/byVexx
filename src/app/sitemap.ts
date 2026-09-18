import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Základní URL (nyní používá vexx.cz)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vexx.cz'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/navrh`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
