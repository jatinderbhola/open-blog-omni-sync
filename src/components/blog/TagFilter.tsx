import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagFilterProps {
	tags: string[] | Record<string, number>;
	selectedTag?: string;
}

export function TagFilter({ tags, selectedTag }: TagFilterProps) {
	const tagArray = Array.isArray(tags) ? tags : Object.keys(tags);

	return (
		<div className="flex flex-wrap gap-2">
			<Link
				href="/blog"
				className={cn(
					'inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium',
					!selectedTag ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
				)}
			>
				All
			</Link>
			{tagArray.map((tag) => (
				<Link
					key={tag}
					href={`/tag/${tag}`}
					className={cn(
						'inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium',
						selectedTag === tag
							? 'bg-primary text-primary-foreground'
							: 'bg-muted hover:bg-muted/80'
					)}
				>
					{tag}
					{!Array.isArray(tags) && <span className="text-muted-foreground ml-2">{tags[tag]}</span>}
				</Link>
			))}
		</div>
	);
}
