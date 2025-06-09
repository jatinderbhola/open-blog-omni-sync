declare module 'gray-matter' {
    interface GrayMatterFile<T = any> {
        data: T;
        content: string;
        excerpt?: string;
        orig: string;
    }

    function matter(
        input: string,
        options?: any
    ): GrayMatterFile;

    export = matter;
}

declare module 'remark' {
    function remark(): any;
    export { remark };
}

declare module 'remark-html' {
    const html: any;
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