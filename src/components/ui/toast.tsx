'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
	message: string;
	type?: 'success' | 'error';
	duration?: number;
	onClose?: () => void;
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
	React.useEffect(() => {
		const timer = setTimeout(() => {
			onClose?.();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<div
			className={cn(
				'fixed right-4 bottom-4 z-50 rounded-lg px-4 py-2 text-sm font-medium shadow-lg',
				type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
			)}
			role="alert"
		>
			{message}
		</div>
	);
}
