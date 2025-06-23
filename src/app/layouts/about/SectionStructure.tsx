import Image from "next/image";
import React from "react";

const Structure: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F2C601] to-yellow-100 p-5">
      <div className="flex items-baseline justify-center mb-10">
        <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#10926C] font-bold">
          Structure
        </h2>
      </div>

      <div className="max-w-7xl h-[700px] bg-[#012e21] mx-auto flex items-center justify-center relative rounded-2xl">
        <Image
          src="/img/icons/about/Structure.svg" 
          alt="Structure Diagram"
          fill
          priority
          className="object-contain p-0 sm:p-10"
        />
      </div>
    </section>
  );
};

export default Structure;