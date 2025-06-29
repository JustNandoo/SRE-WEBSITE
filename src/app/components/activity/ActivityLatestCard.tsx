"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ActivityData } from "../../../../lib/activityLatestData";

gsap.registerPlugin(ScrollTrigger);

interface ActivityLatestCardProps {
  activity: ActivityData;
  index: number;
}

const ActivityLatestCard: React.FC<ActivityLatestCardProps> = ({ activity }) => {
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

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full h-72 overflow-hidden rounded-lg shadow-md cursor-default"
    >
      <div className="absolute inset-0">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="absolute flex inset-0 items-center justify-end sm:pl-72 pl-0">
        <div className="w-2/3 p-4 text-white">
          <h3 className="sm:text-[2.5rem] text-lg font-bold mb-2 leading-10">
            {truncate(activity.title, 20)}
          </h3>
          <p className="text-sm mb-3 line-clamp-3">{truncate(activity.description, 150)}</p>
          <p className="text-xs">{activity.date}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityLatestCard;
