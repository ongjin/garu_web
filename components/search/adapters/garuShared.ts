let garuPromise: Promise<unknown> | null = null;

export function loadGaru(): Promise<unknown> {
  garuPromise ??= import('garu-ko').then(({ Garu }) => Garu.load());
  return garuPromise;
}
