// src/app/auth/verify/page.tsx
'use client';

import { useState } from 'react';
import { verifyEmail } from '../../../lib/api';

// Define error type
interface VerifyError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export default function VerifyPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await verifyEmail(email, token);
      setMessage(response.message);
    } catch (err: unknown) {
      const error = err as VerifyError;
      setError(error.response?.data?.error || 'Verification failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
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
          <label>Verification Token</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Verify</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}