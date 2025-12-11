"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SocialLinks from "@/app/components/social/SocialLinks";
import { Poppins } from "next/font/google";
import { FaPaperPlane, FaArrowDown } from "react-icons/fa";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// --- SUB-COMPONENT: NOISE TEXTURE ---
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          stitchTiles="stitch"
        />
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

export default function ContactForm() {
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
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

      {/* --- BACKGROUND GRID LINES (Responsive) --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem", // Ukuran grid lebih kecil di mobile agar proporsional
        }}
      />

      <div className="container mx-auto px-4 md:px-10 relative z-10 pt-24 md:pt-32 pb-20">
        {/* --- HEADER TITLE --- */}
        <div className="border-b border-white/20 pb-8 mb-12 md:mb-20">
          <h1
            className="text-6xl md:text-8xl lg:text-[12vw] leading-[0.8] font-black tracking-tighter text-white mix-blend-overlay opacity-50 select-none"
            data-scroll
            data-scroll-speed="-0.1"
          >
            CONTACT
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/20">
          {/* --- LEFT COLUMN: INFO & SOCIALS --- */}
          {/* Mobile: Posisi Relative (Scroll Biasa). Desktop: Sticky (Menempel) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/20 relative">
            <div
              // FIX UX: Sticky hanya aktif di layar besar (lg). Di HP dia static/relative.
              className="relative lg:sticky lg:top-20 py-10 md:py-16 px-2 md:px-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6 text-[#F2C601]">
                  <FaArrowDown className="animate-bounce text-sm" />
                  <span className="font-mono text-xs uppercase tracking-widest">
                    Get in Touch
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                  {`Let's start a `}<br />
                  <span className="text-[#F2C601]">Conversation.</span>
                </h2>

                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-sm">
                  {`Whether you have a question, a project proposal, or just want
                  to say hi, we're here to listen.`}
                </p>

                {/* Socials Area */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">
                    Connect With Us
                  </p>
                  <SocialLinks />
                </div>
              </motion.div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: THE FORM --- */}
          <div className="lg:col-span-7">
            <div className="border-b border-white/20 p-2 mb-6">
              <h1
                className="text-4xl md:text-6xl lg:text-[5.5vw] flex justify-center items-center leading-[0.8] font-black tracking-tighter text-white mix-blend-overlay opacity-50 select-none"
                data-scroll
                data-scroll-speed="-0.1"
              >
                SEND MESSAGE TO SRE PENS
              </h1>
            </div>
            <div className="bg-[#022E21]/50 backdrop-blur-sm">
              <div className="py-12 px-4 md:px-16 lg:px-20">
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-12 md:space-y-16"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  {/* Form Groups */}
                  {[
                    { id: "name", label: "What is your name?", type: "text" },
                    { id: "email", label: "Your email address", type: "email" },
                    { id: "subject", label: "Subject", type: "text" },
                  ].map((field, i) => (
                    <div key={field.id} className="relative group">
                      <label
                        htmlFor={field.id}
                        className="block text-[#F2C601] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 opacity-70"
                      >
                        {`0${i + 1} / ${field.label}`}
                      </label>
                      <input
                        type={field.type}
                        name={field.id}
                        id={field.id}
                        value={(formData as any)[field.id]}
                        onChange={handleInputChange}
                        className="block w-full py-3 md:py-4 bg-transparent border-b border-white/20 text-xl md:text-3xl text-white focus:outline-none focus:border-[#F2C601] transition-colors placeholder-transparent rounded-none"
                        placeholder="Type here..."
                        required
                      />
                    </div>
                  ))}

                  {/* Textarea */}
                  <div className="relative group">
                    <label
                      htmlFor="message"
                      className="block text-[#F2C601] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 opacity-70"
                    >
                      04 / Your Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="block w-full py-3 md:py-4 bg-transparent border-b border-white/20 text-xl md:text-3xl text-white focus:outline-none focus:border-[#F2C601] transition-colors resize-none placeholder-transparent rounded-none"
                      placeholder="Type here..."
                      required
                    />
                  </div>

                  {/* Submit Button (Full Width on Mobile) */}
                  <div className="flex justify-end pt-6 md:pt-10">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto group relative inline-flex items-center justify-center gap-3 bg-white text-[#022E21] px-8 py-4 rounded-full text-sm md:text-base font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-[#F2C601] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                      <FaPaperPlane className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
