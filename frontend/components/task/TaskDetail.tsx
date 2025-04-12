'use client';

import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

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
  onEdit?: (updates: { title: string; description: string }) => void;
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
  onClose
}) => {
  const [checkedSubtasks, setCheckedSubtasks] = useState(subtasks);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [newSubtask, setNewSubtask] = useState('');

  const handleSubtaskToggle = (id: string) => {
    const updated = checkedSubtasks.map((st) =>
      st.id === id ? { ...st, isComplete: !st.isComplete } : st
    );
    setCheckedSubtasks(updated);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      const newSubtaskObj: Subtask = {
        id: Date.now().toString(),
        title: newSubtask.trim(),
        isComplete: false,
      };
      setCheckedSubtasks((prev) => [...prev, newSubtaskObj]);
      onAddSubtask?.(newSubtask.trim());
      setNewSubtask('');
    }
  };

  const completed = checkedSubtasks.filter((s) => s.isComplete).length;
  const total = checkedSubtasks.length;
  const percentComplete = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto mt-6">
      {/* Progress Fill Border */}
      <div
        className="absolute top-0 left-0 h-1 rounded-t-xl bg-purple-400 transition-all"
        style={{ width: `${percentComplete}%` }}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {editing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-2xl font-bold text-purple-900 bg-transparent outline-none border-b border-purple-200"
          />
        ) : (
          <h2 className="text-2xl font-bold text-purple-900">{title}</h2>
        )}

        <div className="flex items-center gap-2">
          <button onClick={() => setEditing(!editing)}>
            <FaEdit className="text-purple-700 hover:text-purple-900 text-lg" />
          </button>
          <button onClick={onClose}>
            <IoClose className="text-purple-700 hover:text-purple-900 text-xl" />
          </button>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex gap-4 mb-2">
        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
          {priority}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          {type?.charAt(0).toUpperCase() + type?.slice(1)}
        </span>
      </div>

      {/* Description */}
      {editing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 mb-4"
          rows={3}
        />
      ) : (
        <p className="text-sm text-gray-700 mb-4">{description}</p>
      )}

      {/* Subtasks */}
      <div>
        <h3 className="text-sm font-semibold text-purple-800 mb-2">Subtasks</h3>

        {checkedSubtasks.length > 0 && (
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
        )}

        {/* Add Subtask Input */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Add new subtask"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md px-3 py-1 text-sm"
          />
          <button
            onClick={handleAddSubtask}
            className="bg-purple-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-purple-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
