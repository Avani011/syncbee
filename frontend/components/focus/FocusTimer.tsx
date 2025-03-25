'use client';

import React, { useState, useEffect } from 'react';

const FocusTimer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 25, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);
  const [progress, setProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([
    { date: 'Today', time: '25:00', completed: true },
    { date: 'Today', time: '10:00', completed: false },
    { date: 'Today', time: '15:00', completed: true },
  ]);

  // Format time with leading zeros
  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  // Toggle timer
  const toggleTimer = () => {
    if (!isRunning) {
      setInitialSeconds(totalSeconds);
    }
    setIsRunning(!isRunning);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setTime({ hours: 0, minutes: 25, seconds: 0 });
    setTotalSeconds(25 * 60);
    setInitialSeconds(25 * 60);
    setProgress(0);
  };

  // Toggle history panel
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // Adjust time
  const adjustTime = (field, amount) => {
    if (isRunning) return;
    
    const newTime = { ...time };
    newTime[field] += amount;
    
    // Handle constraints
    if (field === 'hours') {
      newTime.hours = Math.min(Math.max(0, newTime.hours), 23);
    } else if (field === 'minutes') {
      newTime.minutes = Math.min(Math.max(0, newTime.minutes), 59);
    } else if (field === 'seconds') {
      newTime.seconds = Math.min(Math.max(0, newTime.seconds), 59);
    }
    
    const newTotalSeconds = newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds;
    setTime(newTime);
    setTotalSeconds(newTotalSeconds);
    setInitialSeconds(newTotalSeconds);
  };

  // Calculate stroke dash for circular progress
  const calculateStrokeDash = () => {
    const circumference = 2 * Math.PI * 60;
    return {
      strokeDasharray: `${circumference}`,
      strokeDashoffset: `${circumference * (1 - progress)}`,
    };
  };

  // Update timer every second
  useEffect(() => {
    let interval = null;
    
    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prevSeconds => {
          const newSeconds = prevSeconds - 1;
          const hours = Math.floor(newSeconds / 3600);
          const minutes = Math.floor((newSeconds % 3600) / 60);
          const seconds = newSeconds % 60;
          
          setTime({ hours, minutes, seconds });
          
          if (initialSeconds > 0) {
            setProgress(1 - (newSeconds / initialSeconds));
          }
          
          return newSeconds;
        });
      }, 1000);
    } else if (totalSeconds === 0) {
      setIsRunning(false);
      setProgress(1);
      
      // Add completed session to history
      if (initialSeconds > 0) {
        const hrs = Math.floor(initialSeconds / 3600);
        const mins = Math.floor((initialSeconds % 3600) / 60);
        const secs = initialSeconds % 60;
        const timeString = `${hrs > 0 ? hrs + ':' : ''}${formatTime(mins)}:${formatTime(secs)}`;
        
        setHistory([
          { date: 'Today', time: timeString, completed: true },
          ...history
        ]);
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds, initialSeconds]);

  return (
    <div className="flex justify-center items-center w-full relative min-h-[500px]">
      {/* Main Container with Both Panels */}
      <div 
        className="flex justify-start items-start transition-all duration-300 ease-in-out"
        style={{
          width: showHistory ? '100%' : '320px',
          maxWidth: '100%',
        }}
      >
        {/* Timer Container - Fixed Width */}
        <div className="w-80 p-6 flex flex-col items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Focus</h2>
          
          {/* Round Clock with Progress Indicator */}
          <div className="relative w-48 h-48 mb-6">
            {/* Background Circle */}
            <svg className="w-full h-full" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="60" fill="none" stroke="#f3f4f6" strokeWidth="4" />
              
              {/* Progress Circle */}
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
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-bold text-gray-800 font-mono">
                {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
              </div>
            </div>
          </div>
          
          {/* Time Controls */}
          <div className="w-full grid grid-cols-3 gap-3 mb-8">
            <div className="flex flex-col items-center">
              <button 
                className="w-8 h-8 rounded-full shadow-md text-purple-600 hover:bg-purple-100 flex items-center justify-center"
                onClick={() => adjustTime('hours', 1)}
                disabled={isRunning}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-gray-500 my-1">{formatTime(time.hours)}h</span>
              <button 
                className="w-8 h-8 rounded-full shadow-md text-purple-600 hover:bg-purple-100 flex items-center justify-center"
                onClick={() => adjustTime('hours', -1)}
                disabled={isRunning}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <button 
                className="w-8 h-8 rounded-full shadow-md text-purple-600 hover:bg-purple-100 flex items-center justify-center"
                onClick={() => adjustTime('minutes', 1)}
                disabled={isRunning}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-gray-500 my-1">{formatTime(time.minutes)}m</span>
              <button 
                className="w-8 h-8 rounded-full shadow-md text-purple-600 hover:bg-purple-100 flex items-center justify-center"
                onClick={() => adjustTime('minutes', -1)}
                disabled={isRunning}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <button 
                className="w-8 h-8 rounded-full shadow-md text-purple-600 hover:bg-purple-100 flex items-center justify-center"
                onClick={() => adjustTime('seconds', 1)}
                disabled={isRunning}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-gray-500 my-1">{formatTime(time.seconds)}s</span>
              <button 
                className="w-8 h-8 rounded-full shadow-md text-purple-600 hover:bg-purple-100 flex items-center justify-center"
                onClick={() => adjustTime('seconds', -1)}
                disabled={isRunning}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Control Buttons */}
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
              className={`w-10 h-10 rounded-full ${showHistory ? 'bg-purple-300 text-purple-700' : 'shadow-md text-gray-700'} hover:bg-puple-300 flex items-center justify-center`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* History Panel - Transitions width from 0 to 50% */}
        <div 
          className=" rounded-lg shadow-md h-full p-6 ml-4 mr-4 overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            width: showHistory ? 'calc(100% - 320px - 1rem)' : '0',
            opacity: showHistory ? 1 : 0,
            padding: showHistory ? '1.5rem' : '1.5rem 0',
            minWidth: showHistory ? '300px' : '0',
          }}
        >
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Today's Sessions</h2>
          
          <div className="overflow-y-auto max-h-80">
            {history.map((session, index) => (
              <div key={index} className="mb-3 pb-3 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">{session.date}</span>
                    <p className="font-medium">{session.time}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${session.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {session.completed ? 'Completed' : 'Interrupted'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {history.length === 0 && (
              <p className="text-gray-500 text-center py-4">No sessions yet today</p>
            )}
          </div>
          
          {history.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium mb-2">Summary</h3>
              <div className="flex justify-between text-sm">
                <span>Total Sessions: {history.length}</span>
                <span>Completed: {history.filter(s => s.completed).length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;