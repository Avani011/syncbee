'use client';

import React, { useState } from 'react';
import TaskDetail from './TaskDetail';

interface Subtask {
  id: string;
  title: string;
  isComplete: boolean;
}

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  bgColor: string;
  subtasks?: Subtask[];
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  priority,
  category,
  bgColor,
  subtasks = [],
}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="w-full">
      <div
        className={`flex flex-row justify-between p-3 shadow-md rounded-md cursor-pointer ${bgColor}`}
        onClick={() => setShowDetail(!showDetail)}
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`${id}-checkbox`}
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 peer"
            onClick={(e) => e.stopPropagation()}
          />
          <h1 className="text-lg font-medium text-purple-800 peer-checked:line-through peer-checked:text-gray-500 transition-all">
            {title}
          </h1>
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex justify-center items-center rounded-lg p-1.5 bg-purple-400">
            <h1 className="text-black text-xs">{priority}</h1>
          </div>
        </div>
      </div>

      {/* Task Details */}
      {showDetail && (
        <div className="mt-2">
          <TaskDetail
            title={title}
            description={description}
            priority={priority}
            type={category}
            subtasks={subtasks}
            onClose={() => setShowDetail(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
