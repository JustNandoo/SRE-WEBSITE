"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionContact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heading1Ref = useRef<HTMLHeadingElement | null>(null);
  const heading2Ref = useRef<HTMLHeadingElement | null>(null);
  const balingRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse", // biar hidup pas scroll balik
            // markers: true, // boleh aktifin buat debugging
          },
        })
        .from([heading1Ref.current, heading2Ref.current], {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        })
        .fromTo(
          balingRef.current,
          { scale: 0, opacity: 0, rotate: 0 },
          {
            scale: 1,
            opacity: 1,
            rotate: 360,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.6" // overlap dikit sama heading
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      id: "linkedin",
      icon: <FaLinkedin size={24} />,
      url: "https://www.linkedin.com/in/society-of-renewable-energy-politeknik-elektronika-negeri-surabaya",
      label: "LinkedIn",
    },
    {
      id: "instagram",
      icon: <FaInstagram size={24} />,
      url: "https://www.instagram.com/sre_pens",
      label: "Instagram",
    },
    {
      id: "youtube",
      icon: <FaYoutube size={24} />,
      url: "https://youtube.com/@srepoliteknikelektronikanegeri?si=tXAglE9jhuDsm5y1",
      label: "YouTube",
    },
    {
      id: "tiktok",
      icon: <FaTiktok size={24} />,
      url: "https://vm.tiktok.com/ZSkoG8mrL/",
      label: "TikTok",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center bg-[url('/img/bg/bg3.png')] bg-cover bg-fixed bg-center"
    >
      <div className="z-10 text-center px-4">
        <h1
          ref={heading1Ref}
          className="text-white text-5xl md:text-7xl font-bold mb-2"
        >
          {`Let's Get`}
        </h1>
        <h1
          ref={heading2Ref}
          className="relative text-[#FFF1AA] text-5xl md:text-7xl font-bold mb-12"
        >
          Connected
          <span className="absolute top-[45%] right-[0%] md:top-[50%] md:-right-[8%] lg:top-[35%] lg:-right-[10%]">
            <Image
              ref={balingRef}
              src="/img/icons/UnionBalingIjo.png"
              alt="Turbin Angin"
              width={100}
              height={100}
              className="w-12 md:w-16 lg:w-20"
            />
          </span>
        </h1>

        {/* Sosmed icon */}
        <div className="flex justify-center space-x-6 mb-16">
          {socialLinks.map((social) => (
            <Link
              key={social.id}
              href={social.url}
              aria-label={social.label}
              className="bg-emerald-500 text-white p-4 rounded-full hover:bg-emerald-600 transition-all duration-300 transform hover:scale-110"
            >
              {social.icon}
            </Link>
          ))}
        </div>

        <div className="text-gray-400 text-sm flex justify-center items-center mt-24">
          Copyright © SRE PENS 2025
        </div>
      </div>
    </div>
  );
};

export default SectionContact;
