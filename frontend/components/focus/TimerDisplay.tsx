'use client';

import React from 'react';

interface TimerDisplayProps {
  time: { hours: number; minutes: number; seconds: number };
  progress: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, progress }) => {
  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const calculateStrokeDash = () => {
    const circumference = 2 * Math.PI * 60;
    return {
      strokeDasharray: `${circumference}`,
      strokeDashoffset: `${circumference * (1 - progress)}`,
    };
  };

  return (
    <div className="relative w-48 h-48 mb-6">
      <svg className="w-full h-full" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r="60" fill="none" stroke="#f3f4f6" strokeWidth="4" />
        <circle
          cx="65"
          cy="65"
          r="60"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="4"
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
          {...calculateStrokeDash()}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-3xl font-bold text-gray-800 font-mono">
          {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
