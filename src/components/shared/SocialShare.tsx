'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toast } from '@/components/ui/toast';

interface SocialShareProps {
	url: string;
	title: string;
	description: string;
	className?: string;
}

export function SocialShare({ url, title, description, className }: SocialShareProps) {
	const [showToast, setShowToast] = useState(false);
	const encodedUrl = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);
	const encodedDescription = encodeURIComponent(description);

	const shareLinks = [
		{
			name: 'Twitter',
			href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
			icon: Twitter
		},
		{
			name: 'LinkedIn',
			href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
			icon: Linkedin
		}
	];

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setShowToast(true);
		} catch (err) {
			console.error('Failed to copy URL:', err);
		}
	};

	return (
		<>
			<div className={cn('flex items-center space-x-2', className)}>
				{shareLinks.map((link) => {
					const Icon = link.icon;
					return (
						<a
							key={link.name}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-lg"
							title={`Share on ${link.name}`}
						>
							<Icon className="h-4 w-4" />
							<span className="sr-only">Share on {link.name}</span>
						</a>
					);
				})}
				<button
					onClick={copyToClipboard}
					className="bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-lg"
					title="Copy link"
				>
					<LinkIcon className="h-4 w-4" />
					<span className="sr-only">Copy link</span>
				</button>
			</div>
			{showToast && (
				<Toast message="Link copied to clipboard!" onClose={() => setShowToast(false)} />
			)}
		</>
	);
}
