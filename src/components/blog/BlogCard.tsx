import Link from 'next/link';
import { PostMeta } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
    post: PostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="group relative rounded-lg border p-6 hover:bg-muted/50">
            <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-foreground hover:underline"
                        >
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-muted-foreground">{post.description}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>·</span>
                    <span>{post.readingTime.text}</span>
                    {post.tags.length > 0 && (
                        <>
                            <span>·</span>
                            <div className="flex items-center gap-2">
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/tag/${tag}`}
                                        className="hover:text-foreground"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
} 