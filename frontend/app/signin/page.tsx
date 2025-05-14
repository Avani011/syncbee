'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/user';

const SignIn = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      alert('Please enter your email/username and password');
      return;
    }

    setLoading(true);

    try {
      const isEmail = identifier.includes('@');
      const payload = {
        password,
        ...(isEmail
          ? { email: identifier.toLowerCase() }
          : { username: identifier.toLowerCase() })
      };

      const { data } = await loginUser(payload);

      console.log("🧾 Response:", data);

      if (data && data.data?.user) {
        console.log('✅ Login success:', data.data.user);
        router.push('/dashboard');
      } else {
        alert('❌ Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-syncbee h-screen w-full flex justify-center items-center">
      <form className="flex flex-col gap-12 w-1/4 items-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold text-purple-900">Sign In</h1>

        <div className="w-full flex flex-col gap-6 items-center">
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="identifier" className="text-xl text-purple-900">Email or Username</label>
            <div className="p-2 w-full h-16 border-2 border-purple-700 rounded-2xl">
              <input
                id="identifier"
                type="text"
                value={identifier}
                required
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full h-full bg-transparent outline-none text-black"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="password" className="text-xl text-purple-900">Password</label>
            <div className="p-2 w-full h-16 border-2 border-purple-700 rounded-2xl">
              <input
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full bg-transparent outline-none text-black"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="p-2 w-full h-16 rounded-2xl flex flex-row justify-center items-center gap-3 bg-purple-700 hover:bg-transparent hover:border-2 hover:border-purple-700 text-xl font-medium text-white hover:text-purple-900"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <div className="w-full flex flex-row items-center gap-7">
          <div className="w-1/2 h-1 bg-purple-700"></div>
          <h3 className="text-lg font-medium text-purple-900">OR</h3>
          <div className="w-1/2 h-1 bg-purple-700"></div>
        </div>

        <button
          type="button"
          onClick={() => alert('Google login coming soon')}
          className="p-2 w-full h-16 rounded-2xl flex flex-row justify-center items-center gap-3 bg-purple-700 hover:bg-transparent hover:border-2 hover:border-purple-700 text-xl font-medium text-white hover:text-purple-900"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default SignIn;
