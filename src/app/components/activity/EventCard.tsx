// src/components/activity/EventCard.tsx
"use client"

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { EventData } from '../../../../lib/activityData';

interface EventCardProps {
  event: EventData;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [index]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <Link href={`/event/${event.id}`}>
        <div className="w-full h-64 bg-gradient-to-br from-teal-700 to-blue-900 relative">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-40">
            <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="border border-white/30"></div>
              ))}
            </div>
          </div>

          {/* Title + Label */}
          <div className="absolute top-4 left-4 flex items-center">
            <div className="bg-green-600 text-white font-bold text-xs rounded-full h-8 w-8 flex items-center justify-center">
              EVT
            </div>
            <h3 className="ml-2 text-white font-bold text-lg">
              {event.title}
            </h3>
          </div>

          {/* Category as watermark */}
          <div className="absolute bottom-0 right-0 p-2">
            <p className="text-white/40 text-xl font-bold">
              {event.category.split(' ').map(word => (
                <React.Fragment key={word}>
                  {word} <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Description + Date/Time */}
        <div className="p-4">
          <p className="text-blue-900 text-sm mb-2">{event.description}</p>
          <div className="text-xs text-gray-500">
            {formatDate(event.date)} – {event.time}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
