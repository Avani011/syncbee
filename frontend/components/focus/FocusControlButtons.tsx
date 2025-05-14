'use client';

import React from 'react';

interface FocusControlButtonsProps {
  isRunning: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  toggleHistory: () => void;
  showHistory: boolean;
}

const FocusControlButtons: React.FC<FocusControlButtonsProps> = ({
  isRunning,
  toggleTimer,
  resetTimer,
  toggleHistory,
  showHistory
}) => {
  return (
    <div className="w-full flex justify-center items-center space-x-4">
      <button
        onClick={resetTimer}
        className="w-10 h-10 rounded-full shadow-md text-gray-700 hover:bg-purple-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      <button
        onClick={toggleTimer}
        className="w-14 h-14 rounded-full bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center"
      >
        {isRunning ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      <button
        onClick={toggleHistory}
        className={`w-10 h-10 rounded-full ${showHistory ? 'bg-purple-300 text-purple-700' : 'shadow-md text-gray-700'} hover:bg-purple-300 flex items-center justify-center`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
};

export default FocusControlButtons;
