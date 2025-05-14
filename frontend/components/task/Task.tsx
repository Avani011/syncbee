'use client';

import { useState } from 'react';
import TaskCard from './TaskCard';
import TaskDetail from './TaskDetail';
import FolderTabs from './FolderTabs';
import { mockTasks } from '@/data/taskMock';

const Task = () => {
  const [selectedCategory, setSelectedCategory] = useState('work');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const defaultCategories = ['work', 'personal'];
  const taskCategories = Array.from(
    new Set([...defaultCategories, ...mockTasks.map((task) => task.type)])
  );

  const filteredTasks = mockTasks.filter((task) => task.type === selectedCategory);
  const selectedTask = mockTasks.find((task) => task.id === selectedTaskId);

  return (
    <div className="flex flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-1/5 rounded-xl flex flex-col h-full shadow-md pt-3">
        {['Active Tasks', 'Completed Tasks', 'Incomplete Tasks', 'Priority (High to Low)', 'Priority (Low to High)'].map((item, index) => (
          <div key={index} className="shadow-lg py-6 rounded-lg flex justify-center items-center">
            <h1 className="text-lg font-medium text-purple-800 text-center">{item}</h1>
          </div>
        ))}
      </div>

      {/* Main Task Section */}
      <div className="flex flex-col w-4/5 shadow-md rounded-xl">
        {/* Folder Tabs at Top */}
        <FolderTabs
          categories={taskCategories}
          defaultCategory="work"
          onSelect={(cat) => {
            setSelectedCategory(cat);
            setSelectedTaskId(null); //  task detail view when changing category
          }}
        />

        {/* Task Grid */}
        <div className="flex flex-wrap gap-8 px-6 py-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="w-[48%]">
                <TaskCard
                  id={task.id}
                  title={task.title}
                  priority={task.priority}
                  bgColor={task.bgColor}
                  onClick={() => setSelectedTaskId(task.id)}
                />

                {/* Detail view for this card if selected */}
                {selectedTaskId === task.id && (
                  <div className="mt-4">
                    <TaskDetail
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      type={task.type}
                      subtasks={task.subtasks}
                      onEdit={() => console.log('Edit clicked')}
                      onAddSubtask={() => console.log('Add subtask')}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-purple-700 font-medium">No tasks in this category yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
