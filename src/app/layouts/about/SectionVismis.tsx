"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MissionCardWrapper, MissionCard } from "../../components/about/MissionCard";

export default function Vismis() {
  const containerRef = useRef(null);
  
  // Variabel animasi untuk stagger (muncul berurutan)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } // Easing "Awwwards"
    },
  };

  return (
    <div 
      ref={containerRef}
      // Styling Section: Rounded Top besar & Negative Margin agar menumpuk section atas
      className="bg-[#F2C601] w-full min-h-screen relative pt-32 pb-20 rounded-t-[3rem] lg:rounded-t-[5rem] -mt-20 z-20 overflow-hidden" 
      data-scroll-section
    >
      {/* Background Decor (Optional Noise/Pattern bisa ditaruh sini) */}

      {/* --- VISION SECTION --- */}
      <div className="container mx-auto px-5 mb-40">
        <div className="flex flex-col items-center text-center relative">
          
          {/* Judul Besar dengan Parallax Lambat */}
          <div className="relative inline-block mb-12">
             {/* Icon Melayang (Parallax Cepat) */}
             <div 
              data-scroll 
              data-scroll-speed="0.3"
              className="absolute -top-8 -right-8 lg:-top-16 lg:-right-20 z-10"
            >
              <Image
                src="/img/icons/about/BalingBiru.svg"
                alt="Decoration"
                width={120}
                height={120}
                className="w-20 h-20 lg:w-40 lg:h-40 animate-spin-slow opacity-90"
              />
            </div>

            <h2 
              data-scroll 
              data-scroll-speed="0.1"
              className="text-[15vw] lg:text-[12rem] leading-[0.8] text-[#10926C] font-black tracking-tighter uppercase mix-blend-multiply"
            >
              Vision
            </h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-xl lg:text-3xl text-[#022E21] font-medium max-w-5xl leading-relaxed tracking-wide"
          >
            &ldquo;Raise interest and spread insight regarding Renewable Energy by developing innovation, exchanging ideas, and facilitating active student participation.&rdquo;
          </motion.p>
        </div>
      </div>

      {/* --- MISSION SECTION --- */}
      <div className="container mx-auto px-5 relative z-10">
        <div className="flex items-end gap-4 mb-16 lg:mb-24 px-4 border-b-2 border-[#134576]/20 pb-10">
           <div data-scroll data-scroll-speed="0.1">
              <Image
                src="/img/icons/about/Panel.svg"
                alt="Panel"
                width={80}
                height={80}
                className="w-16 h-16 lg:w-24 lg:h-24 mb-2"
              />
           </div>
           <h2 className="text-6xl lg:text-9xl text-[#134576] font-bold tracking-tighter leading-none">
              Mission
           </h2>
        </div>

        {/* Grid Kartu dengan Animasi Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          <MissionCardWrapper>
            {/* Wrap component import di dalam motion div agar bisa di-animasikan */}
            <motion.div variants={itemVariants} className="w-full">
                <MissionCard
                  imgPath="math.gif"
                  heading="Education"
                  text="Disseminating knowledge and implementing the development of renewable energy that is green and sustainable."
                />
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-full">
                <MissionCard
                  imgPath="eco-earth.gif"
                  heading="Environment"
                  text="Reducing the impact of conventional energy, preserving culture, and protecting the Earth."
                />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
                <MissionCard
                  imgPath="wind-turbine.gif"
                  heading="Technology"
                  text="Developing cutting-edge innovations to increase the capacity and benefits of renewable energy."
                />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
                <MissionCard
                  imgPath="renewable-energy.gif"
                  heading="Law"
                  text="Supporting the transition from conventional energy to green energy to achieve Indonesia's net zero emission target."
                />
            </motion.div>
          </MissionCardWrapper>
        </motion.div>
      </div>
    </div>
  );
}