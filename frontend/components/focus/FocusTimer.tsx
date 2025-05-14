'use client';

import React, { useState, useEffect } from 'react';
import { startFocusSession, deleteFocusSession } from '@/services/focus';

import TimerDisplay from './TimerDisplay';
import TimeControls from './TimeControls';
import FocusControlButtons from './FocusControlButtons';
import FocusHistory from './FocusHistory';

const FocusTimer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 25, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);
  const [progress, setProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [historyUpdated, setHistoryUpdated] = useState(false); // 👈 Track refresh
  const [sessionSaved, setSessionSaved] = useState(false);


  const toggleTimer = () => {
    if (!isRunning) {
      setInitialSeconds(totalSeconds);
      setSessionSaved(false); // ✅ Reset session save flag when timer starts
    }
    setIsRunning(!isRunning);
  };
  

  const resetTimer = async () => {
    if (isRunning && !sessionSaved && totalSeconds > 0) {
      const duration = initialSeconds - totalSeconds;
      if (duration > 0) {
        try {
          await startFocusSession({ duration });
          setHistoryUpdated(prev => !prev);
          setSessionSaved(true);
        } catch (err) {
          console.error("❌ Error saving interrupted session", err);
        }
      }
    }  
    setIsRunning(false);
    setTime({ hours: 0, minutes: 25, seconds: 0 });
    setTotalSeconds(25 * 60);
    setInitialSeconds(25 * 60);
    setProgress(0);
  };

  const adjustTime = (field: string, amount: number) => {
    if (isRunning) return;
    const newTime = { ...time };
    newTime[field] += amount;

    if (field === 'hours') newTime.hours = Math.min(Math.max(0, newTime.hours), 23);
    if (field === 'minutes') newTime.minutes = Math.min(Math.max(0, newTime.minutes), 59);
    if (field === 'seconds') newTime.seconds = Math.min(Math.max(0, newTime.seconds), 59);

    const newTotalSeconds = newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds;
    setTime(newTime);
    setTotalSeconds(newTotalSeconds);
    setInitialSeconds(newTotalSeconds);
  };

  const deleteSession = async (id: string) => {
    try {
      await deleteFocusSession(id);
      setHistoryUpdated(prev => !prev); // trigger re-fetch
    } catch (err) {
      console.error("❌ Deletion failed", err);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prev => {
          const newSeconds = prev - 1;
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
    } else if (totalSeconds === 0 && !sessionSaved) {
      setIsRunning(false);
      setProgress(1);
      const duration = initialSeconds;
    
      if (duration > 0) {
        setSessionSaved(true); // prevent future duplicates
        startFocusSession({ duration }).then(() => {
          setHistoryUpdated(prev => !prev);
        });
      }
    }
    return () => clearInterval(interval!);
  }, [isRunning, totalSeconds, initialSeconds, sessionSaved]);

  const toggleHistory = () => setShowHistory(!showHistory);

  return (
    <div className="flex justify-center items-center w-full relative min-h-[500px]">
      <div
        className="flex justify-start items-start transition-all duration-300 ease-in-out"
        style={{
          width: showHistory ? '100%' : '320px',
          maxWidth: '100%',
        }}
      >
        {/* Left side: Timer */}
        <div className="w-80 p-6 flex flex-col items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Focus</h2>

          <TimerDisplay time={time} progress={progress} />
          <TimeControls time={time} isRunning={isRunning} adjustTime={adjustTime} />
          <FocusControlButtons
            isRunning={isRunning}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            toggleHistory={toggleHistory}
            showHistory={showHistory}
          />
        </div>

        {/* Right side: Focus History */}
        <FocusHistory
          showHistory={showHistory}
          deleteSession={deleteSession}
          updated={historyUpdated}
        />
      </div>
    </div>
  );
};

export default FocusTimer;
