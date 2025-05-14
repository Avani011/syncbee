'use client';

import { useState } from 'react';
import { IoClose, IoTrash } from 'react-icons/io5';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface NoteModalProps {
  initialNote: {
    id: string;
    title: string;
    content: string;
    checklist: ChecklistItem[];
  };
  onClose: () => void;
  onDelete: (id: string) => void;
  onSave: (updatedNote: any) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ initialNote, onClose, onDelete, onSave }) => {
  const [note, setNote] = useState(initialNote);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleChecklistToggle = (id: string) => {
    const updated = note.checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setNote({ ...note, checklist: updated });
  };

  const handleAddChecklist = () => {
    if (!newChecklistItem.trim()) return;
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newChecklistItem,
      completed: false,
    };
    setNote({ ...note, checklist: [...note.checklist, newItem] });
    setNewChecklistItem('');
  };

  const handleEditChecklist = (id: string, value: string) => {
    const updated = note.checklist.map(item =>
      item.id === id ? { ...item, text: value } : item
    );
    setNote({ ...note, checklist: updated });
  };

  const handleDeleteChecklist = (id: string) => {
    setNote({ ...note, checklist: note.checklist.filter(item => item.id !== id) });
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white/90 rounded-lg p-5 shadow-xl w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-4 text-purple-600 hover:text-purple-800">
          <IoClose size={24} />
        </button>

        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="Note Title"
          className="text-xl font-semibold w-full border-b border-purple-300 mb-3 p-2"
        />

        <textarea
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          placeholder="Write your note here..."
          className="w-full p-3 h-28 border border-gray-200 rounded-md mb-4 resize-none"
        />

        {/* Checklist */}
        <div>
          <p className="text-sm font-medium mb-2 text-purple-700">Checklist</p>
          <div className="space-y-2">
            {note.checklist.map((item) => (
              <div key={item.id} className="flex items-center group">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleChecklistToggle(item.id)}
                  className="mr-2"
                />
                <input
                  value={item.text}
                  onChange={(e) => handleEditChecklist(item.id, e.target.value)}
                  className={`flex-grow bg-transparent text-sm p-1 border-b focus:outline-none ${
                    item.completed ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
                />
                <button
                  onClick={() => handleDeleteChecklist(item.id)}
                  className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition"
                >
                  <IoClose size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex mt-3">
            <input
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              placeholder="Add checklist item"
              className="flex-1 border rounded-l-md p-2 text-sm"
            />
            <button
              onClick={handleAddChecklist}
              className="bg-purple-600 text-white px-4 rounded-r-md hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => {
              onDelete(note.id);
              onClose();
            }}
            className="text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <IoTrash size={18} /> Delete
          </button>

          <button
            onClick={() => {
              onSave(note);
              onClose();
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
