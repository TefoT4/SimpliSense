"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import simpliSense from "@/public/simpliSense.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <Link
            href="/"
            className="text-white hover:text-gray-300 flex items-center"
          >
            <Image
              src={simpliSense}
              alt="SimpliSense Logo"
              className="mr-2 h-20 w-56"
            />
          </Link>
        </div>

        {/* Navigation and Login/Profile Menu */}
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6">
            <Link href="/features" className="hover:text-gray-300">
              Features
            </Link>
            <Link href="/how-it-works" className="hover:text-gray-300">
              How It Works
            </Link>
            <Link href="/pricing" className="hover:text-gray-300">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-gray-300">
              Blog
            </Link>
          </nav>
          <div>
            {isLoggedIn ? (
              <button
                className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                onClick={() => alert("Profile menu coming soon!")}
              >
                <Image
                  src="/profile-placeholder.png"
                  alt="Profile"
                  className="rounded-full mr-2"
                  width={24}
                  height={24}
                />
                Profile
              </button>
            ) : (
              <button
                onClick={() => setIsLoggedIn(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
