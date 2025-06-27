"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  date = "2023-04-19",
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // Fungsi untuk menyingkat judul jika terlalu panjang
  const truncateTitle = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  // Fungsi untuk menyingkat deskripsi jika terlalu panjang
  const truncateDescription = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full h-72 overflow-hidden rounded-lg shadow-md"
    >
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="absolute flex inset-0 items-center justify-end sm:pl-72 pl-0">
        <div className="w-2/3 p-4 text-white">
          <h3 className="sm:text-[2.5rem] text-lg font-bold mb-2 leading-10">
            {truncateTitle(title, 20)}
          </h3>
          <p className="text-sm mb-3 line-clamp-3">{truncateDescription(description, 150)}</p>
          <p className="text-xs">{date}</p>
        </div>
      </div>

      <Link href={`/article/${id}`} className="absolute inset-0">
        <span className="sr-only">Read article: {title}</span>
      </Link>
    </div>
  );
};

export default ArticleCard;