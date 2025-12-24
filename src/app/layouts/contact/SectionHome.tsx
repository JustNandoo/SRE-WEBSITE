"use client";

import { useState } from "react";
import SocialLinks from "@/app/components/social/SocialLinks";
import MotionSwitch from "@/app/components/MotionSwitch";
import { Poppins } from "next/font/google";
import { FaPaperPlane, FaArrowDown } from "react-icons/fa";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ================= NOISE OVERLAY =================
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function SectionHome() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section
      className={`relative min-h-screen bg-[#022E21] text-white ${poppins.variable} overflow-hidden`}
      data-scroll-section
    >
      <NoiseOverlay />

      {/* ================= GRID BACKGROUND ================= */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 md:px-10 relative z-10 pt-24 md:pt-32 pb-20">
        {/* ================= HEADER ================= */}
        <div className="border-b border-white/20 pb-8 mb-12 md:mb-20">
          <h1
            className="text-6xl md:text-8xl lg:text-[12vw] leading-[0.8] font-black tracking-tighter opacity-50 select-none"
            data-scroll
            data-scroll-speed="-0.1"
          >
            CONTACT
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/20">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/20">
            <div className="relative lg:sticky lg:top-20 py-10 md:py-16 px-2 md:px-10">
              <MotionSwitch
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8 },
                  },
                }}
              >
                <div className="flex items-center gap-3 mb-6 text-[#F2C601]">
                  <FaArrowDown className="animate-bounce text-sm" />
                  <span className="font-mono text-xs uppercase tracking-widest">
                    Get in Touch
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                  Let’s start a <br />
                  <span className="text-[#F2C601]">Conversation.</span>
                </h2>

                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-sm">
                  Whether you have a question, a project proposal, or just want
                  to say hi — we’re here.
                </p>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">
                    Connect With Us
                  </p>
                  <SocialLinks />
                </div>
              </MotionSwitch>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="lg:col-span-7">
            <div className="border-b border-white/20 p-2 mb-6">
              <h1
                className="text-4xl md:text-6xl lg:text-[5.5vw] text-center leading-[0.8] font-black tracking-tighter opacity-50 select-none"
                data-scroll
                data-scroll-speed="-0.1"
              >
                SEND MESSAGE TO SRE PENS
              </h1>
            </div>

            <div className="bg-[#022E21]/50 backdrop-blur-sm">
              <div className="py-12 px-4 md:px-16 lg:px-20">
                <MotionSwitch
                  as="form"
                  onSubmit={handleSubmit}
                  className="space-y-12 md:space-y-16"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { duration: 1, delay: 0.2 },
                    },
                  }}
                >
                  {[
                    { id: "name", label: "What is your name?", type: "text" },
                    {
                      id: "email",
                      label: "Your email address",
                      type: "email",
                    },
                    { id: "subject", label: "Subject", type: "text" },
                  ].map((field, i) => (
                    <div key={field.id} className="relative">
                      <label className="block text-[#F2C601] font-mono text-xs uppercase tracking-widest mb-3 opacity-70">
                        {`0${i + 1} / ${field.label}`}
                      </label>
                      <input
                        {...field}
                        value={(formData as any)[field.id]}
                        onChange={handleInputChange}
                        className="w-full py-4 bg-transparent border-b border-white/20 text-2xl focus:outline-none focus:border-[#F2C601]"
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-[#F2C601] font-mono text-xs uppercase tracking-widest mb-3 opacity-70">
                      04 / Your Message
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full py-4 bg-transparent border-b border-white/20 text-2xl focus:outline-none focus:border-[#F2C601] resize-none"
                      required
                    />
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto inline-flex items-center gap-3 bg-white text-[#022E21] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#F2C601] transition"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <FaPaperPlane />
                    </button>
                  </div>
                </MotionSwitch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
