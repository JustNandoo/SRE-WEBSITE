// components/AcademicCard.tsx
import React from 'react';
import Link from 'next/link';

export interface AcademicCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  category?: string;
}

const AcademicCard: React.FC<AcademicCardProps> = ({
  id,
  title,
  // image,
  description,
  category = "Solar Technology"
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/academic/${id}`}>
        <div className="w-full h-64 bg-gradient-to-br from-teal-700 to-blue-900 relative">
          {/* Solar panel grid background pattern */}
          <div className="absolute inset-0 opacity-40">
            <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="border border-white/30"></div>
              ))}
            </div>
          </div>
          
          {/* Green Energy label */}
          <div className="absolute top-4 left-4 flex items-center">
            <div className="bg-green-600 text-white font-bold text-xs rounded-full h-8 w-8 flex items-center justify-center">
              SRE
            </div>
            <h3 className="ml-2 text-white font-bold text-lg">
              {title}
            </h3>
          </div>
          
          {/* Category watermark */}
          <div className="absolute bottom-0 right-0 p-2">
            <p className="text-white/40 text-xl font-bold">{category.split(' ').map(word => (
              <React.Fragment key={word}>
                {word} <br />
              </React.Fragment>
            ))}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-blue-900 text-sm">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default AcademicCard;