"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { TeamMember } from "../../../../lib/presdirData";

interface PresdirCardProps {
  members: TeamMember[];
}

const boxWidth = 300;

const PresdirCard: React.FC<PresdirCardProps> = ({ members }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const next = () => {
    const wrapWidth = (members.length - 1) * boxWidth;
    gsap.to(carouselRef.current!.children, {
      x: "-=" + boxWidth,
      duration: 1,
      modifiers: {
        x: function (x) {
          const val = gsap.utils.wrap(-boxWidth, wrapWidth, parseInt(x));
          return val + "px";
        },
      },
    });
  };

  const prev = () => {
    gsap.to(carouselRef.current!.children, {
      x: "+=" + boxWidth,
      duration: 1,
      modifiers: {
        x: function (x) {
          const wrapWidth = (members.length - 1) * boxWidth;
          const val = gsap.utils.wrap(-boxWidth, wrapWidth, parseInt(x));
          return val + "px";
        },
      },
    });
  };

  useEffect(() => {
    gsap.set(carouselRef.current!.children, {
      x: (i: number) => i * boxWidth,
    });

    const interval = setInterval(() => {
      next();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-hidden"
        style={{ height: boxWidth }}
        ref={carouselRef}
      >
        {members.map((member, index) => (
          <div
            key={index}
            className="w-[300px] flex-none relative overflow-hidden rounded-[2rem] shadow-2xl mx-2 bg-white"
          >
            <div className="aspect-square relative bg-[#10926C]">
              <Image
                src={member.src}
                alt={member.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-center text-sm">
                  {member.description}
                </p>
              </div>
            </div>
            <div className="pl-6 p-3">
              <h3 className="text-sm font-bold">{member.name}</h3>
              <p className="text-xs text-gray-600">{member.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        >
          Prev
        </button>
        <button
          onClick={next}
          className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PresdirCard;