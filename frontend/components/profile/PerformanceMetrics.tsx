'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ViewMode, DateRange, MetricDataPoint } from '@/types/metrics';
import { sampleDailyData, sampleWeeklyData, sampleMonthlyData } from '@/data/mockMetricsData';

const PerformanceMetrics: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Generate extended data with relative week formatting
  const generateExtendedData = (): MetricDataPoint[] => {
    // Base data to work with
    const baseData = viewMode === 'daily' 
      ? sampleDailyData 
      : viewMode === 'weekly' 
        ? sampleWeeklyData 
        : sampleMonthlyData;
    
    const extendedData: MetricDataPoint[] = [];
    
    // Add data with relative week/month formatting
    if (viewMode === 'weekly') {
      // Current period weeks
      for (let i = 1; i <= 4; i++) {
        extendedData.push({
          date: `Week ${i}`,
          completed: Math.floor(Math.random() * 10) + 5,
          total: Math.floor(Math.random() * 5) + 10
        });
      }
      
      // 1 period ago weeks
      for (let i = 1; i <= 4; i++) {
        extendedData.unshift({
          date: `1-Week ${i}`,
          completed: Math.floor(Math.random() * 10) + 3,
          total: Math.floor(Math.random() * 5) + 8
        });
      }
      
      // 2 periods ago weeks
      for (let i = 1; i <= 4; i++) {
        extendedData.unshift({
          date: `2-Week ${i}`,
          completed: Math.floor(Math.random() * 10) + 2, 
          total: Math.floor(Math.random() * 5) + 7
        });
      }
      
      // 3 periods ago weeks
      for (let i = 1; i <= 4; i++) {
        extendedData.unshift({
          date: `3-Week ${i}`,
          completed: Math.floor(Math.random() * 10) + 1,
          total: Math.floor(Math.random() * 5) + 6
        });
      }
    } else if (viewMode === 'monthly') {
      // Current year months
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 0; i < 12; i++) {
        extendedData.push({
          date: monthNames[i],
          completed: Math.floor(Math.random() * 30) + 20,
          total: Math.floor(Math.random() * 15) + 30
        });
      }
      
      // Previous year months
      for (let i = 0; i < 12; i++) {
        extendedData.unshift({
          date: `1-${monthNames[i]}`,
          completed: Math.floor(Math.random() * 25) + 15,
          total: Math.floor(Math.random() * 15) + 25
        });
      }
    } else {
      // Daily view - use the past 60 days
      const today = new Date();
      for (let i = 0; i < 60; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        
        // Format as MM/DD
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
        
        extendedData.unshift({
          date: formattedDate,
          completed: Math.floor(Math.random() * 10) + 1,
          total: Math.floor(Math.random() * 5) + 5
        });
      }
    }
    
    return extendedData;
  };

  const extendedData = generateExtendedData();
  
  // Calculate stats from visible data (would be based on current view in real app)
  const visibleData = extendedData.slice(Math.max(0, extendedData.length - 10));
  const totalCompleted = visibleData.reduce((sum, item) => sum + item.completed, 0);
  const totalTasks = visibleData.reduce((sum, item) => sum + item.total, 0);
  const completionRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
    const newDate = e.target.value;
    if (isStart) {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }
    // In a real app, you would fetch new data based on the date range here
  };
  
  // Handle mouse wheel scrolling on the chart
  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer) return;
    
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      chartContainer.scrollLeft += event.deltaY;
    };
    
    chartContainer.addEventListener('wheel', handleWheel);
    
    return () => {
      chartContainer.removeEventListener('wheel', handleWheel);
    };
  }, []); 

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      {/* All filters in one row */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        {/* Date Range Selector */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <label htmlFor="start-date" className="text-xs text-gray-500">From</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange(e, true)}
              className="p-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="end-date" className="text-xs text-gray-500">To</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange(e, false)}
              className="p-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>
        
        {/* View Mode Selector */}
        <div className="flex rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode('daily')}
            className={`px-3 py-1 text-sm ${
              viewMode === 'daily'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-purple-300'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`px-3 py-1 text-sm ${
              viewMode === 'weekly'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-t border-b border-purple-300'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-3 py-1 text-sm ${
              viewMode === 'monthly'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-purple-300'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex mb-6">
        <div className="flex-1 bg-purple-50 rounded-lg p-3 mx-1">
          <h3 className="text-sm text-gray-600 font-medium">Tasks Completed</h3>
          <p className="text-2xl font-bold text-purple-700 mt-1">
            {totalCompleted}
          </p>
        </div>
        
        <div className="flex-1 bg-purple-50 rounded-lg p-3 mx-1">
          <h3 className="text-sm text-gray-600 font-medium">Total Tasks</h3>
          <p className="text-2xl font-bold text-purple-700 mt-1">
            {totalTasks}
          </p>
        </div>
        
        <div className="flex-1 bg-purple-50 rounded-lg p-3 mx-1">
          <h3 className="text-sm text-gray-600 font-medium">Completion Rate</h3>
          <p className="text-2xl font-bold text-purple-700 mt-1">{completionRate}%</p>
        </div>
      </div>

      {/* Chart with Horizontal Scrolling via Mouse Wheel */}
      <div 
        className="h-64 overflow-x-auto" 
        ref={chartContainerRef}
        style={{ 
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none',  // IE and Edge
          '::-webkit-scrollbar': { display: 'none' } // Chrome, Safari, newer versions of Opera
        }}
      >
        <div style={{ width: extendedData.length * 60, minWidth: '100%' }}>
          <ResponsiveContainer width="100%" height={256}>
            <LineChart data={extendedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#888" 
                fontSize={12}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Completed Tasks"
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#9ca3af"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 4 }}
                name="Total Tasks"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;