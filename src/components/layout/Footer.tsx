import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
    return (
        <footer className="border-t">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose md:text-left">
                        Built by{' '}
                        <Link
                            href={SITE_CONFIG.author.website}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            {SITE_CONFIG.author.name}
                        </Link>
                        . The source code is available on{' '}
                        <Link
                            href={SITE_CONFIG.author.github}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex items-center space-x-1">
                    <Link
                        href={SITE_CONFIG.author.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    {SITE_CONFIG.links.twitter && (
                        <Link
                            href={SITE_CONFIG.links.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
                        >
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                    )}
                    <Link
                        href={SITE_CONFIG.author.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
                    >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
} 