import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

interface CustomButtonProps {
  variant?: "primary" | "secondary" | "danger" | "default";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "default",
  disabled = false,
  onClick,
  children,
  className,
}) => {
  const buttonClasses = classNames(
    "px-4 py-2 rounded-md transition-all duration-300 font-medium",
    {
      "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
      "bg-red-600 text-white hover:bg-red-700": variant === "danger",
      "bg-gray-200 text-gray-800 hover:bg-gray-300": variant === "secondary",
      "opacity-50 cursor-not-allowed": disabled,
    },
    className
  );

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default CustomButton;