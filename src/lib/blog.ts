import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import readingTime from 'reading-time';
import { Post, PostFrontmatter, PostMeta, PostStatus } from '@/types/blog';
const postsDirectory = path.join(process.cwd(), 'content/posts');
const draftsDirectory = path.join(process.cwd(), 'content/drafts');

function validateFrontmatter(data: Record<string, unknown>): PostFrontmatter {
	if (
		typeof data.title !== 'string' ||
		typeof data.description !== 'string' ||
		typeof data.date !== 'string' ||
		!Array.isArray(data.tags) ||
		typeof data.published !== 'boolean' ||
		typeof data.author !== 'string' ||
		(data.featured !== undefined && typeof data.featured !== 'boolean')
	) {
		throw new Error('Invalid frontmatter format');
	}

	return {
		title: data.title,
		description: data.description,
		date: data.date,
		tags: data.tags,
		published: data.published,
		featured: data.featured,
		author: data.author,
		slug: '' // Will be set by the calling function
	};
}

export async function getPostBySlug(
	postSlug: string,
	status: PostStatus = 'published'
): Promise<Post | null> {
	const directory = status === 'published' ? postsDirectory : draftsDirectory;
	const fullPath = path.join(directory, `${postSlug}.md`);

	if (!fs.existsSync(fullPath)) {
		return null;
	}

	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	// Debug: Check type of content before processing
	if (typeof content !== 'string') {
		// eslint-disable-next-line no-console
		console.error(`BLOG DEBUG: Content for slug '${postSlug}' is not a string:`, content);
		return null;
	}

	const processedContent = await remark()
		.use(gfm)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, {
			behavior: 'prepend',
			properties: { className: 'anchor' },
			content: {
				type: 'text',
				value: '#'
			}
		})
		.use(rehypeStringify)
		.process(content);
	const contentHtml = processedContent.toString();

	const frontmatter = validateFrontmatter(data);
	frontmatter.slug = postSlug;
	const stats = readingTime(content);

	return {
		...frontmatter,
		content: contentHtml,
		readingTime: stats
	};
}

export async function getAllPosts(status: PostStatus = 'published'): Promise<PostMeta[]> {
	const directory = status === 'published' ? postsDirectory : draftsDirectory;
	const filenames = fs.readdirSync(directory);

	const posts = await Promise.all(
		filenames
			.filter((filename) => filename.endsWith('.md'))
			.map(async (filename) => {
				const slug = filename.replace(/\.md$/, '');
				const fullPath = path.join(directory, filename);
				const fileContents = fs.readFileSync(fullPath, 'utf8');
				const { data, content } = matter(fileContents);
				const stats = readingTime(content);
				const frontmatter = validateFrontmatter(data);

				return {
					title: frontmatter.title,
					description: frontmatter.description,
					date: frontmatter.date,
					slug,
					tags: frontmatter.tags,
					author: frontmatter.author,
					readingTime: {
						text: stats.text
					}
				} as PostMeta;
			})
	);

	// Sort posts by date in descending order
	return posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
	const posts = await getAllPosts();
	return posts.filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
	const posts = fs
		.readdirSync(postsDirectory)
		.filter((filename) => filename.endsWith('.md'))
		.map((filename) => {
			const fileContents = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
			const { data } = matter(fileContents);
			return validateFrontmatter(data).tags;
		});

	// Get unique tags
	return Array.from(new Set(posts.flat()));
}

export function getFeaturedPosts(): Promise<PostMeta[]> {
	return getAllPosts().then((posts) =>
		posts.filter((post) => {
			const fullPost = validateFrontmatter(
				matter(fs.readFileSync(path.join(postsDirectory, `${post.slug}.md`), 'utf8')).data
			);
			return fullPost.featured;
		})
	);
}
