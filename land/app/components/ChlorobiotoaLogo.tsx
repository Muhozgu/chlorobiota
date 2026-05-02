export function ChlorobiotoaLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer leaf */}
      <path
        d="M50 10C50 10 25 20 25 50C25 70 35 85 50 90C65 85 75 70 75 50C75 20 50 10 50 10Z"
        fill="url(#gradient1)"
        stroke="#059669"
        strokeWidth="2"
      />
      {/* Inner leaf vein */}
      <path
        d="M50 15L50 85"
        stroke="#047857"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Left veins */}
      <path
        d="M50 30C45 35 38 40 35 45"
        stroke="#047857"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M50 45C45 50 40 55 37 60"
        stroke="#047857"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M50 60C47 65 43 68 40 72"
        stroke="#047857"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Right veins */}
      <path
        d="M50 30C55 35 62 40 65 45"
        stroke="#047857"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M50 45C55 50 60 55 63 60"
        stroke="#047857"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M50 60C53 65 57 68 60 72"
        stroke="#047857"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <defs>
        <linearGradient id="gradient1" x1="50" y1="10" x2="50" y2="90">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}
