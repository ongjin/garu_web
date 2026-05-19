'use client';

import type { ChipSet } from '@/lib/search/suggestionChips';

interface Props {
  chips: ChipSet[];
  onSelect: (v: string) => void;
  disabled?: boolean;
}

export default function SuggestionChips({ chips, onSelect, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <button
          key={c.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(c.label)}
          title={c.hint}
          className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted hover:border-[var(--accent)] hover:text-[var(--accent-text)] disabled:opacity-50"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
