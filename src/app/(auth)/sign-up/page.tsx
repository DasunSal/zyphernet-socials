'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase/client-sdk';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/Loader';
import { EmailInput } from '@/components/helpers/EmailInput';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // Clear previous errors
    setError('');

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      router.push('/instructions');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error instanceof Error && 'code' in error) {
        const authError = error as { code: string };
        switch (authError.code) {
          case 'auth/email-already-in-use':
            setError('This email is already registered');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address');
            break;
          case 'auth/operation-not-allowed':
            setError('Email/password accounts are not enabled');
            break;
          case 'auth/weak-password':
            setError('Password is too weak');
            break;
          default:
            setError('Failed to create account. Please try again.');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 bg-black/30 p-6 sm:p-8 rounded-lg border border-gray-800">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white text-center">Create account</h1>
        <p className="text-sm text-gray-400 text-center">Get started with your account</p>
      </div>

      {/* Error Display */}
      {error && (
        <div role="alert" className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-500 text-center">{error}</p>
        </div>
      )}

      {/* Form */}
      <form className="space-y-4" onSubmit={handleRegister}>
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} error={error} />

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-base pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-base pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            required
            className="h-4 w-4 bg-black border-gray-700 rounded"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
            I agree to the{' '}
            <Link href="/terms" className="text-white hover:text-gray-200">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-white hover:text-gray-200">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 ${
            isSubmitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'
          } text-white rounded-lg font-medium text-base transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600`}
        >
          <div className={`flex justify-center items-center space-x-2`}>
            {isSubmitting ? (
              <div className="flex-none w-5 h-5">
                <Loader variant="button" />
              </div>
            ) : (
              <span>Create Account</span>
            )}
          </div>
        </button>
      </form>

      {/* Footer */}
      <div className="pt-2">
        <p className="text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-white hover:text-gray-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}