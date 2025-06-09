import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SITE_CONFIG } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts()

    const blogPosts = posts.map((post) => ({
        url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        lastModified: post.date,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const routes = ['', '/blog', '/about'].map((route) => ({
        url: `${SITE_CONFIG.url}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }))

    return [...routes, ...blogPosts]
} 