declare module 'gray-matter' {
	interface GrayMatterFile<T = Record<string, unknown>> {
		data: T;
		content: string;
		excerpt?: string;
		orig: string;
	}

	interface GrayMatterOptions {
		excerpt?: boolean;
		excerpt_separator?: string;
		engines?: Record<string, unknown>;
		language?: string;
		delimiters?: string[];
	}

	function matter(input: string, options?: GrayMatterOptions): GrayMatterFile;

	export = matter;
}

declare module 'remark' {
	interface RemarkInstance {
		use: (plugin: unknown, ...args: unknown[]) => RemarkInstance;
		process: (content: string) => Promise<{ contents: string }>;
	}
	function remark(): RemarkInstance;
	export { remark };
}

declare module 'remark-html' {
	import { Plugin } from 'unified';
	const html: Plugin;
	export default html;
}

declare module 'reading-time' {
	interface ReadingTimeResult {
		text: string;
		minutes: number;
		time: number;
		words: number;
	}
	function readingTime(text: string): ReadingTimeResult;
	export default readingTime;
}

declare module 'tailwind-merge' {
	export function twMerge(...classLists: (string | undefined)[]): string;
}
