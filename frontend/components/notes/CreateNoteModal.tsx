'use client';
import { IoClose } from 'react-icons/io5';

export default function CreateNoteModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/80 p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-purple-700 hover:text-purple-900"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-purple-900">Create New Note</h2>
        {/* Add Note Form Here */}
      </div>
    </div>
  );
}
