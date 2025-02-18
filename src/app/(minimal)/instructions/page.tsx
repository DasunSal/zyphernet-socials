'use client';
import Link from 'next/link';

export default function InstructionsPage() {

  return (
    <div className="space-y-6 bg-black/30 p-6 sm:p-8 rounded-lg border border-gray-800 max-w-md mx-auto">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Check Your Email</h1>
        <p className="text-sm text-gray-400">
          We’ve sent you a verification email. Please check your inbox to continue.
        </p>
      </div>

  

      {/* Resend Button */}
      <button
        className={`w-full py-3 px-4 bg-gray-800 hover:bg-gray-700'
        } text-white rounded-lg font-medium text-base transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600`}
      >
        Resend Verification Email
      </button>

      <div className="pt-4 text-center">
        <p className="text-sm text-gray-400">
          Didn’t receive the email?{' '}
          <Link href="/register" className="font-medium text-white hover:text-gray-200">
            Try registering again
          </Link>
          .
        </p>
      </div>
    </div>
  );
}