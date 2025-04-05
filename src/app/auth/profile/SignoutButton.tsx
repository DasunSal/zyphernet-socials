'use client';

import { useRouter } from 'next/navigation';
import { signout } from '../../../lib/api';
import { useAuth } from '../../../lib/auth';

export default function SignoutButton() {
  const router = useRouter();
  const { clearAuth } = useAuth();

  const handleSignout = async () => {
    try {
      await signout();
      clearAuth();
      router.push('/auth/signin');
    } catch (error) {
      console.error('Signout failed:', error);
    }
  };

  return (
    <button onClick={handleSignout} className="mt-4 bg-red-500 text-white p-2 rounded">
      Sign Out
    </button>
  );
}