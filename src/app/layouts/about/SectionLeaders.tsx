"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Department {
  id: number;
  name: string;
  description?: string;
  color?: string;
  image?: string;
}

const departments: Department[] = [
  {
    id: 1,
    name: "President",
    description: "Diki Candra Kusuma",
    image: "/img/photo/President.webp",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Vice President 1",
    description: "Alfiqri Amri Marzuki",
    image: "/img/photo/VpOne.webp",
    color: "bg-teal-500",
  },
  {
    id: 3,
    name: "Vice President 2",
    description: "Tiara Vania Wijaya Putri",
    image: "/img/photo/VpTwo.webp",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Secretary 1",
    description: "Bintang Mayra Widodo",
    image: "/img/photo/Secretary1.webp",
    color: "bg-emerald-600",
  },
  {
    id: 5,
    name: "Secretary 2",
    description: "Nabila Andini",
    image: "/img/photo/Secretary2.webp",
    color: "bg-teal-600",
  },
  {
    id: 6,
    name: "Treasurer",
    description: "Dailatul Arofah",
    image: "/img/photo/Treasurer.webp",
    color: "bg-green-600",
  },
];

const MeetDepartment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Responsive
  useEffect(() => {
    const updateSlides = () => {
      setSlidesToShow(window.innerWidth >= 768 ? 3 : 1);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const slideWidth = container.scrollWidth / 2;

    const interval = setInterval(() => {
      scrollAmount += container.offsetWidth / slidesToShow;
      if (scrollAmount >= slideWidth) scrollAmount = 0;

      container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 2000);

    return () => clearInterval(interval);
  }, [slidesToShow]);

  // Swipe logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX: number | null = null;

    const onTouchStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const cardWidth = container.offsetWidth / slidesToShow;
      if (Math.abs(diff) > 50) {
        container.scrollBy({
          left: diff > 0 ? cardWidth : -cardWidth,
          behavior: "smooth",
        });
      }
      startX = null;
    };

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchend", onTouchEnd);
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [slidesToShow]);

  // Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current = [];
      // Animate title
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Animate cards
      gsap.from(cardRefs.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const duplicatedSlides = [...departments, ...departments];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-[#134576] py-64 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-4"
          >
            Meet Our Leaders
          </h1>
        </div>

        <div className="overflow-hidden rounded-3xl">
          <div
            ref={containerRef}
            className="flex max-w-screen transition-transform duration-500 ease-in-out"
            style={{
              scrollBehavior: "smooth",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {duplicatedSlides.map((dept, index) => (
              <div
                key={`${dept.id}-${index}`}
                className="w-full md:w-[calc(100%/3)] flex-shrink-0 px-4"
                style={{ minWidth: `${100 / slidesToShow}%` }}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl group bg-[#10926C]">
                  <Image
                    src={dept.image || "/img/default.jpg"}
                    alt={dept.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 leading-tight">
                      {dept.name}
                    </h3>
                    {dept.description && (
                      <p className="text-white/80 text-lg md:text-xl font-medium">
                        {dept.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetDepartment;
