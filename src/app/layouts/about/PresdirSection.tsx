"use client";

import React from "react";
import PresdirCard from "../../components/about/PresdirCard";
import { teamMembers } from "../../../../lib/presdirData";

const TeamSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-yellow-100">
      <div className="max-w-7xl mx-auto">
        {/* Header with logos */}
        <div className="mb-12">
          <div className="flex items-center justify-start gap-2 mb-4">
            <span className="w-6 h-6 rounded-full border border-gray-800 flex items-center justify-center text-xs">+</span>
            <span className="px-2 py-1 text-xs border border-gray-800 rounded">SRE</span>
            <span className="px-2 py-1 text-xs border border-gray-800 rounded">PENS</span>
            <span className="px-2 py-1 text-xs border border-gray-800 rounded">2025</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 uppercase">A Leader of<br />Society of Renewable Energy</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
            <div>
              <p className="text-sm font-medium text-gray-900 uppercase mb-2">
                BLOCKJOY STARTED AS A PROJECT TO MANAGE STAKING WITH FRIENDS AND FAMILY.
              </p>
            </div>
            <div className="text-sm text-gray-700 space-y-6">
              <p>
                We built advanced tooling to optimize validator management for teams of two. 
                Due to the sheer difficulty of installing and running nodes, our little group 
                company grew crazy fast.
              </p>
              <p>
                {`We quickly realized that Yuga's path won't work for a network because it centralizes 
                control. We developed better solutions connecting validators distributed around the 
                world with full control over where and on what infrastructure to run. Now, network operators can run their own nodes! BlockJoy just keeps 
                the headaches away.`}
              </p>
            </div>
          </div>
        </div>

        {/* Team grid */}
        <PresdirCard members={teamMembers} />
      </div>
    </section>
  );
};

export default TeamSection;