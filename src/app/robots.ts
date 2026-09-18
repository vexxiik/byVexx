import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Základní URL (nyní používá vexx.cz)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vexx.cz'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/crm/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
