"use client";

import { forwardRef } from "react";
import { FaLinkedin, FaInstagram, FaYoutube, FaTiktok, FaArrowRight } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    handle: "SRE PENS Official",
    url: "https://www.linkedin.com/in/society-of-renewable-energy-politeknik-elektronika-negeri-surabaya",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    handle: "@sre_pens",
    url: "https://www.instagram.com/sre_pens",
  },
  {
    icon: <FaYoutube />,
    label: "YouTube",
    handle: "SRE PENS Channel",
    url: "https://youtube.com/@srepoliteknikelektronikanegeri?si=tXAglE9jhuDsm5y1",
  },
  {
    icon: <FaTiktok />,
    label: "TikTok",
    handle: "@sre_pens",
    url: "https://vm.tiktok.com/ZSkoG8mrL/",
  },
];

const SocialLinks = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex flex-col w-full">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between py-5 border-b border-white/10 transition-all duration-300 hover:border-[#F2C601] hover:bg-white/5 hover:px-4"
        >
          {/* Left: Icon & Info */}
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-[#022E21] group-hover:bg-[#F2C601] group-hover:border-[#F2C601] transition-all duration-300">
              {social.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white group-hover:text-[#F2C601] transition-colors duration-300">
                {social.label}
              </span>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors duration-300">
                {social.handle}
              </span>
            </div>
          </div>

          {/* Right: Reveal Arrow */}
          <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out text-[#F2C601]">
            <FaArrowRight />
          </div>
        </a>
      ))}
    </div>
  );
});

SocialLinks.displayName = "SocialLinks";
export default SocialLinks;