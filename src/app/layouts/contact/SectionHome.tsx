"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialLinks from "@/app/components/social/SocialLinks";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null); // digunakan oleh SocialLinks
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          socialLinksRef.current,
          {
            opacity: 0,
            x: -30,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          formRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitBtn = e.currentTarget.querySelector('button[type="submit"]');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    console.log("Form submitted:", formData);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-[#022E21] to-[#134576] overflow-x-hidden"
    >
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20 md:py-48 lg:py-42">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Section */}
          <div className="text-white space-y-8">
            <div>
              <h1
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
              >
                {`Let's`} <span className="text-[#F2C601]">Connect</span> &<br />
                <span className="text-[#F2C601]">Collaborate!</span>
              </h1>
              <p
                ref={subtitleRef}
                className="text-base sm:text-lg md:text-xl text-emerald-100 mt-4 sm:mt-6 leading-relaxed"
              >
                Feel free to reach out via email or
                <br />
                connect through our social media!
              </p>
            </div>

            {/* Social Media (sliced) */}
            <SocialLinks ref={socialLinksRef} />
          </div>

          {/* Right Section - Contact Form */}
          <div className="p-4">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 sm:py-4 border-2 border-white rounded-xl focus:border-emerald-500 focus:outline-none transition-colors duration-300 text-white placeholder-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 sm:py-4 border-2 border-white rounded-xl focus:border-emerald-500 focus:outline-none transition-colors duration-300 text-white placeholder-white"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 sm:py-4 border-2 border-white rounded-xl focus:border-emerald-500 focus:outline-none transition-colors duration-300 text-white placeholder-white"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border-2 border-white rounded-xl focus:border-emerald-500 focus:outline-none transition-colors duration-300 text-white placeholder-white resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 mt-10 text-gray-800 font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
