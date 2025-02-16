// errors.ts
"use client"
import Link from "next/link";
export const emailNotVerifiedError = (
    onClickVerification: () => void,
    isVerifying: boolean
  ) => (
    <p className="text-sm text-red-500 text-center">
      Your email is not verified. Please check your inbox or{" "}
      <button
        onClick={onClickVerification}
        className="text-blue-500 underline"
        disabled={isVerifying}
      >
        click here
      </button>
      .
    </p>
  );
  
  export const usernameSetupError = () => (
    <p className="text-sm text-red-500 text-center">
      Your account is incomplete. Please{" "}
      <Link href="/helpers/username" className="text-blue-500 underline">
        set up your username
      </Link>
      .
    </p>
  );
  
  export const genericError = () => (
    <p className="text-sm text-red-500 text-center">
      An unexpected error occurred. Please try again later.
    </p>
  );
  
  export const incorrectEmailPasswordError = () => (
    <p className="text-sm text-red-500 text-center">
      The email or password is incorrect. Please try again.
    </p>
  );
  