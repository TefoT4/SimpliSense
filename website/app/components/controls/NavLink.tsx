import React from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Add this line
}
const NavLink: React.FC<NavLinkProps> = ({ href, children, className}) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  const linkClasses = classNames(
    "transition-colors duration-300",
    {
      "text-blue-600": isActive,
      "text-gray-800 hover:text-blue-600": !isActive,
    },
    className
  );

  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
};

export default NavLink;