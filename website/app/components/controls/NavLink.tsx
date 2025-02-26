"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ href, label, onClick, className = "" }: NavLinkProps) => {
  const isAnchorLink = href.startsWith("#");

  const handleClick = (e: React.MouseEvent) => {
    if (isAnchorLink) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for header
          behavior: "smooth",
        });
      }
    }

    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-gray-300 hover:text-white transition-all duration-300 
        hover:transform hover:translate-y-[-2px] relative 
        after:content-[''] after:absolute after:w-0 after:h-0.5 
        after:bg-blue-400 after:left-0 after:bottom-[-4px] 
        after:transition-all hover:after:w-full
        dark:text-gray-300 dark:hover:text-white
        dark:after:bg-blue-500 ${className}`}
    >
      {label}
    </a>
  );
};

export default NavLink;
