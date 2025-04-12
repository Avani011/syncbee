'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface Subtask {
  id: string;
  title: string;
  isComplete: boolean;
}

interface Props {
  onClose: () => void;
  defaultStartDate?: string; // ✅ Optional prop for default start date
}

const CreateTaskModal: React.FC<Props> = ({ onClose, defaultStartDate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [startDate, setStartDate] = useState(defaultStartDate || '');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');
  const [color, setColor] = useState('#a78bfa'); // purple-400

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: Date.now().toString(), title: newSubtask, isComplete: false }
      ]);
      setNewSubtask('');
    }
  };

  const handleSubmit = () => {
    const payload = {
      title,
      description,
      subtasks,
      startDate,
      endDate,
      startTime,
      endTime,
      category,
      priority,
      color
    };
    console.log('Creating task:', payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex justify-center items-center p-4">
      <div className="bg-white/70 w-full max-w-2xl rounded-xl p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-purple-600 hover:text-purple-800"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-purple-900 mb-4">Create New Task</h2>

        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md bg-white/90"
          />

          {/* Description */}
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 border rounded-md bg-white/90"
          />

          {/* Subtasks */}
          <div>
            <label className="text-sm font-semibold text-purple-800">Subtasks</label>
            <div className="flex gap-2 mt-1 mb-3">
              <input
                type="text"
                placeholder="Add subtask"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="flex-grow p-2 border rounded-md bg-white/80"
              />
              <button
                onClick={handleAddSubtask}
                className="px-3 py-1 bg-purple-600 text-white rounded-md"
              >
                Add
              </button>
            </div>
            <ul className="list-disc ml-5 space-y-1 text-sm text-purple-800">
              {subtasks.map((s) => (
                <li key={s.id}>{s.title}</li>
              ))}
            </ul>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full">
              <label className="text-sm text-purple-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border rounded-md bg-white/90"
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="p-2 mt-1 border rounded-md bg-white/90"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-purple-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border rounded-md bg-white/90"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="p-2 mt-1 border rounded-md bg-white/90"
              />
            </div>
          </div>

          {/* Category, Priority, Color */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md bg-white/90"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md bg-white/90"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-[42px] border rounded-md bg-white"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
