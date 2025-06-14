import Link from 'next/link';
import { Post } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import { AUTHOR_CONFIG } from '@/config/author';

interface BlogPostProps {
	post: Post;
}

export function BlogPost({ post }: BlogPostProps) {
	return (
		<article className="container py-10">
			<header className="flex flex-col space-y-4">
				<h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
				<div className="text-muted-foreground flex items-center space-x-4 text-sm">
					<time dateTime={post.date}>{formatDate(post.date)}</time>
					<span>·</span>
					<span>{post.readingTime.text}</span>
					{post.tags.length > 0 && (
						<>
							<span>·</span>
							<div className="flex flex-wrap gap-2">
								{post.tags.map((tag, index) => (
									<Link
										key={`${tag}-${index}`}
										href={`/tag/${tag}`}
										className="bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 text-xs hover:text-foreground"
									>
										#{tag}
									</Link>
								))}
							</div>
						</>
					)}
				</div>
			</header>
			<div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
				<div dangerouslySetInnerHTML={{ __html: post.content }} />
			</div>
			<footer className="mt-10 border-t pt-10">
				<div className="flex justify-between">
					<Link href="/blog" className="hover:text-foreground/80 text-sm font-medium">
						← Back to blog
					</Link>
					<Link
						href={`https://github.com/${AUTHOR_CONFIG.social.github}/open-blog-omni-sync/edit/main/content/posts/${post.slug}.md`}
						className="hover:text-foreground/80 text-sm font-medium"
						target="_blank"
						rel="noopener noreferrer"
					>
						Edit on GitHub →
					</Link>
				</div>
			</footer>
		</article>
	);
}
