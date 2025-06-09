import { AUTHOR_CONFIG } from '@/config/author';
import { SiteConfig } from '@/types/site';

export const SITE_CONFIG: SiteConfig = {
	name: 'Omni Sync - Blog',
	description: 'A modern blog platform with multi-platform publishing capabilities',
	url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
	ogImage: '/images/og.jpg',
	links: {
		twitter: AUTHOR_CONFIG.social.twitter
			? `https://twitter.com/${AUTHOR_CONFIG.social.twitter}`
			: undefined,
		github: AUTHOR_CONFIG.github,
		linkedin: AUTHOR_CONFIG.linkedin
	},
	author: AUTHOR_CONFIG
} as const;

export const NAVIGATION = [
	{
		title: 'Home',
		href: '/'
	},
	{
		title: 'Blog',
		href: '/blog'
	},
	{
		title: 'Tags',
		href: '/tags'
	},
	{
		title: 'About',
		href: '/about'
	}
] as const;

export const PLATFORM_CONFIG = {
	rss: {
		name: 'RSS',
		enabled: true
	},
	linkedin: {
		name: 'LinkedIn',
		enabled: false,
		apiKey: process.env.LINKEDIN_CLIENT_ID,
		apiSecret: process.env.LINKEDIN_CLIENT_SECRET,
		redirectUri: process.env.LINKEDIN_REDIRECT_URI
	},
	medium: {
		name: 'Medium',
		enabled: false,
		apiKey: process.env.MEDIUM_ACCESS_TOKEN,
		userId: process.env.MEDIUM_USER_ID
	}
} as const;
