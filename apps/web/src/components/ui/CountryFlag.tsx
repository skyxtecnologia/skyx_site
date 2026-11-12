import type { SVGProps } from 'react';

interface CountryFlagProps extends SVGProps<SVGSVGElement> {
  code: 'BR' | 'US' | 'ES';
  className?: string;
}

export function CountryFlag({ code, className = '', ...props }: CountryFlagProps) {
  if (code === 'BR') {
    return (
      <svg
        viewBox="0 0 720 504"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Bandeira do Brasil"
        {...props}
      >
        <title>Bandeira do Brasil</title>
        <rect width="720" height="504" fill="#009B3A" rx="4" />
        <polygon points="360,42 660,252 360,462 60,252" fill="#FEDF00" />
        <circle cx="360" cy="252" r="126" fill="#002776" />
        <path
          d="M234 252a126 126 0 0 1 252 0c0-10-80-26-126-26s-126 16-126 26z"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (code === 'US') {
    return (
      <svg
        viewBox="0 0 720 504"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Flag of the United States"
        {...props}
      >
        <title>Flag of the United States</title>
        <rect width="720" height="504" fill="#B22234" rx="4" />
        <rect y="38.7" width="720" height="38.7" fill="#FFFFFF" />
        <rect y="116.3" width="720" height="38.7" fill="#FFFFFF" />
        <rect y="193.8" width="720" height="38.7" fill="#FFFFFF" />
        <rect y="271.4" width="720" height="38.7" fill="#FFFFFF" />
        <rect y="348.9" width="720" height="38.7" fill="#FFFFFF" />
        <rect y="426.5" width="720" height="38.7" fill="#FFFFFF" />
        <rect width="288" height="271.4" fill="#3C3B6E" />
        <circle cx="72" cy="67" r="14" fill="#FFFFFF" />
        <circle cx="144" cy="67" r="14" fill="#FFFFFF" />
        <circle cx="216" cy="67" r="14" fill="#FFFFFF" />
        <circle cx="108" cy="135" r="14" fill="#FFFFFF" />
        <circle cx="180" cy="135" r="14" fill="#FFFFFF" />
        <circle cx="72" cy="204" r="14" fill="#FFFFFF" />
        <circle cx="144" cy="204" r="14" fill="#FFFFFF" />
        <circle cx="216" cy="204" r="14" fill="#FFFFFF" />
      </svg>
    );
  }

  // ES (Spain)
  return (
    <svg
      viewBox="0 0 720 504"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bandera de España"
      {...props}
    >
      <title>Bandera de España</title>
      <rect width="720" height="504" fill="#AA151B" rx="4" />
      <rect y="126" width="720" height="252" fill="#F1BF00" />
      <rect x="150" y="210" width="60" height="84" rx="10" fill="#AA151B" opacity="0.85" />
    </svg>
  );
}
