// components/ErrorMessages.tsx
import Link from 'next/link';

export const UsernameSetupError = () => (
  <p className="text-sm text-red-500 text-center">
    Your account is incomplete. Please{' '}
    <Link href="/helpers/username" className="text-blue-500 underline">
      set up your username
    </Link>
    .
  </p>
);

export const EmailVerificationError = ({ onResend }: { onResend: () => void }) => (
  <p className="text-sm text-red-500 text-center">
    Your email is not verified. Please check your inbox or{' '}
    <button onClick={onResend} className="text-blue-500 underline">
      click here
    </button>
    .
  </p>
);

export const GenericError = () => (
  <p className="text-sm text-red-500 text-center">
    An unexpected error occurred. Please try again later.
  </p>
);
