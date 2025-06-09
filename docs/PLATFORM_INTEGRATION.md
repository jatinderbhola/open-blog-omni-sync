# Platform Integration Guide

This guide explains how to integrate new publishing platforms into the blog system.

## Architecture Overview

The platform integration system uses an adapter pattern:

```
BasePlatformAdapter
├── RSSPlatformAdapter
├── LinkedInPlatformAdapter (future)
└── MediumPlatformAdapter (future)
```

Each adapter implements the `PlatformAdapter` interface and extends the `BasePlatformAdapter` class.

## Adding a New Platform

### 1. Create the Adapter

Create a new file in `src/lib/platforms/` (e.g., `twitter.ts`):

```typescript
import { Post } from '@/types/blog';
import { PublishResult } from '@/types/platform';
import { BasePlatformAdapter } from './base';

export class TwitterPlatformAdapter extends BasePlatformAdapter {
	async publish(post: Post): Promise<PublishResult> {
		try {
			// Implement the platform-specific publishing logic
			const response = await this.publishToTwitter(post);

			return {
				success: true,
				url: response.url,
				platformName: this.name
			};
		} catch (error) {
			return this.handleError(error);
		}
	}

	protected getRequiredConfigFields(): string[] {
		return ['apiKey', 'apiSecret', 'userId'];
	}

	private async publishToTwitter(post: Post) {
		// Implement the actual API calls to Twitter
		// Handle authentication, rate limiting, etc.
	}
}
```

### 2. Update Configuration

Add the platform configuration in `src/lib/constants.ts`:

```typescript
export const PLATFORM_CONFIG = {
	// ... existing platforms ...
	twitter: {
		name: 'Twitter',
		enabled: false,
		apiKey: process.env.TWITTER_API_KEY,
		apiSecret: process.env.TWITTER_API_SECRET,
		userId: process.env.TWITTER_USER_ID
	}
} as const;
```

### 3. Update Environment Variables

Add the required environment variables to `.env.example`:

```bash
# Twitter Integration
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_USER_ID=your_twitter_user_id
```

### 4. Register the Platform

Update the platform registry in `src/lib/platforms/index.ts`:

```typescript
import { TwitterPlatformAdapter } from './twitter';
import { PLATFORM_CONFIG } from '@/lib/constants';

export const platforms = {
	// ... existing platforms ...
	twitter: new TwitterPlatformAdapter(PLATFORM_CONFIG.twitter)
};
```

## Platform Integration Requirements

### Authentication

- Implement OAuth flow if required
- Store tokens securely
- Handle token refresh
- Implement rate limiting

### Content Transformation

- Transform markdown to platform-specific format
- Handle platform-specific limitations
- Process images and media
- Manage character limits

### Error Handling

- Handle API errors gracefully
- Implement retry logic
- Log errors appropriately
- Provide meaningful error messages

## Testing

### Unit Tests

Create tests in `__tests__/platforms/`:

```typescript
import { TwitterPlatformAdapter } from '@/lib/platforms/twitter';

describe('TwitterPlatformAdapter', () => {
	it('should publish a post successfully', async () => {
		// Test implementation
	});

	it('should handle errors appropriately', async () => {
		// Test implementation
	});
});
```

### Integration Tests

Test the complete publishing flow:

```typescript
describe('Twitter Integration', () => {
	it('should publish to Twitter with proper formatting', async () => {
		// Test implementation
	});
});
```

## Best Practices

1. **Rate Limiting**

   - Implement proper rate limiting
   - Use queuing for multiple posts
   - Handle API quotas

2. **Error Recovery**

   - Implement retry mechanisms
   - Handle temporary failures
   - Log detailed error information

3. **Content Adaptation**

   - Handle platform-specific formatting
   - Adapt content length
   - Process media appropriately

4. **Security**
   - Secure API credentials
   - Implement proper OAuth flows
   - Validate input data

## Example Implementation

### Medium Integration Example

```typescript
import { Post } from '@/types/blog';
import { PublishResult } from '@/types/platform';
import { BasePlatformAdapter } from './base';

export class MediumPlatformAdapter extends BasePlatformAdapter {
	async publish(post: Post): Promise<PublishResult> {
		try {
			const content = this.transformContent(post);
			const response = await this.publishToMedium(content);

			return {
				success: true,
				url: response.url,
				platformName: this.name
			};
		} catch (error) {
			return this.handleError(error);
		}
	}

	protected getRequiredConfigFields(): string[] {
		return ['apiKey', 'userId'];
	}

	private transformContent(post: Post) {
		// Transform markdown to Medium format
		// Handle images and other media
		return {
			title: post.title,
			contentFormat: 'markdown',
			content: post.content,
			tags: post.tags,
			publishStatus: 'draft'
		};
	}

	private async publishToMedium(content: any) {
		// Implement Medium API calls
		// Handle authentication and errors
	}
}
```

## Troubleshooting

Common issues and solutions:

1. **Authentication Failures**

   - Check API credentials
   - Verify OAuth configuration
   - Check token expiration

2. **Rate Limiting**

   - Implement exponential backoff
   - Monitor API quotas
   - Use caching where appropriate

3. **Content Issues**

   - Verify content formatting
   - Check media handling
   - Validate character limits

4. **API Changes**
   - Monitor platform API changes
   - Update adapter implementations
   - Test regularly

## Support

For help with platform integration:

1. Check the platform's API documentation
2. Review existing adapter implementations
3. Test thoroughly before deployment
4. Monitor for errors and issues
