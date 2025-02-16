"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/lib/firebase/client-sdk';
import axios from "axios";
import { Loader } from "@/components/ui/Loader";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<React.ReactNode | null>(null);

  // Render error for username setup
  const renderUsernameSetupError = () => (
    <p className="text-sm text-red-500 text-center">
      Your account is incomplete. Please{" "}
      <Link href="/helpers/username" className="text-blue-500 underline">
        set up your username
      </Link>
      .
    </p>
  );

  // Render error for email verification
  const renderEmailVerificationError = () => (
    <p className="text-sm text-red-500 text-center">
      Your email is not verified. Please{" "}
      <Link href="/helpers/email" className="text-blue-500 underline">
        verify your email
      </Link>
      .
    </p>
  );

  // Render a generic error without any actionable items
  const renderGenericError = () => (
    <p className="text-sm text-red-500 text-center">
      An unexpected error occurred. Please try again later.
    </p>
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // API call to create session
      const response = await axios.post("/api/auth/session", { idToken }, { withCredentials: true });

      if (response.status === 200) {
        if (response.data.needsUsername) {
          setError(renderUsernameSetupError()); // Show username setup error
          return;
        }
        router.replace('/profile?refresh=true');
      } else {
        throw new Error("Failed to create session.");
      }
    } catch (err: unknown) {
      // Handle errors
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;

        // Handle specific errors
        if (errorMessage === 'This email is not verified') {
          setError(renderEmailVerificationError()); // Show email verification error
          return;
        } else if (errorMessage === 'Account creation is not complete') {
          setError(renderUsernameSetupError()); // Show username setup error
          return;
        }

        // Fallback for any other known error
        setError(
          <p className="text-sm text-red-500 text-center">{errorMessage || "An unknown error occurred."}</p>
        );
      } else if (err instanceof Error) {
        // Catch other errors like network or server issues
        setError(renderGenericError()); // Show generic error
      } else {
        // Fallback for unknown error types
        setError(renderGenericError()); // Show generic error
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-black/30 p-6 sm:p-8 rounded-lg border border-gray-800">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white text-center">Login</h1>
        <p className="text-sm text-gray-400 text-center">Sign in to continue</p>
      </div>

      {/* Error Display */}
      {error && (
        <div role="alert" className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 
              focus:ring-gray-600 focus:border-transparent text-base"
            placeholder="Email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                focus:ring-gray-600 focus:border-transparent text-base pr-12"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                hover:text-white focus:outline-none transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 bg-black border-gray-700 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
              Remember me
            </label>
          </div>

          <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-white">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full h-12 py-3 px-4 bg-gray-800 hover:bg-gray-700 
            text-white rounded-lg font-medium text-base transition-colors
            focus:outline-none focus:ring-2 focus:ring-gray-600 relative"
          disabled={loading}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader variant="button" />
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="pt-2">
        <p className="text-sm text-gray-400 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-medium text-white hover:text-gray-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
