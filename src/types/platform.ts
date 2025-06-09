import { Post } from './blog';

export interface PlatformConfig {
	name: string;
	enabled: boolean;
	apiKey?: string;
	apiSecret?: string;
	userId?: string;
	redirectUri?: string;
}

export interface PublishResult {
	success: boolean;
	url?: string;
	error?: string;
	platformName: string;
}

export interface PlatformAdapter {
	name: string;
	publish: (post: Post) => Promise<PublishResult>;
	validate: () => Promise<boolean>;
}

export interface PublishOptions {
	platforms: string[];
	draft?: boolean;
	scheduledDate?: Date;
}
