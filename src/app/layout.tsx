import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SITE_CONFIG } from '@/lib/constants';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
    themeColor: '#0f172a',
};

export const metadata = {
    title: {
        default: SITE_CONFIG.name,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
        types: {
            'application/rss+xml': [
                {
                    url: '/feed.xml',
                    title: `${SITE_CONFIG.name} RSS Feed`,
                },
                {
                    url: '/rss',
                    title: `${SITE_CONFIG.name} RSS Feed (Alternative)`,
                },
            ],
        },
    },
    keywords: ['Blog', 'Next.js', 'React', 'TypeScript'],
    authors: [
        {
            name: SITE_CONFIG.author.name,
            url: SITE_CONFIG.url,
        },
    ],
    creator: SITE_CONFIG.author.name,
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_CONFIG.url,
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: SITE_CONFIG.ogImage,
                width: 1200,
                height: 630,
                alt: SITE_CONFIG.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        images: [SITE_CONFIG.ogImage],
        creator: '@' + SITE_CONFIG.author.social.twitter,
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '32x32' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            { rel: 'mask-icon', url: '/android-chrome-512x512.png', color: '#0f172a' },
            { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
            { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
        ],
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
        title: SITE_CONFIG.name,
        statusBarStyle: 'default',
        capable: true,
    },
} as const;

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
} 