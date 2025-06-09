import Link from 'next/link';
import { PostMeta } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
	post: PostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
	return (
		<article className="hover:bg-muted/50 group relative rounded-lg border p-6">
			<div className="flex flex-col justify-between space-y-4">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold tracking-tight">
						<Link href={`/blog/${post.slug}`} className="text-foreground hover:underline">
							{post.title}
						</Link>
					</h2>
					<p className="text-muted-foreground">{post.description}</p>
				</div>
				<div className="text-muted-foreground flex items-center space-x-4 text-sm">
					<time dateTime={post.date}>{formatDate(post.date)}</time>
					<span>·</span>
					<span>{post.readingTime.text}</span>
					{post.tags.length > 0 && (
						<>
							<span>·</span>
							<div className="flex max-w-full flex-wrap items-center gap-2">
								{post.tags.slice(0, 4).map((tag) => (
									<Link
										key={tag}
										href={`/tag/${tag}`}
										className="bg-muted text-muted-foreground hover:text-foreground rounded border px-2 py-0.5 text-xs font-medium"
										style={{ whiteSpace: 'nowrap' }}
									>
										#{tag}
									</Link>
								))}
								{post.tags.length > 4 && (
									<span className="text-muted-foreground text-xs">
										+{post.tags.length - 4} more
									</span>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</article>
	);
}
