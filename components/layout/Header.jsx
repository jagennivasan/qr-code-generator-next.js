"use client";

import Link from "next/link";
import { BiLogIn } from "react-icons/bi";
import { FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useSession } from "next-auth/react"; // Import useSession hook

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession(); // Get session data and status

  // Determine if the session is still loading
  const isLoading = status === "loading";

  // Render based on session status
  const authLinks = isLoading ? (
    <p className="text-gray-500">Loading...</p>
  ) : session ? (
    <Link
      href="/dashboard"
      className="bg-blue-500 text-white px-3 py-2 flex items-center rounded hover:bg-blue-600 transition"
      aria-label="Dashboard"
    >
      Dashboard
    </Link>
  ) : (
    <>
      <Link
        href="/login"
        className="bg-yellow-500 text-white px-3 py-2 flex items-center rounded hover:bg-yellow-600 transition"
        aria-label="Log In"
      >
        <BiLogIn size={20} className="mr-1" /> Log In
      </Link>
      <Link
        href="/sign-up"
        className="bg-blue-600 text-white px-3 py-2 flex items-center rounded hover:bg-blue-700 transition"
        aria-label="Sign Up"
      >
        <FaPlusSquare size={20} className="mr-1" /> Sign Up
      </Link>
    </>
  );

  return (
    <nav className="flex flex-wrap items-center justify-between p-5">
      <Link href="/" className="text-2xl font-bold">
        Logo
      </Link>

      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="block lg:hidden text-gray-700"
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? (
          <IoMdClose size={26} />
        ) : (
          <IoReorderThreeOutline size={26} />
        )}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full lg:flex lg:items-center lg:justify-center lg:w-auto space-y-4 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0`}
      >
        <Link href="/" className="hover:text-blue-500 block lg:inline-block">
          QR Code
        </Link>
        <Link href="/" className="hover:text-blue-500 block lg:inline-block">
          FAQ
        </Link>
        <Link href="/" className="hover:text-blue-500 block lg:inline-block">
          Why Us
        </Link>
        <Link href="/" className="hover:text-blue-500 block lg:inline-block">
          Product
        </Link>
        <Link href="/" className="hover:text-blue-500 block lg:inline-block">
          API
        </Link>
        <Link href="/" className="hover:text-blue-500 block lg:inline-block">
          Blog
        </Link>
      </div>

      {/* Auth Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full lg:flex lg:items-center lg:justify-end lg:w-auto space-y-4 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0`}
      >
        {authLinks}
      </div>
    </nav>
  );
}
