"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  // This would normally come from your auth context/state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Temporary toggle for demonstration
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 z-50 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/simpliSense.png"
              alt="SimpliSense Logo"
              width={150}
              height={40}
              priority
              className="brightness-200" // Makes the logo more visible on dark background
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "How it Works", "Pricing", "Blog"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-gray-300 hover:text-white transition-all duration-300 hover:transform hover:translate-y-[-2px] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-400 after:left-0 after:bottom-[-4px] after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              style={{
                transform: isMobileMenuOpen ? "rotate(180deg)" : "rotate(0)",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Auth Button (Desktop) */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-2px]"
                onClick={toggleLogin}
              >
                <Image
                  src="/profile-placeholder.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
                <span>Profile</span>
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-2px]"
                onClick={toggleLogin}
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4 py-4">
            {["Features", "How it Works", "Pricing", "Blog"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-gray-300 hover:text-white transition-all duration-300 px-2 py-1 rounded hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            {/* Auth Button (Mobile) */}
            {isLoggedIn ? (
              <button
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                onClick={toggleLogin}
              >
                <Image
                  src="/profile-placeholder.png"
                  alt="Profile"
                  width={34}
                  height={34}
                />
                <span>Profile</span>
              </button>
            ) : (
              <button
                className="text-left px-2 py-1 text-gray-300 hover:text-white transition-colors duration-300"
                onClick={toggleLogin}
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
