'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/', label: '형태소' },
  { href: '/minisearch', label: 'MiniSearch' },
  { href: '/orama', label: 'Orama' },
];

export default function PageNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between py-4">
      <ul className="flex gap-1 text-sm">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-full px-3 py-1.5 ${
                  active
                    ? 'bg-[var(--accent)]/10 text-[var(--accent-text)]'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <ThemeToggle />
    </nav>
  );
}
