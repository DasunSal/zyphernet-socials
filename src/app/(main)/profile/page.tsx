"use client"
import React, { useState } from 'react';
import { LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Send API call to backend to expire the session cookie
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // After successful logout, force a full page reload
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-sm text-gray-400">Welcome to your profile page</p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="py-3 px-6 bg-gray-500 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md 
            transition-colors duration-300 ease-in-out flex items-center justify-center space-x-2"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
