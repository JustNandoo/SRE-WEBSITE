"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { EventData } from "../../../../lib/activityData";
import { FaArrowLeft } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ActivityDetailContent({ activity }: { activity: EventData }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        linkRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: linkRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
            scrub: false,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-[60vh]">
        <div className="relative w-full h-full">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* Content Card */}
      <div className="relative z-10 min-h-screen mx-auto pt-[50vh]">
        <div className="bg-white shadow-xl rounded-t-2xl sm:rounded-t-[3rem] px-6 sm:px-10 md:px-14 py-10 sm:py-14 relative">
          {/* Tombol Back */}
          <div className="absolute top-6 sm:top-10 left-6 sm:left-10">
            <Link
              ref={linkRef}
              href="/activity"
              className="inline-flex items-center space-x-0 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group bg-white rounded-xl shadow-md border px-4 py-2"
            >
              <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium hidden sm:block">Back</span>
            </Link>
          </div>

          {/* Judul dan Info */}
          <div className="text-center my-10">
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900"
            >
              {activity.title}
            </h1>
            <p
              ref={subtitleRef}
              className="text-sm sm:text-base font-medium text-gray-500 mt-2"
            >
              {activity.date} · {activity.time} · {activity.category}
            </p>
          </div>

          {/* Isi Activity */}
          <div
            ref={contentRef}
            className="text-gray-700 leading-relaxed space-y-6 text-justify text-base sm:text-lg"
          >
            <p className="whitespace-pre-line">{activity.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
