// src/app/auth/signin/page.tsx
'use client';

import { useState } from 'react';
import { signin } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/auth';

// Define error type
interface SigninError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { user, expires_at } = await signin(email, password);
      setAuth(user, expires_at);
      router.push('/auth/profile');
    } catch (err: unknown) {
      const error = err as SigninError;
      setError(error.response?.data?.error || 'Signin failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign In</button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}