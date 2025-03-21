// components/Calendar/Calendar.tsx
'use client';

import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarFilter from './CalendarFilter';
import CalendarTask from './CalendarTask';

// Dummy data for tasks
const DUMMY_TASKS = [
  {
    id: '1',
    title: 'Submit Tax Documents',
    start: new Date(),
    priority: 'high',
    category: 'personal',
    isCompleted: false,
    status: 'active'
  },
  {
    id: '2',
    title: 'Doctor Appointment',
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    priority: 'medium',
    category: 'personal',
    isCompleted: false,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Team Meeting',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    priority: 'medium',
    category: 'work',
    isCompleted: false,
    status: 'upcoming'
  },
  // More dummy data as needed
];

export default function Calendar() {
  const [selectedCategories, setSelectedCategories] = useState(['work', 'personal', 'other']);
  const [selectedPriorities, setSelectedPriorities] = useState(['high', 'medium', 'low']);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const calendarRef = useRef(null);

  // Map tasks to calendar events
  const getCalendarEvents = () => {
    return tasks
      .filter(task => 
        selectedCategories.includes(task.category) && 
        selectedPriorities.includes(task.priority)
      )
      .map(task => {
        // Set color based on priority and category
        const priorityColors = {
          high: '#ef4444',   // Red
          medium: '#f59e0b', // Amber
          low: '#10b981'     // Green
        };
        
        return {
          id: task.id,
          title: task.title,
          start: task.start,
          backgroundColor: priorityColors[task.priority],
          textColor: '#ffffff',
          extendedProps: {
            priority: task.priority,
            category: task.category,
            isCompleted: task.isCompleted
          },
          classNames: [
            'task-item',
            `task-${task.priority}`,
            `task-${task.category}`,
            task.isCompleted ? 'task-completed' : ''
          ]
        };
      });
  };

  // Handle task click
  const handleEventClick = (info) => {
    const taskId = info.event.id;
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  // Handle filter changes
  const handleCategoryFilterChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handlePriorityFilterChange = (priorities) => {
    setSelectedPriorities(priorities);
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden flex flex-col">
      <div className="p-2 flex flex-row gap-6">
        <div className="w-64 flex-shrink-0">
          <CalendarFilter
            selectedCategories={selectedCategories}
            selectedPriorities={selectedPriorities}
            onCategoryChange={handleCategoryFilterChange}
            onPriorityChange={handlePriorityFilterChange}
          />
        </div>
        
        <div className="flex-grow calendar-container" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'title',
              center: '',
              right: 'prev,next'
            }}
            events={getCalendarEvents()}
            height="490px"
            eventClick={handleEventClick}
            eventDisplay="block"
            eventMaxStack={2}
            dayMaxEventRows={2}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false
            }}
          />
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <CalendarTask 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}

      <style jsx global>{`
        .fc-theme-standard {
          font-family: inherit;
          font-size: 0.875rem;
        }
        .fc-theme-standard th {
          padding: 6px 0;
          font-weight: 500;
          color: #ffff00;
        }
        .fc-theme-standard td {
          border-color: #f3f4f6;
        }

        .fc-theme-standard td, .fc-theme-standard th, .fc-theme-standard .fc-scrollgrid {
            border: 1px solid white;
        }

        .fc-day-today {
          background-color: #d9d9d9 !important;
        }
        .fc-daygrid-day-number {
          font-size: 1rem;
          font-weight: 500;
          padding: 4px 8px;
          color: #54405e;
        }

        .fc-header-toolbar{
            margin-bottom: 1px
        }

        .fc .fc-col-header-cell-cushion{
            color: #6e11b0
        }

        .fc .fc-toolbar-title{
            color: #54405e;
            font-weight: bold;
        }

        .fc .fc-button-primary{
            border: none;
            background-color: #54405e;
        }

        .fc-event {
          border-radius: 4px;
          padding: 2px 4px;
          margin-bottom: 2px;
          font-size: 0.75rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border: none;
        }
        .fc-event-title {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fc-daygrid-event-dot {
          display: none;
        }
        .task-completed {
          text-decoration: line-through;
          opacity: 0.7;
        }
        .fc-more-link {
          font-size: 0.75rem;
          color: #6b7280;
          background-color: #f3f4f6;
          padding: 1px 4px;
          border-radius: 4px;
        }
        .fc-daygrid-day-frame {
          min-height: 100px;
        }
      `}</style>
    </div>
  );
}