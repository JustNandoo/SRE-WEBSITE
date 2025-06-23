"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MissionCardWrapper, MissionCard } from "../../components/about/MissionCard";

gsap.registerPlugin(ScrollTrigger);

export default function Vismis() {
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const cardWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vision animation
      gsap.from(visionRef.current, {
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Mission heading animation
      gsap.from(missionRef.current, {
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Card animation
      const cards = gsap.utils.toArray(".mission-card") as HTMLElement[];
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardWrapperRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#F2C601] w-full min-h-screen p-10 relative">
      {/* Vision Section */}
      <article ref={visionRef} className="lg:w-1/2 mx-auto text-center mb-20">
        <div className="w-auto flex -space-x-7 items-baseline justify-center mb-5 relative">
          <h2 className="text-7xl text-[#10926C] font-bold">Vision</h2>
          <Image
            src="/img/icons/about/BalingBiru.svg"
            alt="BalingBiru.svg"
            width={50}
            height={50}
            className="relative -top-5"
          />
        </div>
        <p className="text-xl text-[#022E21] tracking-wider">
          Raise interest and spread insight among PENS students regarding Renewable Energy by developing innovation, exchanging ideas, and facilitating students as active students in the field of Renewable Energy
        </p>
      </article>

      {/* Mission Section */}
      <article ref={missionRef} className="max-w-7xl mx-auto mb-20">
        <div className="flex items-baseline justify-center mb-10">
          <Image
            src="/img/icons/about/Panel.svg"
            alt="Panel.svg"
            width={100}
            height={100}
          />
          <h2 className="text-7xl text-[#134576] font-bold">Mission</h2>
        </div>

        <div ref={cardWrapperRef}>
          <MissionCardWrapper>
            <MissionCard
              imgPath="math.gif"
              heading="Education"
              text="Disseminating knowledge and implementing the development of renewable energy that is green and sustainable."
            />
            <MissionCard
              imgPath="eco-earth.gif"
              heading="Environment"
              text="Reducing the impact of conventional energy, preserving culture, and protecting the Earth."
            />
            <MissionCard
              imgPath="wind-turbine.gif"
              heading="Technology"
              text="Developing cutting-edge innovations to increase the capacity and benefits of renewable energy for the surrounding environment."
            />
            <MissionCard
              imgPath="renewable-energy.gif"
              heading="Law"
              text="Supporting the transition from conventional energy to green energy to achieve Indonesia's net zero emission target."
            />
          </MissionCardWrapper>
        </div>
      </article>
    </div>
  );
}
