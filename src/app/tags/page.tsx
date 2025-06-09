import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { createMetadata } from '@/lib/utils';

export const metadata = createMetadata('Tags', 'Browse posts by tags');

export default async function TagsPage() {
	const tags = await getAllTags();
	const tagCounts = await Promise.all(
		tags.map(async (tag) => {
			const posts = await getPostsByTag(tag);
			return [tag, posts.length] as [string, number];
		})
	);

	// Sort by post count in descending order
	const sortedTags = tagCounts.sort((a, b) => b[1] - a[1]);

	return (
		<>
			<Header />
			<main className="flex-1">
				<section className="container py-10">
					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-4">
							<h1 className="text-4xl font-bold tracking-tight">Tags</h1>
							<p className="text-muted-foreground text-xl">Browse posts by tags.</p>
						</div>
						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{sortedTags.map(([tag, count]) => (
								<a
									key={tag}
									href={`/tag/${tag}`}
									className="hover:bg-muted/50 flex flex-col rounded-lg border p-4"
								>
									<span className="text-lg font-medium">#{tag}</span>
									<span className="text-muted-foreground text-sm">
										{count} {count === 1 ? 'post' : 'posts'}
									</span>
								</a>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
