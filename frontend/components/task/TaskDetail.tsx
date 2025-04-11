'use client';

import { useState } from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';

interface Subtask {
  id: string;
  title: string;
  isComplete: boolean;
}

interface TaskDetailProps {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  type: string;
  subtasks?: Subtask[];
  onEdit?: () => void;
  onAddSubtask?: (title: string) => void;
  onClose?: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  title,
  description,
  priority,
  type,
  subtasks = [],
  onEdit,
  onAddSubtask,
  onClose,
}) => {
  const [checkedSubtasks, setCheckedSubtasks] = useState(subtasks);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [newSubtask, setNewSubtask] = useState('');

  const handleSubtaskToggle = (id: string) => {
    const updated = checkedSubtasks.map((st) =>
      st.id === id ? { ...st, isComplete: !st.isComplete } : st
    );
    setCheckedSubtasks(updated);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim() !== '' && onAddSubtask) {
      onAddSubtask(newSubtask.trim());
      setCheckedSubtasks([
        ...checkedSubtasks,
        { id: String(Date.now()), title: newSubtask.trim(), isComplete: false },
      ]);
      setNewSubtask('');
    }
  };

  const completed = checkedSubtasks.filter((s) => s.isComplete).length;
  const total = checkedSubtasks.length;
  const percentComplete = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md flex justify-center items-center">
      <div className="relative bg-white/40 w-full max-w-xl p-6 rounded-xl shadow-lg border overflow-y-auto">
        {/* Top Progress Fill */}
        <div
          className="absolute top-0 left-0 h-1 bg-purple-500 rounded-t-xl"
          style={{ width: `${percentComplete}%` }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-purple-200 hover:bg-purple-300 text-purple-800 px-2 py-1 rounded text-xs"
        >
          <FaTimes />
        </button>

        {/* Title & Edit */}
        <div className="flex justify-between items-start mb-4">
          {isEditing ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-xl font-bold text-purple-900 bg-transparent border-b border-purple-500 focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-bold text-purple-900">{editTitle}</h2>
          )}

          <button onClick={() => setIsEditing((prev) => !prev)}>
            <FaEdit className="text-purple-700 hover:text-purple-900 text-lg" />
          </button>
        </div>

        {/* Meta Info */}
        <div className="flex gap-4 mb-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            {priority}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          {typeof type === 'string' ? type.charAt(0).toUpperCase() + type.slice(1) : ''}

          </span>
        </div>

        {/* Description */}
        {isEditing ? (
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full bg-transparent border border-purple-300 text-sm text-purple-800 p-2 rounded mb-4"
            rows={3}
          />
        ) : (
          <p className="text-sm text-gray-700 mb-4">{editDescription}</p>
        )}

        {/* Subtasks */}
        <div>
          <h3 className="text-sm font-semibold text-purple-800 mb-2">Subtasks</h3>

          <div className="flex flex-col gap-2 mb-3">
            {checkedSubtasks.map((subtask) => (
              <label key={subtask.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.isComplete}
                  onChange={() => handleSubtaskToggle(subtask.id)}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                />
                <span
                  className={`text-sm ${
                    subtask.isComplete ? 'line-through text-gray-400' : 'text-purple-900'
                  }`}
                >
                  {subtask.title}
                </span>
              </label>
            ))}
          </div>

          {/* Subtask Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="New subtask"
              className="w-full px-3 py-2 text-sm rounded border bg-white/80 placeholder:text-purple-300"
            />
            <button
              onClick={handleAddSubtask}
              className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
