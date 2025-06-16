// components/article/ArticleCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface ArticleCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  date?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  image,
  description,
  date = "2023-04-19"
}) => {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content positioned on the right */}
      <div className="absolute flex inset-0 items-center justify-end sm:pl-72 pl-0">
        <div className="w-2/3 p-4 text-white">
          <h3 className="sm:text-[2.5rem] text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm mb-3 line-clamp-3">{description}</p>
          <p className="text-xs">{date}</p>
        </div>
      </div>
      
      {/* Make the entire card clickable */}
      <Link href={`/article/${id}`} className="absolute inset-0">
        <span className="sr-only">Read article: {title}</span>
      </Link>
    </div>
  );
};

export default ArticleCard;