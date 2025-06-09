import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogList } from '@/components/blog/BlogList';
import { TagFilter } from '@/components/blog/TagFilter';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { createMetadata } from '@/lib/utils';

interface TagPageProps {
    params: {
        tag: string;
    };
}

export async function generateMetadata({ params }: TagPageProps) {
    return createMetadata(
        `Posts tagged with "${params.tag}"`,
        `Browse all blog posts tagged with "${params.tag}"`
    );
}

export default async function TagPage({ params }: TagPageProps) {
    const decodedTag = decodeURIComponent(params.tag);
    const [posts, tags] = await Promise.all([
        getPostsByTag(decodedTag),
        getAllTags(),
    ]);

    return (
        <>
            <Header />
            <main className="flex-1">
                <section className="container py-10">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl font-bold tracking-tight">
                                Posts tagged with &quot;{decodedTag}&quot;
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Browse all blog posts tagged with &quot;{decodedTag}&quot;.
                            </p>
                        </div>
                        <TagFilter tags={tags} selectedTag={decodedTag} />
                        <BlogList posts={posts} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
} 