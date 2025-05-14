'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface NoteType {
  id: string;
  title: string;
  content: string;
  checklist: ChecklistItem[];
}

interface NoteExpandedModalProps {
  note: NoteType;
  onClose: () => void;
}

const NoteExpandedModal: React.FC<NoteExpandedModalProps> = ({ note, onClose }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(note.checklist || []);
  const [newItem, setNewItem] = useState('');

  const handleToggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    setChecklist(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: newItem.trim(),
        completed: false,
      },
    ]);
    setNewItem('');
  };

  return (
    <div
      className="fixed inset-0 bg-[#d9d9d9]/80 backdrop-blur-xs bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose} // ✅ Replace toggleExpand with onClose
    >
      <div
        className="bg-white rounded-lg shadow-xl ring-2 ring-purple-600 w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-purple-600 hover:text-purple-800"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <div className="p-4 border-b-2 border-purple-600">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full text-lg font-medium focus:outline-none"
            placeholder="Title"
          />
        </div>

        {/* Content */}
        <div className="p-4 max-h-64 overflow-y-auto flex-grow">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full min-h-[100px] resize-none focus:outline-none text-gray-700 border p-2 rounded"
            placeholder="Add your note here..."
          />

          {/* Checklist */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Checklist</h4>
            <div className="space-y-2">
              {checklist.map(item => (
                <label key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleItem(item.id)}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600"
                  />
                  <span
                    className={`ml-2 text-sm ${
                      item.completed ? 'line-through text-gray-500' : 'text-gray-700'
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>

            {/* Add Checklist Item */}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:outline-none"
                placeholder="Add checklist item..."
              />
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="p-4 border-t-2 border-purple-600 bg-gray-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteExpandedModal;
