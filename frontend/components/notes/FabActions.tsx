'use client';

import { useState } from 'react';
import { FaMicrophone, FaStickyNote, FaPlus } from 'react-icons/fa';

interface Props {
  onNoteClick: () => void;
  onVoiceClick: () => void;
}

export default function FabActions({ onNoteClick, onVoiceClick }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center z-50">
      {open && (
        <div className="flex flex-col gap-3 mb-4">
          {/* Create Note */}
          <button
            onClick={onNoteClick}
            className="w-14 h-14 bg-white/80 backdrop-blur-sm text-purple-700 rounded-full shadow-md flex items-center justify-center hover:bg-purple-100"
          >
            <FaStickyNote size={18} />
          </button>

          {/* Create Voice Note */}
          <button
            onClick={onVoiceClick}
            className="w-14 h-14 bg-white/80 backdrop-blur-sm text-purple-700 rounded-full shadow-md flex items-center justify-center hover:bg-purple-100"
          >
            <FaMicrophone size={18} />
          </button>
        </div>
      )}

      {/* Main Plus Button */}
      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 bg-white/80 backdrop-blur-md text-purple-700 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-200"
      >
        <FaPlus size={20} />
      </button>
    </div>
  );
}
