import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogPost } from '@/components/blog/BlogPost';
import { SocialShare } from '@/components/shared/SocialShare';
import { getPostBySlug } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';
import { Metadata } from 'next';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {};
    }

    const ogImage = post.coverImage || SITE_CONFIG.ogImage;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        author: {
            '@type': 'Person',
            name: SITE_CONFIG.author.name,
            url: SITE_CONFIG.url,
        },
        datePublished: post.date,
        dateModified: post.date,
        image: ogImage,
        url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_CONFIG.url}/logo.png`,
            },
        },
        keywords: [...(post.tags || [])].join(', '),
        articleBody: post.content,
    };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [SITE_CONFIG.author.name],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [ogImage],
        },
        alternates: {
            canonical: `${SITE_CONFIG.url}/blog/${post.slug}`,
            types: {
                'application/ld+json': JSON.stringify(jsonLd),
            },
        },
        other: {
            'article:published_time': post.date,
            'article:author': SITE_CONFIG.author.name,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const url = `${SITE_CONFIG.url}/blog/${post.slug}`;

    return (
        <>
            <Header />
            <main className="flex-1">
                <article className="container py-10">
                    <BlogPost post={post} />
                    <div className="mt-8">
                        <SocialShare
                            url={url}
                            title={post.title}
                            description={post.description}
                        />
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
} 