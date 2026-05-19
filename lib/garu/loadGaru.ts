import type { Garu } from 'garu-ko';

let garuPromise: Promise<Garu> | null = null;

export function loadGaru(): Promise<Garu> {
  garuPromise ??= import('garu-ko').then(({ Garu }) => Garu.load());
  return garuPromise;
}
