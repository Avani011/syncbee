'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCurrentUser } from '@/services/user';
import EditProfileModal from './EditProfileModal';

interface ProfileData {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
}

const ProfileSection: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setProfileData(res.data.data);
      } catch (err) {
        console.error('Failed to load user', err);
      }
    };

    fetchUser();
  }, []);

  if (!profileData) return <p className="text-center">Loading...</p>;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 w-full relative">
        <div className="flex justify-between mb-4">
          <button onClick={() => setIsEditing(true)} title="Edit">
            <Image src="/edit.svg" alt="Edit" width={24} height={24} />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-purple-300">
            <Image
              src={profileData.avatar || '/profile.svg'}
              alt="Avatar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="text-left flex flex-col gap-4 w-full max-w-md">
            <div className='flex flex-row justify-between'>
              <p><strong>Username:</strong></p>  
              <p> {profileData.username}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p><strong>Full Name:</strong></p>  
              <p>{profileData.fullName}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p><strong>Email:</strong></p>  
              <p>{profileData.email}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p><strong>Phone:</strong></p>  
              <p>{profileData?.phone || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditProfileModal
          user={profileData}
          onClose={() => setIsEditing(false)}
          onUpdate={(updatedUser) => setProfileData(updatedUser)} // ✅ this line
        />      
      )}
    </>
  );
};

export default ProfileSection;
