"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./controls/NavLink";
import CustomButton from "./controls/CustomButton";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith("/auth");
  const isLoginPage = pathname === "/auth/login";
  const isRegisterPage = pathname === "/auth/register";
  const isBlogPage = pathname?.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [pathname]); // Update login state when route changes

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/simpliSense.png"
              alt="SimpliSense Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="ml-3 text-xl font-semibold text-white">
              SimpliSense
            </span>
          </Link>

          {!isAuthPage && !isBlogPage && (
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink href="#features" label="Features" />
              <NavLink href="#how-it-works" label="How It Works" />
              <NavLink href="#pricing" label="Pricing" />
              <NavLink href="#blog" label="Blog" />
              {isLoggedIn && (
                <div className="relative">
                  <button
                    title="Profile"
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <Image
                      src="/profile-placeholder.png"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>Profile</span>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/subscription"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Subscription
                      </Link>
                      <Link
                        href="/analytics"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Analytics
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("user");
                          window.location.href = "/";
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </nav>
          )}

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <></>
            ) : (
              <>
                {!isLoginPage && (
                  <Link href="/auth/login">
                    <CustomButton variant="default">Login</CustomButton>
                  </Link>
                )}
                {!isRegisterPage && (
                  <Link href="/auth/register">
                    <CustomButton variant="primary">Register</CustomButton>
                  </Link>
                )}
              </>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              {pathname === "/" && (
                <>
                  <NavLink href="#features" label="Features" mobile />
                  <NavLink href="#how-it-works" label="How It Works" mobile />
                  <NavLink href="#pricing" label="Pricing" mobile />
                  <NavLink href="#blog" label="Blog" mobile />
                </>
              )}

              {isLoggedIn && (
                <>
                  <Link href="/profile" className="text-left">
                    Profile
                  </Link>
                  <Link href="/subscription" className="text-left">
                    Subscription
                  </Link>
                  <Link href="/analytics" className="text-left">
                    Analytics
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
