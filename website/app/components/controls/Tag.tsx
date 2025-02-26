import Link from "next/link";

interface TagProps {
  label: string;
  href?: string;
  color?: "blue" | "green" | "red" | "purple" | "gray";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const Tag = ({
  label,
  href,
  color = "blue",
  size = "md",
  className = "",
  onClick,
}: TagProps) => {
  // Color variations
  const colorClasses = {
    blue: "bg-blue-100 text-black hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50",
    green:
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50",
    red: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50",
    purple:
      "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50",
    gray: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
  };

  // Size variations
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  // Base classes
  const baseClasses = `inline-block rounded-full font-medium transition-all duration-200 
    transform hover:scale-105 hover:shadow-sm ${colorClasses[color]} ${sizeClasses[size]} ${className}`;

  // Content
  const content = <span className="flex items-center gap-1">{label}</span>;

  // If href is provided, render as a link
  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  // Otherwise render as a span, with optional click handler
  return (
    <span
      className={`${baseClasses} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {content}
    </span>
  );
};

export default Tag;
