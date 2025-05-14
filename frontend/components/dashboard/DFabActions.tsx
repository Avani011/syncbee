// components/dashboard/DashboardFabActions.tsx
'use client';

import { useState } from 'react';
import { FaPlus, FaStickyNote, FaTasks, FaMicrophone } from 'react-icons/fa';

const DashboardFabActions = ({ onNoteClick, onTaskClick, onVoiceClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      {isOpen && (
        <div className="flex flex-col gap-3 mb-3 items-end">
          <button
            onClick={onNoteClick}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-lg"
          >
            <FaStickyNote /> Note
          </button>
          <button
            onClick={onTaskClick}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-lg"
          >
            <FaTasks /> Task
          </button>
          <button
            onClick={onVoiceClick}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-lg"
          >
            <FaMicrophone /> Voice
          </button>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-700 hover:bg-purple-800 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default DashboardFabActions;
