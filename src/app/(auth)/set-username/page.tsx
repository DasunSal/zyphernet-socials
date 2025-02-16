'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getIdToken, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/client-sdk';
import { Loader } from '@/components/ui/Loader';

const SetUsernamePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setError('No user is logged in');
      }
      setUser(currentUser);
      setInitialCheck(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!username.trim()) {
      setError('Please enter a valid username');
      setIsSubmitting(false);
      return;
    }

    try {
      const idToken = await getIdToken(user!, true);
      const response = await fetch('/api/auth/set-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Check if the error is related to the username already being taken
        if (response.status === 409 && errorData.error === 'Username already taken') {
          throw new Error('This username is already taken, please choose another one.');
        }
        throw new Error(errorData.message || 'Failed to set username');
      }

      router.replace('/profile?refresh=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 bg-black/30 p-6 sm:p-8 rounded-lg border border-gray-800">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white text-center">Create Username</h1>
        <p className="text-sm text-gray-400 text-center">Your unique identifier in Zyphernet</p>
      </div>
      
      {error && (
        <div role="alert" className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-500 text-center">{error}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1.5">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-base"
          />
        </div>
        
        <button
          type="submit"
          disabled={initialCheck || isSubmitting || !user}
          className="w-full py-3 bg-gray-800 px-4 text-white rounded-lg font-medium text-base
                     disabled:opacity-70 disabled:cursor-not-allowed transition-opacity
                     hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          {initialCheck ? (
            <div className="flex justify-center items-center gap-2">
              <Loader variant="page" size="small" />
              <span>Initializing...</span>
            </div>
          ) : isSubmitting ? (
            <div className="flex justify-center items-center gap-2">
              <Loader variant="button" size="small" />
              <span>Saving...</span>
            </div>
          ) : (
            'Save'
          )}
        </button>
      </form>
    </div>
  );
};

export default SetUsernamePage;
