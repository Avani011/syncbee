'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import CreateTaskModal from './task/CreateTask';
import CreateNoteModal from './notes/CreateNoteModal';
import CreateVoiceModal from './notes/CreateVoiceModal';
import { FaStickyNote, FaMicrophone } from 'react-icons/fa';

export default function PlusButton() {
  const pathname = usePathname();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [expandNotesOptions, setExpandNotesOptions] = useState(false);

  // ❌ Hide on calendar page
  if (pathname === '/dashboard/calendar') return null;

  const handleClick = () => {
    if (pathname === '/dashboard/task') {
      setShowTaskModal(true);
    } else if (pathname === '/dashboard/notes') {
      setExpandNotesOptions((prev) => !prev);
    }
  };

  return (
    <>
      {/* Expandable buttons for notes page */}
      {pathname === '/dashboard/notes' && expandNotesOptions && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3 items-center">
          {/* Note */}
          <button
            onClick={() => {
              setShowNoteModal(true);
              setExpandNotesOptions(false);
            }}
            className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-purple-700 hover:bg-purple-100"
          >
            <FaStickyNote size={18} />
          </button>

          {/* Voice Note */}
          <button
            onClick={() => {
              setShowVoiceModal(true);
              setExpandNotesOptions(false);
            }}
            className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-purple-700 hover:bg-purple-100"
          >
            <FaMicrophone size={18} />
          </button>
        </div>
      )}

      {/* Main Plus Button - styling unchanged */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 h-14 w-14 plus-btn bg-opacity-70 bg-white rounded-full flex justify-center items-center shadow-md z-50"
      >
        <Image src="/add.svg" alt="Add Button" width={22} height={22} />
      </button>

      {/* Modals */}
      {pathname === '/dashboard/task' && showTaskModal && (
        <CreateTaskModal onClose={() => setShowTaskModal(false)} />
      )}

      {pathname === '/dashboard/notes' && showNoteModal && (
        <CreateNoteModal onClose={() => setShowNoteModal(false)} />
      )}

      {pathname === '/dashboard/notes' && showVoiceModal && (
        <CreateVoiceModal onClose={() => setShowVoiceModal(false)} />
      )}
    </>
  );
}
