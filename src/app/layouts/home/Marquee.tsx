"use client";

import localFont from "next/font/local";

// ================= FONT =================
const akira = localFont({
  src: "../../fonts/Akira.otf",
  variable: "--font-akira",
  display: "swap",
});

// ================= MAIN COMPONENT =================
export default function Marquee() {
  // Konten teks yang ingin ditampilkan
  const content = "SRE PENS • Go Green • Go Innovation";

  return (
    <section
      data-scroll-section
      className={`relative z-30 w-full bg-[#012e21] border-y border-[#fff0aa] overflow-hidden text-[#fff0aa] ${akira.variable}`}
    >
      <div className="py-2 md:py-6">
        {/* Container Utama */}
        <div className="overflow-hidden whitespace-nowrap w-full">
          
          {/* Track Animasi CSS */}
          <div className="marquee-track font-akira text-[8vw] lg:text-[6vw] uppercase font-bold flex gap-10">
            {/* Kita me-render teks sebanyak 8 kali (4 pasang) 
               agar cukup panjang untuk animasi infinite loop (-50% translate) 
               bahkan di layar ultrawide.
            */}
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mr-10">
                {content}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* ================= CSS ANIMATION ================= */}
      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content; /* Memastikan lebar mengikuti konten */
          animation: marquee 75s linear infinite; /* Kecepatan animasi */
          will-change: transform; /* Optimasi performa render browser */
        }

        /* Opsional: Animasi berhenti saat kursor diarahkan */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Kita menggeser sejauh -50%. 
               Karena konten diduplikasi (cukup panjang), 
               saat mencapai -50%, posisi visualnya akan sama persis dengan 0%,
               menciptakan ilusi loop tanpa putus.
            */
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}