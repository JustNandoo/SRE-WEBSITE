"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { articleContent } from "../../../../lib/articleData";

gsap.registerPlugin(ScrollTrigger);

// ===============================
// 🔤 Tipe Props untuk ArticleCard
// ===============================
interface ArticleCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  date?: string;
}

// ===============================
// 🔧 Fungsi bantu singkatin teks
// ===============================
const truncateTitle = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

const truncateDescription = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

// ===============================
// 📦 Komponen Card Artikel
// ===============================
const ArticleCard: React.FC<ArticleCardProps> = ({
  imageSrc,
  title,
  subtitle,
  ctaText,
  ctaLink,
}) => (
  <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
    <Image src={imageSrc} alt={title} fill className="object-cover" priority />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70 flex items-center">
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white max-w-sm text-left">
        <h3 className="sm:text-[2.5rem] text-lg font-bold mb-2 leading-10">
          {truncateTitle(title, 20)}
        </h3>
        <p className="text-sm md:text-base mb-4 text-gray-200">
          {truncateDescription(subtitle, 50)}
        </p>
        <Link href={ctaLink}>
          <span className="inline-block bg-yellow-400 text-black font-medium px-4 py-2 rounded-full text-sm hover:bg-yellow-500 transition duration-300">
            {ctaText}
          </span>
        </Link>
      </div>
    </div>
  </div>
);

// ===============================
// 🔻 Section Utama
// ===============================
const SectionHome: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [randomIndex, setRandomIndex] = useState<number>(0);

  // 🔄 Ambil data artikel random
  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * articleContent.length));
  }, []);

  // 🎞️ GSAP animasi
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0,
          y: -40,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const article = articleContent[randomIndex];

  return (
    <div className="min-h-screen bg-[#022321]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20 md:py-48 lg:py-32">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl text-center lg:text-[5rem] font-bold text-white mb-8 md:mb-12"
        >
          Research <span className="text-yellow-400">&</span> Article
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full" ref={cardRef}>
            <ArticleCard
              imageSrc={article.image}
              title={article.title}
              subtitle={article.description}
              ctaText="Read More"
              ctaLink={`/article/${article.id}`}
              date={article.date}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SectionHome;
