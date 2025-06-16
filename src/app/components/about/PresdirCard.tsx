"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TeamMember } from "../../../../lib/presdirData";

interface PresdirCardProps {
  members: TeamMember[];
}

const PresdirCard: React.FC<PresdirCardProps> = ({ members }) => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {members.map((member, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden rounded-[2rem] group shadow-2xl"
          onMouseEnter={() => setHoveredMember(index)}
          onMouseLeave={() => setHoveredMember(null)}
        >
          <div className="aspect-square relative bg-[#10926C]">
            <Image
              src={member.src}
              alt={member.name}
              fill
              className="object-cover"
            />
            {/* Hover overlay */}
            <div 
              className={`absolute inset-0 bg-gray-900/50 flex items-center justify-center p-4 transition-opacity duration-300 ${
                hoveredMember === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-white text-center text-sm">{member.description}</p>
            </div>
          </div>
          <div className="pl-6 p-3 bg-white">
            <h3 className="text-sm font-bold">{member.name}</h3>
            <p className="text-xs text-gray-600">{member.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PresdirCard;