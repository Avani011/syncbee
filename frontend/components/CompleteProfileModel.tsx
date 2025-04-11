'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  googleData: {
    name: string;
    email: string;
    avatar: string; // profile image URL
  };
  onComplete: (username: string, password: string) => void;
}

export default function CompleteProfileModal({ googleData, onComplete }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-purple-800 text-center">Complete Your Profile</h2>

        {/* Google Info */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 relative rounded-full overflow-hidden border-4 border-purple-600">
            <Image
              src={googleData.avatar}
              alt="Google avatar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <p className="text-lg font-semibold">{googleData.name}</p>
          <p className="text-sm text-gray-500">{googleData.email}</p>
        </div>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-600"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Set a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-600"
          required
        />

        <button
          onClick={() => onComplete(username, password)}
          className="w-full bg-purple-700 hover:bg-transparent text-white hover:text-purple-900 hover:shadow-md font-semibold py-3 rounded-lg transition"
        >
          Complete Registration
        </button>
      </div>
    </div>
  );
}
