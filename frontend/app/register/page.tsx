'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ avatar, username, phone, fullname });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-syncbee">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl w-full max-w-md space-y-6 flex flex-col gap-8"
      >
        <h2 className="text-3xl font-bold text-purple-800 text-center">Complete Your Profile</h2>

        <div className="w-full flex flex-col gap-8 items-center">
          {/* Avatar Upload with + Button */}
          <div className="relative w-36 h-36">
            <div className="w-36 h-36 rounded-full border-2 border-purple-600 overflow-hidden flex items-center justify-center text-gray-500 text-sm relative">
              {preview ? (
                <Image
                  src={preview}
                  alt="avatar preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span>No Avatar</span>
              )}
            </div>

            {/* Plus Button on Border */}
            <button
              type="button"
              onClick={handleAvatarClick}
              className="absolute bottom-3 right-2 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-10"
            >
              +
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-600"
            required
          />

          {/* Phone Number */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-600"
            required
          />

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-3 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-600"
            required
          />

          <Link href='/dashboard' className='w-full'>
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-transparent text-white hover:text-purple-900 hover:shadow-md font-semibold py-3 rounded-lg transition"
            >
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
