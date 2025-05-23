'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill out both fields');
      return;
    }

    localStorage.setItem(
      'signupData',
      JSON.stringify({ email, password })
    );

    router.push('/register');
  };

  return (
    <div className="bg-syncbee h-screen w-full flex justify-center items-center">
      <form
        className="flex flex-col gap-12 w-1/4 items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-purple-900">SignUp / Register</h1>

        <div className="w-full flex flex-col gap-6 items-center">
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="email" className="text-xl text-purple-900">
              Enter your Email Id
            </label>
            <div className="p-2 w-full h-16 border-2 border-purple-700 rounded-2xl">
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-full bg-transparent outline-none text-black"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="password" className="text-xl text-purple-900">
              Enter your Password
            </label>
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
            className="p-2 w-full h-16 rounded-2xl flex flex-row justify-center items-center gap-3 bg-purple-700 hover:bg-transparent hover:border-2 hover:border-purple-700 text-xl font-medium text-white hover:text-purple-900"
          >
            SignUp
          </button>
        </div>

        <div className="w-full flex flex-row items-center gap-7">
          <div className="w-1/2 h-1 bg-purple-700"></div>
          <h3 className="text-lg font-medium text-purple-900">OR</h3>
          <div className="w-1/2 h-1 bg-purple-700"></div>
        </div>

        <button
          type="button"
          onClick={() => alert('Google signup coming soon')}
          className="p-2 w-full h-16 rounded-2xl flex flex-row justify-center items-center gap-3 bg-purple-700 hover:bg-transparent hover:border-2 hover:border-purple-700 text-xl font-medium text-white hover:text-purple-900"
        >
          Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default SignUp;
