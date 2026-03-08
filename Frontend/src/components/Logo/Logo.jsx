const Logo = ({ size = 40, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Film reel outer ring */}
    <circle cx="60" cy="60" r="56" stroke="#f5c518" strokeWidth="3" />
    <circle
      cx="60"
      cy="60"
      r="48"
      stroke="#f5c518"
      strokeWidth="1.5"
      opacity="0.4"
    />

    {/* Sprocket holes */}
    <circle cx="60" cy="8" r="4" fill="#f5c518" />
    <circle cx="60" cy="112" r="4" fill="#f5c518" />
    <circle cx="8" cy="60" r="4" fill="#f5c518" />
    <circle cx="112" cy="60" r="4" fill="#f5c518" />
    <circle cx="23" cy="23" r="3.5" fill="#f5c518" opacity="0.7" />
    <circle cx="97" cy="23" r="3.5" fill="#f5c518" opacity="0.7" />
    <circle cx="23" cy="97" r="3.5" fill="#f5c518" opacity="0.7" />
    <circle cx="97" cy="97" r="3.5" fill="#f5c518" opacity="0.7" />

    {/* Inner wave — the "Wave" part of CineWave */}
    <path
      d="M30 60 Q40 42, 50 60 T70 60 T90 60"
      stroke="#f5c518"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />

    {/* Play triangle */}
    <path d="M52 44 L72 60 L52 76Z" fill="#f5c518" opacity="0.9" />

    {/* Center dot */}
    <circle cx="60" cy="60" r="3" fill="#0a0a1a" />
  </svg>
);

export default Logo;
