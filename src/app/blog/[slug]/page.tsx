import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogPost } from '@/components/blog/BlogPost';
import { SocialShare } from '@/components/shared/SocialShare';
import { getPostBySlug } from '@/lib/blog';
import { createMetadata } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {};
    }

    return createMetadata(post.title, post.description);
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