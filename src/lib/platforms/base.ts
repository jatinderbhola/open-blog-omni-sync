import { Post } from '@/types/blog';
import { PlatformAdapter, PlatformConfig, PublishResult } from '@/types/platform';

export abstract class BasePlatformAdapter implements PlatformAdapter {
    protected config: PlatformConfig;

    constructor(config: PlatformConfig) {
        this.config = config;
    }

    get name(): string {
        return this.config.name;
    }

    abstract publish(post: Post): Promise<PublishResult>;

    async validate(): Promise<boolean> {
        if (!this.config.enabled) {
            return false;
        }

        // Check for required configuration
        const requiredFields = this.getRequiredConfigFields();
        for (const field of requiredFields) {
            if (!this.config[field as keyof PlatformConfig]) {
                throw new Error(`Missing required configuration field: ${field}`);
            }
        }

        return true;
    }

    protected abstract getRequiredConfigFields(): string[];

    protected async handleError(error: unknown): Promise<PublishResult> {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
            success: false,
            error: errorMessage,
            platformName: this.name,
        };
    }
} 