import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/admin/']
		},
		sitemap: `${SITE_CONFIG.url}/sitemap.xml`
	};
}
