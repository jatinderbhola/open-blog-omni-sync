export const SITE_CONFIG = {
	name: "Jatinder Bhola's Tech Blog",
	description:
		'Exploring software engineering, web development, and technology insights. Join me on a journey through modern tech stack, best practices, and innovative solutions.',
	url: 'https://blog.jatinderbhola.com',
	ogImage: 'https://blog.jatinderbhola.com/og-image.png',
	author: {
		name: 'Jatinder Bhola',
		social: {
			twitter: 'jatinderbhola',
			github: 'jatinderbhola',
			linkedin: 'jatinderbhola'
		}
	},
	keywords: [
		'Jatinder Bhola',
		'Jay Bhola',
		'Tech Blog',
		'Software Engineering',
		'Web Development',
		'Next.js',
		'React',
		'TypeScript',
		'Software Architecture',
		'Technology Blog',
		'Programming Tutorials'
	],
	navigation: [
		{ name: 'Blog', href: '/blog' },
		{ name: 'About', href: '/about' },
		{ name: 'RSS', href: '/feed.xml' }
	]
} as const;

export type SiteConfig = typeof SITE_CONFIG;
