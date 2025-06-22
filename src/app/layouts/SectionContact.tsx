"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionContact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<Array<HTMLHeadingElement | null>>([]);
  const iconsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const balingRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Judul
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Animasi Ikon Sosmed
      gsap.from(iconsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Copyright muncul dari bawah
      gsap.from(copyrightRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Baling-baling muter
      gsap.fromTo(
        balingRef.current,
        { rotate: 0 },
        {
          rotate: 360,
          duration: 2,
          repeat: -1,
          ease: "linear",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      id: "linkedin",
      icon: <FaLinkedin size={24} />,
      url: "#",
      label: "LinkedIn",
    },
    {
      id: "instagram",
      icon: <FaInstagram size={24} />,
      url: "#",
      label: "Instagram",
    },
    {
      id: "youtube",
      icon: <FaYoutube size={24} />,
      url: "#",
      label: "YouTube",
    },
    { id: "tiktok", icon: <FaTiktok size={24} />, url: "#", label: "TikTok" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-[url('/img/bg/bg3.png')] bg-cover bg-fixed bg-center"
    >
      <div className="z-10 text-center px-4">
        <h1
          ref={(el) => {
            if (el) titleRef.current[0] = el;
          }}
          className="text-white text-5xl md:text-7xl font-bold mb-2"
        >
          {"Let's Get"}
        </h1>
        <h1
          ref={(el) => {
            if (el) titleRef.current[1] = el;
          }}
          className="text-[#FFF1AA] text-5xl md:text-7xl font-bold mb-12 relative"
        >
          Connected
          <span className="absolute sm:inline-block right-115 top-57 hidden">
            <Image
              ref={balingRef}
              src="/img/icons/UnionBalingIjo.png"
              alt="Turbin Angin"
              width={100}
              height={100}
            />
          </span>
        </h1>

        <div className="flex justify-center space-x-6 mb-16">
          {socialLinks.map((social, i) => (
            <Link
              key={social.id}
              href={social.url}
              aria-label={social.label}
              ref={(el) => {
                if (el) iconsRef.current[i] = el;
              }}
              className="bg-emerald-500 text-white p-4 rounded-full hover:bg-emerald-600 transition-all duration-300 transform hover:scale-110"
            >
              {social.icon}
            </Link>
          ))}
        </div>

        <div
          ref={copyrightRef}
          className="text-gray-400 text-sm flex justify-center items-center mt-24"
        >
          Copyright © SRE PENS 2025
        </div>
      </div>
    </div>
  );
};

export default SectionContact;
