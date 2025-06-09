import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AUTHOR_CONFIG } from '@/config/author';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) {
        return text;
    }
    return text.slice(0, length).trim() + '...';
}

export function getBaseUrl(): string {
    if (typeof window !== 'undefined') {
        return '';
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return `http://localhost:${process.env.PORT || 3000}`;
}

export function createMetadata(title: string, description: string) {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: getBaseUrl(),
            siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Omni Sync - Blog',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export function getAvatarUrl(config: typeof AUTHOR_CONFIG.avatar, name: string): string {
    if (config.type === 'custom' && config.customPath) {
        return config.customPath;
    }

    const style = config.style || 'pixel-art';
    const encodedName = encodeURIComponent(name);

    switch (style) {
        case 'initials':
            // Use UI Avatars for initials
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
            return `https://ui-avatars.com/api/?name=${initials}&background=random`;
        case 'avataaars':
            return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodedName}`;
        case 'bottts':
            return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodedName}`;
        case 'pixel-art':
            return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodedName}`;
        case 'identicon':
            return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodedName}`;
        default:
            return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodedName}`;
    }
} 