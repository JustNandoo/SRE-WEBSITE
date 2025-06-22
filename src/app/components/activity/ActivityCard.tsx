// src/components/activity/ActivityCard.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Poppins } from "next/font/google";
import { ActivityData } from "../../../../lib/activityLatestData";
import Image from "next/image";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ActivityCardProps {
  activity: ActivityData;
  index: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-24 h-20 flex-shrink-0">
        <Image
          width={100}
          height={100}
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4">
        <h3
          className={`${poppins.variable} font-semibold text-gray-800 text-sm mb-1`}
        >
          {activity.title}
        </h3>
        <p className={`${poppins.variable} text-xs text-gray-600 line-clamp-2`}>
          {activity.description}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
