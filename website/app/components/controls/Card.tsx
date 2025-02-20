import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';

interface CardProps {
  title: string;
  description: string;
  image: StaticImageData;
  stats?: string;
  children?: ReactNode;
}

const Card = ({ title, description, image, stats, children }: CardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {stats && (
          <div className="flex items-center text-blue-600 font-semibold">
            <span className="text-2xl mr-2">↑</span>
            {stats}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card; 