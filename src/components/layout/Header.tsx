import Link from 'next/link';
import { NAVIGATION, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

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
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
} 