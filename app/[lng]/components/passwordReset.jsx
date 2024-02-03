"use client";

import { useRouter } from "next/navigation";
import InputLayout from "./input";
import authenticator from "@/firebase/authenticator";
import { useEffect, useState } from "react";
import logger from "@/logger";

export default function PasswordReset({ token }) {
  const router = useRouter(),
    [isLoading, setIsLoading] = useState(false),
    [isPasswordReset, setIsPasswordReset] = useState(false),
    [password, setPassword] = useState("");

  useEffect(() => {
    if (isPasswordReset) {
      const waitToInformUser = setTimeout(() => router.push("/auth/signin"));
      return function cleanup() {
        clearTimeout(waitToInformUser);
      };
    }

    return;
  }, [isPasswordReset]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    try {
      await authenticator.passwordReset(password, token);
      setIsPasswordReset(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to change password", error);
      alert("Failed to change password");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Reseting password....</p>;
  }

  if (isPasswordReset) {
    return <p>Reset successful. Redirecting to login....</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="tw-underline tw-text-2xl tw-font-bold tw-uppercase tw-underline-offset-4 tw-mb-4">
        Create new password
      </h1>
      <p className="tw-text-slate-100 tw-font-light tw-text-[14px]">
        Your new password must be different from the previously used passwords.
      </p>
      <InputLayout
        labelVal={"password"}
        inputElId={"password"}
        inputType={"password"}
        handleOnChange={(evt) => setPassword(evt.currentTarget.value)}
        placeholderText="enter new password"
      />
      <section className="tw-flex tw-gap-4 tw-flex-row-reverse tw-my-4">
        <button
          className="tw-bg-slate-500/40 tw-py-2 tw-px-4 tw-rounded-md"
          type="submit"
        >
          reset password
        </button>
        <button
          className="tw-bg-slate-100/40 tw-py-2 tw-px-4 tw-rounded-md tw-border tw-border-slate-500/40"
          type="button"
          onClick={() => router.push("/")}
        >
          cancel
        </button>
      </section>
    </form>
  );
}
