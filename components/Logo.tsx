interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Garu logo"
    >
      <defs>
        <linearGradient id="garu-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent, #0d9488)" />
          <stop offset="100%" stopColor="var(--accent-text, #0f766e)" />
        </linearGradient>
        <linearGradient id="garu-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent, #0d9488)" />
          <stop offset="100%" stopColor="var(--accent-text, #0f766e)" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* ㄱ - horizontal stroke */}
      <rect x="14" y="22" width="40" height="10" rx="5" fill="url(#garu-grad)" />
      {/* ㄱ - vertical stroke */}
      <rect x="44" y="22" width="10" height="38" rx="5" fill="url(#garu-grad)" />

      {/* ㅏ - vertical stem */}
      <rect x="68" y="16" width="10" height="52" rx="5" fill="url(#garu-grad)" />
      {/* ㅏ - horizontal tick */}
      <rect x="78" y="36" width="18" height="10" rx="5" fill="url(#garu-grad)" />

      {/* Dissolution particles - flowing down from the strokes */}
      {/* Large particles (close to strokes) */}
      <circle cx="50" cy="68" r="4.5" fill="url(#garu-grad)" opacity="0.85" />
      <circle cx="73" cy="76" r="4" fill="url(#garu-grad)" opacity="0.8" />
      <circle cx="38" cy="74" r="3.5" fill="url(#garu-grad)" opacity="0.7" />
      <circle cx="90" cy="54" r="3" fill="url(#garu-grad-light)" opacity="0.75" />

      {/* Medium particles */}
      <circle cx="60" cy="80" r="3" fill="url(#garu-grad)" opacity="0.6" />
      <circle cx="82" cy="72" r="2.5" fill="url(#garu-grad)" opacity="0.55" />
      <circle cx="28" cy="68" r="2.5" fill="url(#garu-grad-light)" opacity="0.5" />
      <circle cx="46" cy="82" r="2.5" fill="url(#garu-grad)" opacity="0.5" />

      {/* Small particles (scattered further) */}
      <circle cx="70" cy="88" r="2" fill="url(#garu-grad-light)" opacity="0.4" />
      <circle cx="34" cy="84" r="2" fill="url(#garu-grad-light)" opacity="0.35" />
      <circle cx="56" cy="92" r="1.8" fill="url(#garu-grad-light)" opacity="0.35" />
      <circle cx="88" cy="82" r="1.8" fill="url(#garu-grad-light)" opacity="0.3" />
      <circle cx="94" cy="66" r="1.5" fill="url(#garu-grad-light)" opacity="0.3" />

      {/* Tiny particles (dust) */}
      <circle cx="42" cy="92" r="1.2" fill="url(#garu-grad-light)" opacity="0.25" />
      <circle cx="78" cy="92" r="1.2" fill="url(#garu-grad-light)" opacity="0.2" />
      <circle cx="64" cy="98" r="1" fill="url(#garu-grad-light)" opacity="0.2" />
      <circle cx="50" cy="100" r="1" fill="url(#garu-grad-light)" opacity="0.15" />
      <circle cx="84" cy="96" r="0.8" fill="url(#garu-grad-light)" opacity="0.15" />
    </svg>
  );
}
