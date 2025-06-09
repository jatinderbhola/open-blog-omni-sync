import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogList } from '@/components/blog/BlogList';
import { TagFilter } from '@/components/blog/TagFilter';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { createMetadata } from '@/lib/utils';

export const metadata = createMetadata('Blog', 'Read our latest blog posts');

export default async function BlogPage() {
	const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

	return (
		<>
			<Header />
			<main className="flex-1">
				<section className="container py-10">
					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-4">
							<h1 className="text-4xl font-bold tracking-tight">Blog</h1>
							<p className="text-muted-foreground text-xl">Read our latest blog posts.</p>
						</div>
						<TagFilter tags={tags} />
						<BlogList posts={posts} />
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
