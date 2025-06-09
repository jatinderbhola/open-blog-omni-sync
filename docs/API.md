# API Documentation

This document describes the internal APIs and utilities available in the blog platform.

## Blog API

### `getPostBySlug(slug: string, status: PostStatus = 'published'): Promise<Post | null>`

Retrieves a blog post by its slug.

```typescript
const post = await getPostBySlug('getting-started');
```

### `getAllPosts(status: PostStatus = 'published'): Promise<PostMeta[]>`

Retrieves all blog posts.

```typescript
const posts = await getAllPosts();
```

### `getPostsByTag(tag: string): Promise<PostMeta[]>`

Retrieves all posts with a specific tag.

```typescript
const posts = await getPostsByTag('nextjs');
```

### `getAllTags(): string[]`

Retrieves all unique tags used in blog posts.

```typescript
const tags = getAllTags();
```

### `getFeaturedPosts(): Promise<PostMeta[]>`

Retrieves all featured blog posts.

```typescript
const featuredPosts = await getFeaturedPosts();
```

## Platform API

### Base Platform Adapter

All platform adapters extend the `BasePlatformAdapter` class:

```typescript
abstract class BasePlatformAdapter implements PlatformAdapter {
	protected config: PlatformConfig;

	constructor(config: PlatformConfig) {
		this.config = config;
	}

	abstract publish(post: Post): Promise<PublishResult>;
	abstract getRequiredConfigFields(): string[];
}
```

### Platform Configuration

```typescript
interface PlatformConfig {
	name: string;
	enabled: boolean;
	apiKey?: string;
	apiSecret?: string;
	userId?: string;
	redirectUri?: string;
}
```

### Publishing Result

```typescript
interface PublishResult {
	success: boolean;
	url?: string;
	error?: string;
	platformName: string;
}
```

## Utility Functions

### `formatDate(date: string | Date): string`

Formats a date in a human-readable format.

```typescript
const formattedDate = formatDate('2024-01-15');
// Output: "January 15, 2024"
```

### `slugify(text: string): string`

Converts text to a URL-friendly slug.

```typescript
const slug = slugify('Hello World!');
// Output: "hello-world"
```

### `truncate(text: string, length: number): string`

Truncates text to a specified length.

```typescript
const truncated = truncate('Long text...', 10);
// Output: "Long text..."
```

### `generateMetadata(title: string, description: string)`

Generates metadata for SEO.

```typescript
const metadata = generateMetadata('Page Title', 'Page Description');
```

## Types

### Post

```typescript
interface Post {
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
	featured?: boolean;
	author: string;
	slug: string;
	content: string;
	readingTime: {
		text: string;
		minutes: number;
		time: number;
		words: number;
	};
}
```

### PostMeta

```typescript
interface PostMeta {
	title: string;
	description: string;
	date: string;
	slug: string;
	tags: string[];
	author: string;
	readingTime: {
		text: string;
	};
}
```

## RSS Feed

The RSS feed is automatically generated at `/rss.xml` and includes:

- Post title
- Post description
- Publication date
- Author
- Tags
- Full content URL

## Error Handling

All API functions include proper error handling and type checking. Errors are propagated up the call stack and should be handled by the calling code.

Example error handling:

```typescript
try {
	const post = await getPostBySlug('non-existent');
	if (!post) {
		// Handle not found case
	}
} catch (error) {
	// Handle other errors
	console.error('Failed to fetch post:', error);
}
```
