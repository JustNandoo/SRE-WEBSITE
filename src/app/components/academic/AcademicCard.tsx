// components/AcademicCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AcademicCardProps } from "../../../../lib/academicData";

const AcademicCard: React.FC<AcademicCardProps> = ({
  id,
  title,
  image,
  description,
  category,
}) => {
  return (
    <Link href={`/academic/${id}`} className="block">
      <div className="relative overflow-hidden rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
        {/* Top Section with Background Image */}
        <div className="relative w-full h-64">
          <Image
            src={image || "/img/default.jpg"}
            alt={title}
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Title & Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center">
            <div className="bg-green-600 text-white font-bold text-xs rounded-full h-8 w-8 flex items-center justify-center">
              SRE
            </div>
            <h3 className="ml-2 text-white font-bold text-lg">{title}</h3>
          </div>

          {/* Category Watermark */}
          {category && (
            <div className="absolute bottom-2 right-2 z-10 text-white/40 text-xl font-bold text-right leading-5">
              {category.split(" ").map((word, idx) => (
                <div key={idx}>{word}</div>
              ))}
            </div>
          )}
        </div>

        {/* Description Section */}
        <div className="p-4">
          <p className="text-blue-900 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default AcademicCard;
