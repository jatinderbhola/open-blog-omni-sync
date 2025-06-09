import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';
import { Post, PostFrontmatter, PostMeta, PostStatus } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const draftsDirectory = path.join(process.cwd(), 'content/drafts');

export async function getPostBySlug(slug: string, status: PostStatus = 'published'): Promise<Post | null> {
    const directory = status === 'published' ? postsDirectory : draftsDirectory;
    const fullPath = path.join(directory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();

    const frontmatter = data as PostFrontmatter;
    const stats = readingTime(content);

    return {
        ...frontmatter,
        slug,
        content: contentHtml,
        readingTime: stats,
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

                return {
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    slug,
                    tags: data.tags,
                    author: data.author,
                    readingTime: {
                        text: stats.text,
                    },
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

export function getAllTags(): Record<string, number> {
    const posts = fs.readdirSync(postsDirectory)
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => {
            const fileContents = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
            const { data } = matter(fileContents);
            return (data as PostFrontmatter).tags || [];
        });

    const tagCounts: Record<string, number> = {};
    posts.flat().forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    return tagCounts;
}

export function getFeaturedPosts(): Promise<PostMeta[]> {
    return getAllPosts().then(posts =>
        posts.filter(post => {
            const fullPost = matter(
                fs.readFileSync(path.join(postsDirectory, `${post.slug}.md`), 'utf8')
            ).data as PostFrontmatter;
            return fullPost.featured;
        })
    );
} 