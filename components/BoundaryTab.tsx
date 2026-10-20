'use client';

import { useMemo } from 'react';
import { splitSentences } from 'garu-ko/sentences';
import { restoreSpacing } from 'garu-ko/text';

export default function BoundaryTab({ text }: { text: string }) {
  const sentences = useMemo(
    () => text.trim() ? splitSentences(text) : [],
    [text],
  );
  const restored = useMemo(
    () => text.trim() ? restoreSpacing(text) : '',
    [text],
  );

  if (!text.trim()) {
    return <p className="py-8 text-center text-sm text-muted">텍스트를 입력하고 분석하기를 눌러 주세요.</p>;
  }

  return (
    <div className="space-y-6">
      <section aria-label="문장 분리 결과">
        <h3 className="text-sm font-semibold text-foreground">
          문장 분리 <span className="ml-1 text-muted">{sentences.length}개</span>
        </h3>
        <p className="mt-1 text-xs text-muted">
          원문을 유지하며 문장을 나눕니다. 짝이 맞는 인용문 내부는 나누지 않습니다.
        </p>
        <ol className="mt-3 space-y-2">
          {sentences.map((sentence, index) => (
            <li key={sentence.offset} className="flex gap-3 rounded-lg border border-border bg-surface p-3">
              <span className="shrink-0 text-xs text-muted">{index + 1}</span>
              <p className="min-w-0 whitespace-pre-wrap break-words text-sm text-foreground">{sentence.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-label="공백 복원 결과">
        <h3 className="text-sm font-semibold text-foreground">공백 복원</h3>
        <p className="mt-1 text-xs text-muted">
          기존 공백을 유지하며 필요한 공백을 보수적으로 추가합니다. 모호한 표현은 복원되지 않을 수 있습니다.
        </p>
        <p className="mt-3 whitespace-pre-wrap break-words rounded-lg border border-border bg-surface p-3 text-sm text-foreground">
          {restored}
        </p>
      </section>
    </div>
  );
}
