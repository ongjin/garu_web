'use client';

import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm i garu-ko');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer className="mt-12 border-t border-gray-200 py-6 text-center text-sm text-gray-400 space-y-2">
      <div className="flex justify-center items-center gap-2">
        <code className="rounded bg-gray-100 px-2 py-1 text-gray-600">npm i garu-ko</code>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Copy"
        >
          {copied ? '✓' : '📋'}
        </button>
      </div>
      <div className="flex justify-center gap-4">
        <a
          href="https://github.com/ongjin/garu"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/garu-ko"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          npm
        </a>
      </div>
      <p>100% client-side, no server required</p>
    </footer>
  );
}
