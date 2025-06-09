import Link from 'next/link';
import { NAVIGATION, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { RSSIcon } from '@/components/shared/RSSIcon';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold">{SITE_CONFIG.name}</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'transition-colors hover:text-foreground/80',
                                    item.href === '/' ? 'text-foreground' : 'text-foreground/60'
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
                    <Link
                        href="/feed.xml"
                        className="text-foreground/60 transition-colors hover:text-foreground/80"
                        title="RSS Feed"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RSSIcon className="h-5 w-5" />
                        <span className="sr-only">RSS Feed</span>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
} 