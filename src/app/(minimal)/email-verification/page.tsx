'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { applyActionCode, getAuth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { app } from '@/lib/firebase/client-sdk';
import  Loader  from '@/components/ui/Loader';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [hasCode, setHasCode] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const oobCode = searchParams.get('oobCode');
    
    if (!oobCode) {
      setLoading(false);
      setHasCode(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setError('Please sign in to verify your email');
        setLoading(false);
        return;
      }

      try {
        await applyActionCode(auth, oobCode);
        await user.reload();
        
        const idToken = await user.getIdToken(true);
        const response = await fetch('/api/auth/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        if (!response.ok) throw new Error('Backend verification failed');
        
        const data = await response.json();
        if (!data.emailVerified) throw new Error('Email not verified on backend');

        setSuccess(true);
        setTimeout(() => router.push('/set-username'), 2000);
      } catch (err) {
        if (err instanceof FirebaseError) {
          switch (err.code) {
            case 'auth/expired-action-code':
              setError('Verification link expired. Please request a new one.');
              break;
            case 'auth/invalid-action-code':
              setError('This verification link has already been used or is invalid.');
              break;
            default:
              setError(`Verification failed: ${err.message}`);
          }
        } else if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, searchParams, auth]);

  const getContent = () => {
    if (!hasCode) {
      return (
        <>
          <Info className="h-12 w-12 text-blue-500" />
          <h2 className="text-xl font-semibold text-white mt-4">
            Email Verification Required
          </h2>
          <p className="text-gray-400 mt-2 max-w-md">
            Please check your email for the verification link we sent you.
            Click the link in the email to complete the verification process.
          </p>
        </>
      );
    }

    if (loading) {
      return (
        <>
          <Loader variant="component" size='medium' />
          <h2 className="text-xl font-semibold text-white mt-4">
            Verifying Your Email
          </h2>
          <p className="text-gray-400 mt-2">
            Please wait while we confirm your email address...
          </p>
        </>
      );
    }

    if (success) {
      return (
        <>
          <CheckCircle className="h-12 w-12 text-green-500" />
          <h2 className="text-xl font-semibold text-white mt-4">
            Email Verified!
          </h2>
          <p className="text-gray-400 mt-2">
            Redirecting to profile setup...
          </p>
        </>
      );
    }

    if (error) {
      return (
        <>
          <XCircle className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold text-white mt-4">
            Verification Failed
          </h2>
          <p className="text-gray-400 mt-2 max-w-md">{error}</p>
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-black/50 border border-gray-800 rounded-md p-8 sm:p-10 md:p-12 w-full max-w-2xl">
        <div className="flex flex-col items-center text-center space-y-6">
          {getContent()}
        </div>
      </div>
    </div>
  );
}
