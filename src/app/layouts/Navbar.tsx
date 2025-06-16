"use client";

import "../style/globals.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // AuthButtons jadi dummy redirect ke 404
  const AuthButtons = () => (
    <Link
      href="/404"
      className="p-2 bg-[#fff0aa]/30 border-2 border-[#fff0aa] rounded-xl shadow-xl backdrop-blur-lg"
      aria-label="Dummy Login"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-6 h-6"
      >
        <path
          fill="#012e21"
          d="M352 96l64 0c17.7 0 32 14.3 32 32v256c0 17.7-14.3 32-32 32h-64c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96h-64c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h210.7l-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"
        />
      </svg>
    </Link>
  );

  return (
    <nav className="fixed w-full top-5 z-50">
      <div className="mx-2 space-y-3 lg:mx-5 md:mx-3 sm:mx-2">
        <div className="p-1 px-4 mx-auto bg-[#fff0aa]/70 border-3 border-[#fff0aa]/20 rounded-full max-w-7xl sm:px-6 lg:px-8 backdrop-blur-lg">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  className="dark:invert"
                  src="/logo/svg/sreLogoOne.svg"
                  alt="Logo SRE PENS"
                  width={180}
                  height={38}
                  priority
                />
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden space-x-6 md:flex">
              {["Home", "About", "Academic", "Article", "Activity", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="relative hover:underline font-bold tracking-wide text-[#012e21]"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>

            {/* Auth Button - Desktop */}
            <div className="items-center hidden space-x-4 md:flex">
              <AuthButtons />
            </div>

            {/* Mobile Section */}
            <div className="flex items-center space-x-2 md:hidden">
              <div className="items-center md:hidden space-x-4 flex">
                <AuthButtons />
              </div>
              <button
                onClick={toggleMenu}
                type="button"
                className="p-2 bg-[#fff0aa]/30 border-2 border-[#fff0aa] rounded-xl shadow-xl backdrop-blur-lg"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-6 h-6">
                    <path
                      fill="#012e21"
                      d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8-9.5 45.1-4.1L192 306l135.4 162.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6">
                    <path
                      fill="#012e21"
                      d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transform transition-all duration-500 ease-in-out backdrop-blur-lg bg-opacity-75 p-2 rounded-xl bg-[#fff0aa]/70 mt-5 border-4 border-[#fff0aa]/30 mx-2 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
          {["Home", "About", "Academic", "Activity", "Article", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative block px-4 py-2 font-medium text-[#012e21] hover:border-2 hover:border-[#fff0aa] rounded-xl"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
