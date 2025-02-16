import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase/client-sdk";
import { useRouter } from "next/navigation";

const useSendVerificationEmail = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);
  const router = useRouter();

  const handleSendVerificationEmail = async () => {
    setIsVerifying(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setError(
          <p className="text-sm text-green-500 text-center">
            A verification email has been sent. Please check your inbox.
          </p>
        );
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
    } finally {
      setIsVerifying(false);
    }
  };

  return { handleSendVerificationEmail, isVerifying, error };
};

export default useSendVerificationEmail;
