"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ArticleCardProps = {
  imageSrc: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  imageSrc,
  title,
  subtitle,
  ctaText,
  ctaLink,
}) => {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70 flex items-center">
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white max-w-xs text-right">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base mb-4 text-gray-200">{subtitle}</p>
          <Link href={ctaLink}>
            <span className="inline-block bg-yellow-400 text-black font-medium px-4 py-2 rounded-full text-sm hover:bg-yellow-500 transition duration-300">
              {ctaText}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SectionHome: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Judul
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

      // Animasi Card
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

  return (
    <div className="min-h-screen bg-[#022321]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20 md:py-48 lg:py-32">
        <h2 ref={headingRef} className="text-3xl md:text-4xl text-center lg:text-[5rem] font-bold text-white mb-8 md:mb-12">
          Research <span className="text-yellow-400">&</span> Article
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full" ref={cardRef}>
            <ArticleCard
              imageSrc="https://i.pinimg.com/736x/c6/81/02/c681021cb112160b140173bcb32ce250.jpg"
              title="The Result: COP 29 Baku Azerbaijan"
              subtitle="In Solidarity for a Green World"
              ctaText="Read More"
              ctaLink="/articles/{$slug}"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SectionHome;
