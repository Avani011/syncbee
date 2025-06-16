'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { FiX, FiTrash2, FiImage } from 'react-icons/fi';
import Image from 'next/image';
import { toggleChecklistApi } from '@/services/note';

interface Props {
  note: any;
  onClose: () => void;
  onUpdate?: () => void;
  onSave?: (formData: FormData, noteId: string) => void;
  onDelete?: (noteId: string) => void;
}

const NoteExpandedModal = ({ note, onClose, onSave, onDelete }: Props) => {
  const [title, setTitle] = useState<string>(note.title || '');
  const [description, setDescription] = useState<string>(note.description || '');
  const [checklist, setChecklist] = useState<{ item: string; isTicked: boolean }[]>(note.checklist || []);
  const [newCheck, setNewCheck] = useState<string>('');
  const [images, setImages] = useState<(string | File)[]>(note.pictures || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChecklistToggle = async (index: number) => {
  try {
    const updated = [...checklist];
    updated[index].isTicked = !updated[index].isTicked;
    setChecklist(updated);

    // Call backend toggle
    await toggleChecklistApi(note._id, index);
  } catch (error) {
    console.error("❌ Error toggling checklist:", error);
  }
};


  const handleChecklistDelete = (index: number) => {
    const updated = checklist.filter((_, i) => i !== index);
    setChecklist(updated);
  };

  const handleAddChecklist = () => {
    if (newCheck.trim()) {
      setChecklist([...checklist, { item: newCheck, isTicked: false }]);
      setNewCheck('');
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray: File[] = Array.from(files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));

    setNewImages((prev) => [...prev, ...fileArray]);
    setImages((prev) => [...prev, ...urls]);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {

  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);
  formData.append('checklist', JSON.stringify(checklist));

  // Add both new and existing images
  images.forEach((img: any) => {
    if (typeof img === 'string') {
      formData.append('existingImages', img); // for backend to preserve
    } else {
      formData.append('images', img); // new files
    }
  });

  onSave?.(formData, note._id); // pass formData + noteId to trigger update
};


  const handleDelete = () => {
    onDelete?.(note._id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white/90 w-full max-w-3xl rounded-xl p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-4 text-purple-700 hover:text-purple-900">
          <FiX size={22} />
        </button>

        <h2 className="text-xl font-bold text-purple-800 mb-3">Note Details</h2>

        {/* Title & Description */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-3 border rounded-md"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Checklist Section */}
        <div className="mb-4">
          <label className="font-semibold text-sm text-purple-800">Checklist</label>
          <div className="flex mt-1 gap-2">
            <input
              type="text"
              value={newCheck}
              onChange={(e) => setNewCheck(e.target.value)}
              placeholder="Add item"
              className="flex-grow p-2 border rounded"
            />
            <button onClick={handleAddChecklist} className="bg-purple-600 text-white px-3 rounded">Add</button>
          </div>
          <ul className="mt-2 space-y-1">
            {checklist.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.isTicked}
                    onChange={() => handleChecklistToggle(idx)}
                  />
                  <span className={item.isTicked ? 'line-through text-gray-400' : ''}>
                    {item.item}
                  </span>
                </div>
                <button onClick={() => handleChecklistDelete(idx)} className="text-red-500 hover:text-red-700">
                  <FiX size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Images */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-sm text-purple-800">Attached Images</span>
            <button onClick={handleImageClick} className="flex items-center text-purple-700 hover:text-purple-900">
              <FiImage className="mr-1" /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 border rounded-md overflow-hidden">
                <Image src={typeof img === 'string' ? img : URL.createObjectURL(img)} alt="note-img" fill className="object-cover" unoptimized />
              </div>
            ))}
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 border border-red-300 px-3 py-2 rounded"
          >
            <FiTrash2 size={16} /> Delete
          </button>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-4 py-2 rounded border border-gray-400 text-gray-700">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteExpandedModal;
