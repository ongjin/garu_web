'use client';

import { useState } from 'react';

interface Props {
  install: string;
  code: string;
}

export default function CodeSnippet({ install, code }: Props) {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  function copy(text: string, set: (b: boolean) => void) {
    navigator.clipboard.writeText(text);
    set(true);
    setTimeout(() => set(false), 1500);
  }

  return (
    <section className="space-y-3">
      <div className="rounded-lg border border-border bg-surface p-3">
        <header className="mb-2 flex items-center justify-between text-xs text-muted">
          <span>설치</span>
          <button
            type="button"
            onClick={() => copy(install, setCopiedInstall)}
            className="rounded px-2 py-0.5 hover:bg-[var(--accent)]/10"
          >
            {copiedInstall ? '복사됨' : '복사'}
          </button>
        </header>
        <pre className="overflow-x-auto font-mono text-sm">
          <code>{install}</code>
        </pre>
      </div>

      <div className="rounded-lg border border-border bg-surface p-3">
        <header className="mb-2 flex items-center justify-between text-xs text-muted">
          <span>사용법</span>
          <button
            type="button"
            onClick={() => copy(code, setCopiedCode)}
            className="rounded px-2 py-0.5 hover:bg-[var(--accent)]/10"
          >
            {copiedCode ? '복사됨' : '복사'}
          </button>
        </header>
        <pre className="overflow-x-auto font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}
