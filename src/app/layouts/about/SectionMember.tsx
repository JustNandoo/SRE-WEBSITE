"use client";

import { staffData } from "@/lib/staffData";
import MotionSwitch from "@/app/components/MotionSwitch";
import { MemberCard } from "@/app/components/about/MemberCard";

export default function SectionMember() {
  return (
    <section
      className="relative min-h-screen bg-[#fff0aa] py-24 md:py-32"
      data-scroll-section
    >
      <div className="container mx-auto px-4 md:px-10">
        {/* HEADER */}
        <div className="mb-20 md:mb-32 text-center md:text-left border-b border-[#012e21]/10 pb-10">
          <MotionSwitch
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-[12vw] md:text-[8rem] font-black text-[#012e21] leading-[0.85] tracking-tighter uppercase overflow-hidden"
          >
            <span className="block" data-scroll data-scroll-speed="0.2">
              MEET THE
            </span>
            <span
              className="block text-transparent"
              data-scroll
              data-scroll-speed="0.1"
              style={{ WebkitTextStroke: "1px #012e21" }}
            >
              PILLARS
            </span>
          </MotionSwitch>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-20 md:gap-32">
          {staffData.map((dept, index) => (
            <div
              key={dept.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10"
            >
              {/* LEFT */}
              <div className="md:col-span-4 lg:col-span-3">
                <div className="sticky top-10 flex flex-col gap-4">
                  <span className="text-[#012e21]/40 font-mono text-sm">
                    0{index + 1}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-[#012e21] uppercase">
                    {dept.division}
                  </h2>
                  <p className="text-[#012e21]/70 text-sm max-w-[200px]">
                    {dept.description}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="md:col-span-8 lg:col-span-9">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {dept.members.map((member, idx) => (
                    <MemberCard
                      key={`${dept.id}-${idx}`}
                      member={member}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-32 border-t border-[#012e21]/10 pt-10 text-center">
        <p className="text-[#012e21]/50 text-sm font-mono uppercase tracking-widest">
          SRE PENS • {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
