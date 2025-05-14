'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import CreateTaskModal from './task/CreateTask';
import CreateNoteModal from './notes/CreateNoteModal';
import CreateVoiceModal from './notes/CreateVoiceModal';
import { FaStickyNote, FaMicrophone, FaListUl } from 'react-icons/fa';

export default function PlusButton() {
  const pathname = usePathname();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [expandOptions, setExpandOptions] = useState(false);

  const isDashboard = pathname === '/dashboard';
  const isNotesPage = pathname === '/dashboard/notes';
  const isTaskPage = pathname === '/dashboard/task';

  if (pathname === '/dashboard/calendar') return null;

  const handleClick = () => {
    if (isTaskPage) {
      setShowTaskModal(true);
    } else if (isNotesPage || isDashboard) {
      setExpandOptions((prev) => !prev);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  };

  return (
    <>
      {(isNotesPage || isDashboard) && expandOptions && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3 items-center">
          {/* Note */}
          <button
            onClick={() => {
              setShowNoteModal(true);
              setExpandOptions(false);
            }}
            className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-purple-700 hover:bg-purple-100"
            title="New Note"
          >
            <FaStickyNote size={18} />
          </button>

          {/* Voice Note */}
          <button
            onClick={() => {
              setShowVoiceModal(true);
              setExpandOptions(false);
            }}
            className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-purple-700 hover:bg-purple-100"
            title="New Voice Note"
          >
            <FaMicrophone size={18} />
          </button>

          {/* Task */}
          {isDashboard && (
            <button
              onClick={() => {
                setShowTaskModal(true);
                setExpandOptions(false);
              }}
              className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-purple-700 hover:bg-purple-100"
              title="New Task"
            >
              <FaListUl size={18} />
            </button>
          )}
        </div>
      )}

      {/* Main Plus Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 h-14 w-14 plus-btn bg-opacity-70 bg-white rounded-full flex justify-center items-center shadow-md z-50"
      >
        <Image src="/add.svg" alt="Add Button" width={22} height={22} />
      </button>

      {/* Modals */}
      {isTaskPage && showTaskModal && (
        <CreateTaskModal onClose={() => setShowTaskModal(false)} />
      )}

      {isNotesPage && showNoteModal && (
        <CreateNoteModal onClose={() => setShowNoteModal(false)} />
      )}
      {isNotesPage && showVoiceModal && (
        <CreateVoiceModal onClose={() => setShowVoiceModal(false)} />
      )}

      {/* 👇 Dashboard: Support all 3 */}
      {isDashboard && showTaskModal && (
        <CreateTaskModal
          onClose={() => setShowTaskModal(false)}
          defaultStartDate={getTodayDate()}
        />
      )}
      {isDashboard && showNoteModal && (
        <CreateNoteModal onClose={() => setShowNoteModal(false)} />
      )}
      {isDashboard && showVoiceModal && (
        <CreateVoiceModal onClose={() => setShowVoiceModal(false)} />
      )}
    </>
  );
}
