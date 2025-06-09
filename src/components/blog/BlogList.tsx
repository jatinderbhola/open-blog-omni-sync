import { PostMeta } from '@/types/blog';
import { BlogCard } from './BlogCard';

interface BlogListProps {
    posts: PostMeta[];
    title?: string;
    description?: string;
}

export function BlogList({ posts, title, description }: BlogListProps) {
    return (
        <div className="container py-10">
            {title && (
                <h1 className="mb-4 text-3xl font-bold tracking-tight">
                    {title}
                </h1>
            )}
            {description && (
                <p className="mb-8 text-xl text-muted-foreground">
                    {description}
                </p>
            )}
            {posts.length > 0 ? (
                <div className="grid gap-10 sm:grid-cols-2">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">
                    No posts found.
                </p>
            )}
        </div>
    );
} 