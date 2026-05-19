'use client';

import { useEffect, useState } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, disabled, placeholder }: Props) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    if (local === value) return;
    const t = setTimeout(() => onChange(local), 100);
    return () => clearTimeout(t);
  }, [local, value, onChange]);

  return (
    <input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      disabled={disabled}
      placeholder={placeholder ?? '검색어를 입력하세요'}
      className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-base outline-none focus:border-[var(--accent)] disabled:opacity-50"
    />
  );
}
