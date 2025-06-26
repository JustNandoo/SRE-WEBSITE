"use client";

import { forwardRef } from "react";
import { FaLinkedin, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { gsap } from "gsap";

const socialLinks = [
  {
    icon: <FaLinkedin className="w-6 h-6" />,
    label: "LinkedIn Official SRE PENS",
    handle: "SRE PENS - Society of Renewable Energy",
    url: "https://www.linkedin.com/in/society-of-renewable-energy-politeknik-elektronika-negeri-surabaya",
  },
  {
    icon: <FaInstagram className="w-6 h-6" />,
    label: "Instagram Official SRE PENS",
    handle: "@sre_pens",
    url: "https://www.instagram.com/sre_pens",
  },
  {
    icon: <FaYoutube className="w-6 h-6" />,
    label: "YouTube Official SRE PENS",
    handle: "@SREPoliteknikElektronikaNegeriSurabaya",
    url: "https://youtube.com/@srepoliteknikelektronikanegeri?si=tXAglE9jhuDsm5y1",
  },
  {
    icon: <FaTiktok className="w-6 h-6" />,
    label: "TikTok Official SRE PENS",
    handle: "@sre_pens",
    url: "https://vm.tiktok.com/ZSkoG8mrL/",
  },
];

const SocialLinks = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="space-y-4">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer group"
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform duration-300">
            {social.icon}
          </div>
          <div>
            <div className="font-semibold text-white">{social.label}</div>
            {social.handle && (
              <div className="text-emerald-200 text-sm">{social.handle}</div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
});

SocialLinks.displayName = "SocialLinks";
export default SocialLinks;
