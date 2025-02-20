import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

interface CustomButtonProps {
  variant?: "primary" | "danger" | "default";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const CustomButton = ({
  variant = "default",
  disabled = false,
  onClick,
  children,
  className,
}: CustomButtonProps) => {
  const buttonClasses = classNames(
    "px-4 py-2 rounded-md transition-all duration-300 font-medium",
    {
      // Light theme variants
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600":
        variant === "primary",
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600":
        variant === "danger",
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600":
        variant === "default",
      "opacity-50 cursor-not-allowed hover:bg-opacity-50": disabled,
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
