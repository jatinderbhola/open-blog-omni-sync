import { Post } from '@/types/blog';
import { PublishResult } from '@/types/platform';
import { BasePlatformAdapter } from './base';

export class RSSPlatformAdapter extends BasePlatformAdapter {
    async publish(post: Post): Promise<PublishResult> {
        try {
            // RSS feed is generated automatically by Next.js API route
            // This adapter is a placeholder for consistency
            return {
                success: true,
                url: `${process.env.NEXT_PUBLIC_APP_URL}/feed.xml`,
                platformName: this.name,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    protected getRequiredConfigFields(): string[] {
        return []; // No required fields for RSS
    }
} 