// src/components/SensorCard.tsx
'use client';
import { useEffect, useRef } from 'react';

interface SensorCardProps {
  label: string;
  value: number;
  unit?: string;
  max?: number;
  gradient?: string[];
}

export default function SensorCard({
  label,
  value,
  unit = '',
  max = 100,
  gradient = ['#4ADE80', '#EF4444'],
}: SensorCardProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const percentage = (value / max) * 100;
      progressRef.current.style.background = `linear-gradient(90deg, ${gradient[0]} ${percentage}%, ${gradient[1]} ${percentage}%)`;
    }
  }, [value, max, gradient]);

  return (
    <div className="bg-gray-700/50 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold">
            {value}
            <span className="text-sm text-gray-400 ml-1">{unit}</span>
          </p>
        </div>
      </div>

      <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}