'use client';

import React from 'react';
import ProfileSection from '@/components/profile/ProfileSection';
import PerformanceMetrics from '@/components/profile/PerformanceMetrics';

const ProfilePage: React.FC = () => {
  return (
    <div className="w-full flex items-center px-4 py-4">
      
      <div className="flex flex-row w-full gap-6 justify-center items-center">
        <div className="w-1/2">
          <ProfileSection />
        </div>
        <div className="w-1/2">
          <PerformanceMetrics />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;