import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AUTHOR_CONFIG } from '@/config/author';
import { getAvatarUrl } from '@/lib/utils';
import Image from 'next/image';

export const metadata = {
	title: 'About',
	description: AUTHOR_CONFIG.bio
};

export default function AboutPage() {
	const avatarUrl = getAvatarUrl(AUTHOR_CONFIG.avatar, AUTHOR_CONFIG.name);

	return (
		<>
			<Header />
			<main className="flex-1">
				<section className="container py-10">
					<div className="mx-auto max-w-3xl">
						<div className="flex flex-col items-center gap-8 text-center">
							<Image
								src={avatarUrl}
								alt={AUTHOR_CONFIG.name}
								className="h-32 w-32 rounded-full"
								width={128}
								height={128}
								priority
							/>
							<div className="space-y-2">
								<h1 className="text-4xl font-bold tracking-tight">{AUTHOR_CONFIG.name}</h1>
								<p className="text-muted-foreground text-xl">{AUTHOR_CONFIG.bio}</p>
								<p className="text-muted-foreground">📍 {AUTHOR_CONFIG.location}</p>
							</div>
							<div className="flex gap-4">
								<a
									href={AUTHOR_CONFIG.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-foreground"
								>
									GitHub
								</a>
								<a
									href={AUTHOR_CONFIG.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-foreground"
								>
									LinkedIn
								</a>
								{AUTHOR_CONFIG.social.twitter && (
									<a
										href={`https://twitter.com/${AUTHOR_CONFIG.social.twitter}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-muted-foreground hover:text-foreground"
									>
										Twitter
									</a>
								)}
							</div>
						</div>
						<div className="prose prose-gray dark:prose-invert mx-auto mt-16">
							<h2>About the Blog</h2>
							<p>
								This blog is built with Next.js and uses markdown files for content. It features
								multi-platform publishing capabilities, allowing content to be automatically
								syndicated to various platforms.
							</p>
							<h2>Contact</h2>
							<p>
								Feel free to reach out to me at{' '}
								<a href={`mailto:${AUTHOR_CONFIG.email}`}>{AUTHOR_CONFIG.email}</a>
							</p>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
