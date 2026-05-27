'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { preloadSearchIndexes } from '@/lib/search/searchIndexCache';

const LINKS = [
  { href: '/', label: '형태소' },
  { href: '/use-cases', label: '활용사례' },
  { href: '/minisearch', label: 'MiniSearch' },
  { href: '/orama', label: 'Orama' },
];

export default function PageNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const isNavigating = pendingHref !== null && pendingHref !== pathname;

  useEffect(() => {
    for (const { href } of LINKS) {
      if (href !== pathname) router.prefetch(href);
    }
  }, [pathname, router]);

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(() => preloadSearchIndexes(), {
        timeout: 1500,
      });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(() => preloadSearchIndexes(), 600);
    return () => window.clearTimeout(handle);
  }, []);

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      href === pathname
    ) {
      return;
    }
    setPendingHref(href);
  };

  return (
    <nav className="relative flex items-center justify-between py-4">
      <ul className="flex gap-1 text-sm">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          const pending = pendingHref === l.href && isNavigating;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(event) => handleNavigate(event, l.href)}
                className={`rounded-full px-3 py-1.5 ${
                  active
                    ? 'bg-[var(--accent)]/10 text-[var(--accent-text)]'
                    : pending
                      ? 'bg-[var(--accent)]/5 text-[var(--accent-text)]'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2">
        {isNavigating && (
          <span
            role="status"
            aria-live="polite"
            className="hidden items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-surface px-3 py-1 text-xs font-medium text-[var(--accent-text)] shadow-[0_8px_24px_rgba(13,148,136,0.08)] sm:inline-flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            페이지 이동 중
          </span>
        )}
        <ThemeToggle />
      </div>
      {isNavigating && (
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden rounded-full bg-border sm:hidden"
          aria-hidden="true"
        >
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--accent)]" />
        </div>
      )}
    </nav>
  );
}
