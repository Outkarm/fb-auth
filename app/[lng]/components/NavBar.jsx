import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="tw-flex tw-justify-between tw-items-center tw-px-10 tw-py-0">
      <div className="tw-relative tw-flex tw-place-items-center before:tw-absolute">
        <Link href={ "/" }>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className=""
            width={ 100 }
            height={ 24 }
            priority
          />
        </Link>
      </div>
      <div className="tw-z-10 tw-font-mono tw-text-sm tw-mt-5">
        <div>
          <Link
            href={ "/auth/signup" }
            className="tw-border-2 tw-border-blue-500 tw-px-3 tw-py-2 tw-text-md tw-rounded-md tw-text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
