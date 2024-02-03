"use client";

import authenticator from "@/firebase/authenticator";
import { applyActionCode, checkActionCode } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logger from "@/logger";

export default function VerifyEmail({ token }) {
  const router = useRouter(),
    [isVerifying, setIsVerifying] = useState(true),
    [error, setError] = useState("");

  function handleEmailVerification() {
    checkActionCode(authenticator.app, token)
      .then(async () => {
        await applyActionCode(authenticator.app, token);
        await authenticator.currentUser.reload();

        if (authenticator.isEmailVerified()) {
          setIsVerifying(false);
          localStorage.removeItem("emailVerificationStatus");
          router.push("/dashboard");
          return;
        }

        throw "Email not verified.";
      })
      .catch((err) => {
        setIsVerifying(false);
        // if (err.includes('FirebaseError')) {

        // }
        setError("Email not verified.");
        console.log("Error verifying email", err);
      });
  }

  useEffect(() => {
    handleEmailVerification();
  }, []);

  // handleEmailVerification()

  if (isVerifying) {
    return <p>Hold on while we verify your email....</p>;
  }

  if (error.length > 0) {
    return <p>{error}</p>;
  }

  return <p>Email verified, redirecting you to dashboard....</p>;
}
