'use client';

import React, { useState } from 'react';
import { updateAvatar, updateUser, getCurrentUser } from '@/services/user';

interface ProfileData {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
}

interface Props {
  user: ProfileData; 
  onClose: () => void;
  onUpdate: (data: ProfileData) => void;
}

const EditProfileModal: React.FC<Props> = ({ user, onClose, onUpdate }) => {
  const [editData, setEditData] = useState(user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarFile(file);
  };

  const handleSave = async () => {
    try {
      await updateUser(editData);
  
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        await updateAvatar(formData);
      }
  
      // ✅ Re-fetch the fresh updated user from backend
      const { data } = await getCurrentUser();
  
      onUpdate(data?.data); // ✅ Now passes updated values from DB
      onClose();
    } catch (err) {
      alert('Update failed');
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-purple-800 mb-4">Edit Your Profile</h2>

        <input
          name="username"
          placeholder="Username"
          value={editData.username}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          name="fullName"
          placeholder="Full Name"
          value={editData.fullName}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          name="email"
          placeholder="Email"
          value={editData.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={editData.phone || ''}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input type="file" accept="image/*" onChange={handleFile} />

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm text-red-500 border border-red-300 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
