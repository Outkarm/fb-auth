import Link from "next/link";
import React from "react";
import Image from "next/image";
import authenticator from "@/firebase/authenticator";
import { useState } from "react";
import mixpanel from "@/services/mixpanel";
import { useRouter } from "next/navigation";


const DashboardNav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setIsLoading(true);
    await authenticator.signout();
    mixpanel.reset();
    router.push("/auth/signin")
    setIsLoading(false);
  }

  return (
    <div>
      <nav className="tw-bg-white tw-fixed tw-w-full tw-z-20 tw-top-0 tw-left-0 tw-border-b tw-text-black">
        <div className="tw-max-w-screen-xl tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-mx-auto tw-p-4">
          <a href="/" className="tw-flex tw-items-center">
            <Image
              className="tw-mr-2"
              src="/companyLogo.png"
              alt="Betr Beta Logo"
              width={30}
              height={30}
            />
            <span className="tw-self-center tw-text-2xl tw-font-semibold tw-whitespace-nowrap tw-text-black">
              Betr Beta
            </span>
          </a>
          <div className="tw-flex md:tw-order-2">
            <Link
              href="https://release-notes-manager.betrbeta.com/home"
              className="tw-font-medium tw-text-indigo-600"
            >
              Release Notes Manager
            </Link>
            {/* <button
              type="button"
              className="tw-text-white tw-bg-blue-700 hover:tw-bg-blue-800 tw-font-medium tw-rounded-lg tw-text-sm tw-px-4 tw-py-2 tw-text-center tw-mr-3 md:tw-mr-0 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"
            >
              Release Notes Manager
            </button> */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isLoading}
              className="tw-text-black tw-bg-slate-500/40 tw-rounded-lg tw-text-sm tw-px-4 tw-py-2 tw-text-center tw-mr-3 tw-ml-3 md:tw-mr-0 tw-font-medium"
            >
              Sign Out
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="tw-inline-flex tw-items-center tw-p-2 tw-w-10 tw-h-10 tw-justify-center tw-text-sm tw-text-gray-500 tw-rounded-lg md:tw-hidden hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-200 dark:tw-text-gray-400 dark:hover:tw-bg-gray-700 dark:focus:tw-ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only"></span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNav;
