import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllTags } from '@/lib/blog';
import { cn } from '@/lib/utils';

export const metadata = {
    title: 'Tags',
    description: 'Browse posts by tag',
};

export default async function TagsPage() {
    const tags = await getAllTags();
    const tagCounts = Object.entries(tags).sort((a, b) => b[1] - a[1]);

    return (
        <>
            <Header />
            <main className="flex-1">
                <section className="container py-10">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl font-bold tracking-tight">Tags</h1>
                            <p className="text-xl text-muted-foreground">
                                Browse posts by topic
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {tagCounts.map(([tag, count]) => (
                                <Link
                                    key={tag}
                                    href={`/tag/${tag}`}
                                    className={cn(
                                        'inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium',
                                        'hover:bg-muted/80 hover:text-accent-foreground'
                                    )}
                                >
                                    {tag}
                                    <span className="ml-2 text-muted-foreground">
                                        {count}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
} 