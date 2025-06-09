export interface PostFrontmatter {
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
	featured?: boolean;
	author: string;
	slug: string;
	coverImage?: string;
	excerpt?: string;
}

export interface Post extends PostFrontmatter {
	content: string;
	readingTime: {
		text: string;
		minutes: number;
		time: number;
		words: number;
	};
}

export interface PostMeta {
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

export type PostStatus = 'draft' | 'published';
