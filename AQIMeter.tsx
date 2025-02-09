// src/components/AQIMeter.tsx
'use client';
import { useEffect, useRef } from 'react';

interface AQIMeterProps {
  value: number;
}

const AQI_COLORS = [
  { offset: '0%', color: '#4ADE80' }, // Green
  { offset: '50%', color: '#FACC15' }, // Yellow
  { offset: '75%', color: '#FB923C' }, // Orange
  { offset: '100%', color: '#EF4444' }, // Red
];

export default function AQIMeter({ value }: AQIMeterProps) {
  const needleRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (needleRef.current) {
      const rotation = (value / 500) * 180 - 90; // Map value to -90 to 90 degrees
      needleRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [value]);

  return (
    <div className="relative w-full aspect-[2/1]">
      {/* Gauge SVG */}
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <defs>
          <linearGradient id="aqiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {AQI_COLORS.map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>

        {/* Gauge Arc */}
        <path
          d="M 20 95 A 75 75 0 0 1 180 95"
          fill="none"
          stroke="url(#aqiGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Needle */}
        <path
          ref={needleRef}
          d="M100 85 L95 95 L105 95 Z"
          fill="#FFF"
          style={{
            transformOrigin: '100px 85px',
            transform: `rotate(${(value / 500) * 180 - 90}deg)`,
          }}
          className="transition-transform duration-500 ease-out"
        />
      </svg>

      {/* AQI Value Display */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-sm text-gray-400">Air Quality Index</p>
      </div>
    </div>
  );
}