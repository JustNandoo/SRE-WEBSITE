"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EventData } from "../../../../lib/activityData";

gsap.registerPlugin(ScrollTrigger);

interface EventCardProps {
  event: EventData;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          willChange: "opacity, transform",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-all duration-300 will-change-transform"
    >
      <Link href={`/event/${event.id}`}>
        <div className="relative w-full h-64">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute top-4 left-4 flex items-center z-10">
            <div className="bg-green-600 text-white font-bold text-xs rounded-full h-8 w-8 flex items-center justify-center">
              EVT
            </div>
            <h3 className="ml-2 text-white font-bold text-lg line-clamp-1">
              {event.title}
            </h3>
          </div>

          <div className="absolute bottom-0 right-0 p-2 z-10">
            <p className="text-white/40 text-xl font-bold text-right leading-tight">
              {event.category.split(" ").map((word, i) => (
                <React.Fragment key={i}>
                  {word} <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-blue-900 text-sm mb-2 line-clamp-2">
            {event.description}
          </p>
          <div className="text-xs text-gray-500">
            {formatDate(event.date)} – {event.time}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
