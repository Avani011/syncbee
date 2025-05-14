'use client';

import React from 'react';
import ProfileSection from '@/components/profile/ProfileSection';
import PerformanceMetrics from '@/components/profile/PerformanceMetrics';

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h1 className="text-2xl font-bold text-purple-900">Profile</h1>

      <div className="flex flex-row gap-6 w-full">
        <div className="flex-1 max-w-[600px]">
          <ProfileSection />
        </div>
        <div className="flex-1 max-w-[600px]">
          <PerformanceMetrics />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
