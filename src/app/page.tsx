import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogList } from '@/components/blog/BlogList';
import { getFeaturedPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';

export default async function HomePage() {
	const featuredPosts = await getFeaturedPosts();

	return (
		<>
			<Header />
			<main className="flex-1">
				<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
					<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
						<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
							{SITE_CONFIG.name}
						</h1>
						<p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
							{SITE_CONFIG.description}
						</p>
					</div>
				</section>
				{featuredPosts.length > 0 && (
					<section className="container space-y-6 py-8 md:py-12 lg:py-24">
						<BlogList
							posts={featuredPosts}
							title="Featured Posts"
							description="Check out our latest featured blog posts."
						/>
					</section>
				)}
			</main>
			<Footer />
		</>
	);
}
