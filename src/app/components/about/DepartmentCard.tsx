"use client";

import React from "react";
import Image from "next/image";
import { TeamMember } from "../../../../lib/departmentData";

interface DepartmentCardProps {
  members: TeamMember[];
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ members }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member) => (
        <div 
          key={member.id}
          className="bg-[#10926C] rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="relative h-56 w-full">
            <Image
              src={member.image || "/images/placeholder-avatar.jpg"}
              alt={member.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.position}</p>
            {member.bio && (
              <p className="text-sm text-gray-500 mt-2">{member.bio}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentCard;