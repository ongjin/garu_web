'use client';

// Inline script to prevent flash of wrong theme on page load.
// This is a hardcoded static string — no user input is involved,
// so dangerouslySetInnerHTML is safe here (standard Next.js pattern for theme detection).
const THEME_INIT_SCRIPT = `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})()`;

export function ThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
