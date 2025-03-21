// components/DateScroller.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';

export default function DateScroller() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Generate dates for the current month
  useEffect(() => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const daysInMonth = [];
    
    let currentDate = startDate;
    while (currentDate <= endDate) {
      daysInMonth.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    
    setDates(daysInMonth);
  }, [currentMonth]);

  // Scroll to selected date
  useEffect(() => {
    if (scrollerRef.current) {
      const selectedEl = scrollerRef.current.querySelector('.selected-date');
      if (selectedEl) {
        selectedEl.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedDate, dates]);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollerRef.current) {
      e.preventDefault();
      scrollerRef.current.scrollLeft += e.deltaY;
    }
  };

  // Handle month change
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(parseInt(e.target.value));
    setCurrentMonth(newMonth);
  };

  // Handle year change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = new Date(currentMonth);
    newYear.setFullYear(parseInt(e.target.value));
    setCurrentMonth(newYear);
  };

  return (
    <div className="w-full rounded-xl flex flex-row gap-3 shadow-md px-3 py-1.5 mb-6">
        <div className="flex flex-col justify-between items-center mb-4">

            <div className="flex flex-col space-x-3">
            <select 
                className="text-xl font-medium text-purple-800 text-center mr-0 rounded-md appearance-none px-3 py-1"
                value={currentMonth.getMonth()}
                onChange={handleMonthChange}
            >
                {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i}>
                    {format(new Date(2023, i, 1), 'MMMM')}
                </option>
                ))}
            </select>

            <select 
                className="text-xl font-medium text-purple-800 text-center rounded-md appearance-none px-3 py-1"
                value={currentMonth.getFullYear()}
                onChange={handleYearChange}
            >
                {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - 5 + i;
                return <option key={year} value={year}>{year}</option>;
                })}
            </select>
            </div>
        </div>

      <div 
        ref={scrollerRef}
        className="flex overflow-x-auto pb-3 pt-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {dates.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate);
          return (
            <div key={date.toString()} className="flex-shrink-0 flex items-center">
              {/* Vertical divider */}
              {index !== 0 && (
                <div className="h-10 w-px bg-purple-300 mx-2 inline-block"></div>
              )}
              
              <button
                onClick={() => setSelectedDate(date)}
                className={`
                  px-3 py-2 rounded-lg transition-all duration-200 flex items-center
                  ${isSelected ? 'bg-purple-100 scale-110 font-bold text-purple-800' : 'hover:bg-gray-100'}
                  ${isSelected ? 'selected-date' : ''}
                `}
              >
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">
                    {format(date, 'EEE')}
                  </span>
                  <span className={`text-lg ${isSelected ? 'text-purple-800' : 'text-gray-800'}`}>
                    {format(date, 'd')}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}