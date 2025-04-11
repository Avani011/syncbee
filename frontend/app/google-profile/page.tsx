'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CompleteProfilePage() {
  const router = useRouter();

  // Dummy values to simulate Google data — replace with actual values from auth context
  const [googleUser, setGoogleUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  // Collect from user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulate pulling user from session or context (replace with real logic)
  useEffect(() => {
    const stored = sessionStorage.getItem('googleUser');
    if (stored) {
      setGoogleUser(JSON.parse(stored));
    } else {
      router.push('/'); // Redirect if data is missing
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!googleUser) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.avatar,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      // Redirect after success
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!googleUser) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-syncbee">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl w-full max-w-md space-y-6 flex flex-col gap-8 bg-white shadow-xl"
      >
        <h2 className="text-3xl font-bold text-purple-800 text-center">Complete Your Profile</h2>

        {/* Avatar and Info */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border-4 border-purple-600">
            <Image
              src={googleUser.avatar}
              alt="Google avatar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <p className="text-lg font-semibold">{googleUser.name}</p>
          <p className="text-sm text-gray-500">{googleUser.email}</p>
        </div>

        {/* Username */}
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-600"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-600"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Link href="/dashboard" className='w-full'>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-transparent text-white hover:text-purple-900 hover:shadow-md font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Submitting...' : 'Complete Registration'}
          </button>
        </Link>
      </form>
    </div>
  );
}
