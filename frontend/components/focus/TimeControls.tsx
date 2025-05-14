'use client';

import React from 'react';

interface TimeControlsProps {
  time: { hours: number; minutes: number; seconds: number };
  isRunning: boolean;
  adjustTime: (field: string, amount: number) => void;
}

const TimeControls: React.FC<TimeControlsProps> = ({ time, isRunning, adjustTime }) => {
  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="w-full grid grid-cols-3 gap-3 mb-8">
      {['hours', 'minutes', 'seconds'].map((unit) => (
        <div key={unit} className="flex flex-col items-center">
          <button
            className="w-8 h-8 rounded-full shadow-md text-purple-600 hover:bg-purple-100 flex items-center justify-center"
            onClick={() => adjustTime(unit, 1)}
            disabled={isRunning}
          >
            ▲
          </button>
          <span className="text-sm text-gray-500 my-1">
            {formatTime(time[unit as keyof typeof time])}{unit[0]}
          </span>
          <button
            className="w-8 h-8 rounded-full shadow-md text-purple-600 hover:bg-purple-100 flex items-center justify-center"
            onClick={() => adjustTime(unit, -1)}
            disabled={isRunning}
          >
            ▼
          </button>
        </div>
      ))}
    </div>
  );
};

export default TimeControls;
