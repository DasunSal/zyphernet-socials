"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '@/lib/firebase/client-sdk';
import axios from "axios";
import Loader  from "@/components/ui/Loader";
import { useRouter } from 'next/navigation';
import { FirebaseError } from "firebase/app";
import { PasswordInput } from '@/components/helpers/PasswordInput';
import { EmailInput } from '@/components/helpers/Email';
import AuthLink from '@/components/helpers/Redirect-link';
import { Lock } from 'lucide-react'

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Render error for username setup
  const renderUsernameSetupError = () => (
    <p className="text-sm text-red-500 text-center">
      Your account is incomplete. Please{" "}
      <Link href="/helpers/username" className="text-blue-500 underline">
        finish you account creation
      </Link>
      .
    </p>
  );

  // Render error for email verification
  const renderEmailVerificationError = () => (
    <p className="text-sm text-red-500 text-center">
      Your email is not verified. Please check your inbox or{" "}
      <button
        onClick={handleSendVerificationEmail}
        className="text-blue-500 underline"
        disabled={isVerifying}
      >
        click here
      </button>
      .
    </p>
  );


  // Render a generic error without any actionable items
  const renderGenericError = () => (
    <p className="text-sm text-red-500 text-center">
      An unexpected error occurred. Please try again later.
    </p>
  );


  const handleSendVerificationEmail = async () => {
    setIsVerifying(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        router.push('/instructions');
      } else {
        setError(
          <p className="text-sm text-red-500 text-center">
            No user is currently signed in. Please try logging in again.
          </p>
        );
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    
      setError(
        <p className="text-sm text-red-500 text-center">
          {`There was an error sending the verification email. Error: ${errorMessage}. Please try again.`}
        </p>
      );
    }finally {
      setIsVerifying(false);
    }
  };

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
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-credential") { // New unified error code
          setError(
            <p className="text-sm text-red-500 text-center">
              Incorrect email or password
            </p>
          );
          return;
        }
      }     
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/too-many-requests') {
          setError(
            <p className="text-sm text-red-500 text-center">
              Too many requests. Please wait a moment and try again.
            </p>
          );
          return;
        }
      }
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
  <Lock className="text-white w-10 h-10 mx-auto" /> 
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
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  showPassword={showPassword}
  setShowPassword={setShowPassword}
/>

        <div className="flex items-center justify-between underline">
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

      <AuthLink 
       text="Don't have an account?" 
      linkText="Sign up" 
       linkHref="/sign-up" 
      />
    </div>
  );
};

export default LoginPage;
