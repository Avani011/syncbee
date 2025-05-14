'use client';

import { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import { createNote } from '@/services/note'; // ✅ Import API

interface Props {
  onClose: () => void;
}

interface ChecklistItem {
  id: string;
  item: string;
  isTicked: boolean;
}

export default function CreateNoteModal({ onClose }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [newCheck, setNewCheck] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]); // for preview
  const [imageFiles, setImageFiles] = useState<File[]>([]); // ✅ for actual upload

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddChecklist = () => {
    if (newCheck.trim()) {
      setChecklist((prev) => [
        ...prev,
        { id: Date.now().toString(), item: newCheck, isTicked: false }
      ]);
      setNewCheck('');
    }
  };

  const handleChecklistToggle = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isTicked: !item.isTicked } : item
      )
    );
  };

  const handleDeleteChecklist = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditChecklist = (id: string, newValue: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, item: newValue } : item
      )
    );
    setEditingItemId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newUrls]);       // For preview
    setImageFiles((prev) => [...prev, ...newFiles]);  // ✅ For submission
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
  
    formData.append('title', title);
    formData.append('description', description);
  
    checklist.forEach((item) => {
      formData.append('checklist', JSON.stringify({
        item: item.item,
        isTicked: item.isTicked
      }));
    });
  
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files) {
      Array.from(fileInput.files).forEach(file => {
        formData.append('pictures', file);
      });
    }
  
    try {
      const res = await createNote(formData);
      console.log('✅ Note created successfully:', res.data);
      onClose();
    } catch (err) {
      console.error('❌ Error creating note:', err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white/80 w-full max-w-2xl rounded-xl p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-purple-600 hover:text-purple-800"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-purple-900 mb-4">Create New Note</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md bg-white/90"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border rounded-md bg-white/90"
          />

          {/* Checklist */}
          <div>
            <label className="text-sm font-semibold text-purple-800">Checklist</label>
            <div className="flex gap-2 mt-1 mb-3">
              <input
                type="text"
                placeholder="Add checklist item"
                value={newCheck}
                onChange={(e) => setNewCheck(e.target.value)}
                className="flex-grow p-2 border rounded-md bg-white/80"
              />
              <button
                onClick={handleAddChecklist}
                className="px-3 py-1 bg-purple-600 text-white rounded-md"
              >
                Add
              </button>
            </div>
            <ul className="ml-4 space-y-2">
              {checklist.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between group hover:bg-white/60 p-1 rounded-md"
                >
                  <div className="flex gap-2 items-center w-full">
                    <input
                      type="checkbox"
                      checked={item.isTicked}
                      onChange={() => handleChecklistToggle(item.id)}
                    />
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => handleEditChecklist(item.id, e.target.value)}
                        className="border-b bg-transparent outline-none text-sm flex-grow"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`text-sm flex-grow cursor-pointer ${
                          item.isTicked ? 'line-through text-gray-400' : 'text-purple-900'
                        }`}
                        onClick={() => setEditingItemId(item.id)}
                      >
                        {item.item}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteChecklist(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <FiX size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Upload Images */}
          <div>
            <label className="text-sm font-semibold text-purple-800">Attach Pictures</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 relative rounded-md overflow-hidden border"
                >
                  <Image
                    src={img}
                    alt={`Preview ${idx}`}
                    fill
                    className="object-cover rounded-md"
                    unoptimized
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleImageClick}
                className="w-20 h-20 flex items-center justify-center border border-dashed border-purple-400 rounded-md text-purple-600 text-xl bg-white/70 hover:bg-purple-100"
              >
                +
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}
