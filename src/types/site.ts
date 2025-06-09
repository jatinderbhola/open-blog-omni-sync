import { AUTHOR_CONFIG } from '@/config/author';

export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
        twitter?: string;
        github: string;
        linkedin: string;
    };
    author: typeof AUTHOR_CONFIG;
} 