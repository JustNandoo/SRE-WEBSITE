"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import { MerchItem } from "@/lib/merchData";

interface MerchCardProps {
  item: MerchItem;
}

const MerchCard: React.FC<MerchCardProps> = ({ item }) => {
  return (
    <Link href={`/merch/${item.id}`} className="group block w-full">
      {/* Image Wrapper */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a]">
        
        {/* Hover Reveal Image (Zoom Effect) */}
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />

        {/* Status Tag (Top Left) */}
        <div className="absolute top-0 left-0 p-4 z-20">
           <span className="inline-block px-3 py-1 bg-[#F2C601] text-[#012e21] text-[10px] font-bold uppercase tracking-widest">
              {item.tag}
           </span>
        </div>

        {/* Overlay Darken */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        
        {/* Quick Add Button (Bottom Right) */}
        <div className="absolute bottom-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
           <button className="w-12 h-12 bg-white text-[#012e21] rounded-full flex items-center justify-center hover:bg-[#F2C601] transition-colors shadow-lg">
              <FaShoppingBag size={14} />
           </button>
        </div>
      </div>

      {/* Info Section (Technical Look) */}
      <div className="mt-4 flex justify-between items-start border-t border-[#fff0aa]/20 pt-4">
        <div className="max-w-[70%]">
          <h3 className="text-lg font-medium text-[#fff0aa] leading-tight uppercase mb-1 line-clamp-2">
            {item.name}
          </h3>
          <p className="text-xs text-[#fff0aa]/50 font-mono uppercase tracking-widest">
            {item.category}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#F2C601] font-mono text-sm">{item.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default MerchCard;