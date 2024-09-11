"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function VCardQRCode() {
  const { data: session, status } = useSession();

  // Show loading state while session status is being checked
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center mt-5">
      {session ? (
        // Show the vCard link if the user is authenticated
        <Link
          href="/vcard"
          className="bg-blue-700 text-white py-2 px-3 w-fit rounded-md shadow-xl hover:bg-blue-600"
        >
          Create VCard QRCode
        </Link>
      ) : (
        // Show the login link if the user is not authenticated
        <Link
          href="/login"
          className="bg-gray-700 text-white py-2 px-3 w-fit rounded-md shadow-xl hover:bg-gray-600"
        >
          Login to Create VCard QRCode
        </Link>
      )}
    </div>
  );
}
