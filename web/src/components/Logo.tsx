import React, { useState } from 'react';
import { useLanguageOptional } from '../context/LanguageContext';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 28 }: LogoProps) {
  const [hasError, setHasError] = useState(false);
  const langContext = useLanguageOptional();
  const settings = langContext?.settings || {};
  const customLogoUrl = settings['site_logo_url'] || '/logo.png';

  React.useEffect(() => {
    setHasError(false);
  }, [customLogoUrl]);

  if (!hasError) {
    return (
      <img
        src={customLogoUrl}
        alt="Indiekraf Logo"
        style={{ height: `${size}px`, width: 'auto' }}
        onError={() => setHasError(true)}
        className={`${className} object-contain max-h-7 h-7`}
        referrerPolicy="no-referrer"
        id="logo-image"
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      {/* 
        Shape 1 (Left vertical leaf):
        - x from 24 to 69 (width 45)
        - y from 30 to 170 (height 140)
        - Top-left rounded, bottom-right rounded
      */}
      <path
        d="M 24 75 A 45 45 0 0 1 69 30 L 69 125 A 45 45 0 0 1 24 170 L 24 75 Z"
        fill="#0A2472"
      />

      {/* 
        Shape 2 (Middle vertical leaf):
        - x from 75 to 120 (width 45, with a 6px gap)
        - y from 30 to 170 (height 140)
        - Top-left rounded, bottom-right rounded
      */}
      <path
        d="M 75 75 A 45 45 0 0 1 120 30 L 120 125 A 45 45 0 0 1 75 170 L 75 75 Z"
        fill="#293ea2"
      />

      {/* 
        Shape 3 (Right top wing):
        - x from 126 to 176 (width 50, with a 6px gap)
        - y from 30 to 97 (height 67)
        - Top-right rounded, bottom-left rounded
      */}
      <path
        d="M 126 52 L 126 30 A 45 45 0 0 1 176 75 L 176 97 A 45 45 0 0 1 126 52 Z"
        fill="#364eb7"
      />

      {/* 
        Shape 4 (Right bottom wing):
        - x from 126 to 176 (width 50)
        - y from 103 to 170 (height 67, with a 6px horizontal gap)
        - Top-left rounded, bottom-right rounded
      */}
      <path
        d="M 126 148 L 126 170 A 45 45 0 0 1 176 125 L 176 103 A 45 45 0 0 1 126 148 Z"
        fill="#5f75cf"
      />
    </svg>
  );
}

