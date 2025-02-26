import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  image?: string | StaticImageData;
  alt?: string;
  href?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  variant?: "default" | "elevated" | "outlined";
}

const Card = ({
  title,
  description,
  image,
  alt = "",
  href,
  footer,
  children,
  className = "",
  imageClassName = "",
  variant = "default",
}: CardProps) => {
  // Variant styles
  const variantClasses = {
    default:
      "bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700",
    elevated:
      "bg-white border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700",
    outlined:
      "bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700",
  };

  // Base card classes
  const cardClasses = `rounded-lg overflow-hidden transition-all duration-300 
    hover:shadow-lg ${variantClasses[variant]} ${className}`;

  // Card content
  const cardContent = (
    <>
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={alt || title}
            className={`object-cover w-full h-full transition-transform duration-300 
              hover:scale-105 ${imageClassName}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        {children}
      </div>
      {footer && (
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700">{footer}</div>
      )}
    </>
  );

  // If href is provided, make the card a link
  if (href) {
    return (
      <Link href={href} className={`${cardClasses} cursor-pointer`}>
        {cardContent}
      </Link>
    );
  }

  // Otherwise render as a div
  return <div className={cardClasses}>{cardContent}</div>;
};

export default Card; 