import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shipfaststarter.com'
  const currentDate = new Date()
  
  // Liste des pages marketing principales
  const marketingPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
  ]
  
  // Pages d'authentification
  const authPages = [
    { path: '/signin', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/signup', priority: 0.7, changeFrequency: 'monthly' },
  ]
  
  // Pages de documentation
  const docPages = [
    { path: '/docs', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/docs/getting-started', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/docs/features', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/docs/api', priority: 0.7, changeFrequency: 'weekly' },
  ]
  
  // Pages spécifiques au produit
  const productPages = [
    { path: '/features', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/next-js-starter-kit', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/react-saas-boilerplate', priority: 0.9, changeFrequency: 'weekly' },
  ]
  
  // Combiner toutes les pages
  const allPages = [...marketingPages, ...authPages, ...docPages, ...productPages]
  
  // Transformer en format Sitemap
  return allPages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: page.priority,
  }))
}
