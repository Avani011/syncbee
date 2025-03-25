'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Define TypeScript interfaces
interface ProfileData {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  photoUrl: string;
}

const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'productivity_master',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    photoUrl: 'https://i.pravatar.cc/150?img=12',
  });

  const [tempProfileData, setTempProfileData] = useState<ProfileData>({ ...profileData });

  const handleEditToggle = (): void => {
    if (isEditing) {
      // Save changes
      setProfileData({ ...tempProfileData });
    } else {
      // Start editing
      setTempProfileData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTempProfileData({
      ...tempProfileData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // In a real app, you would handle file upload to your backend/storage here
    // For now, we'll just simulate a local preview
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileData({
          ...tempProfileData,
          photoUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex justify-between items-end mb-6">
        <button
          onClick={handleEditToggle}
          className={`px-4 py-2 rounded-md ${
            isEditing
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-5">
        {/* Left column - Photo and username */}
        <div className="flex flex-col items-center w-full mb-6 md:mb-0">
          <div className=" w-[150px] rounded-full overflow-hidden mb-3 ring-2 ring-purple-300">
            <Image
            //   src={isEditing ? tempProfileData.photoUrl : profileData.photoUrl}
                src='/profile.svg'
              alt="Profile"
              className="w-full h-full object-cover"
              width={400}
              height={400}
            />
            {isEditing && (
              <label
                htmlFor="photo-upload"
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer transition-opacity hover:bg-opacity-70"
              >
                <span className="text-white text-xs font-medium">Change</span>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Right column - Profile details */}
        <div className="w-[90%] flex items-center flex-col">
          <div className="mb-4 w-full flex flex-row justify-between">
            <label className="flex text-sm font-medium text-gray-600">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={tempProfileData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ring-1 ring-gray-200 px-3 py-2"
              />
            ) : (
              <div className="mt-1 text-gray-900">{profileData.username}</div>
            )}
          </div>

          <div className="mb-4 w-full flex flex-row justify-between gap-16">
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={tempProfileData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ring-1 ring-gray-200 px-3 py-2"
              />
            ) : (
              <div className="mt-1 text-gray-900">{profileData.fullName}</div>
            )}
          </div>

          <div className="mb-4 w-full flex flex-row justify-between gap-16">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={tempProfileData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ring-1 ring-gray-200 px-3 py-2"
              />
            ) : (
              <div className="mt-1 text-gray-900 truncate" title={profileData.email}>
                {profileData.email}
              </div>
            )}
          </div>

          <div className="mb-4 w-full flex flex-row justify-between gap-16">
            <label className="block text-sm font-medium text-gray-600">Phone (Optional)</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={tempProfileData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ring-1 ring-gray-200 px-3 py-2"
              />
            ) : (
              <div className="mt-1 text-gray-900">{profileData.phone || '-'}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;