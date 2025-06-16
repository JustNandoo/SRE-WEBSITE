"use client";

import React, { useEffect, useRef } from "react";
import { TeamMember } from "../../../../lib/departmentData";
import DepartmentCard from "./DepartmentCard";
import gsap from "gsap";

// Add global style for webkit scrollbar
const globalScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  departmentName: string;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ 
  isOpen, 
  onClose, 
  members,
  departmentName 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Animation handling
  useEffect(() => {
    if (!modalRef.current || !modalContainerRef.current) return;

    // Create timeline for animations
    const tl = gsap.timeline({ paused: true });

    // Setup animations
    tl.fromTo(
      modalContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    tl.fromTo(
      modalRef.current,
      { 
        y: '100%', 
        opacity: 0.8 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out"
      },
      "-=0.1" // Slight overlap with container fade in
    );

    // Play or reverse animation based on isOpen state
    if (isOpen) {
      tl.play();
    } else if (modalRef.current) {
      // Reverse animation when closing
      tl.reverse();
    }

    return () => {
      // Clean up animation
      tl.kill();
    };
  }, [isOpen]);

  // Handle closing the modal with animation
  const handleClose = () => {
    if (!modalRef.current || !modalContainerRef.current) {
      onClose();
      return;
    }

    // Create closure animation
    const closeTl = gsap.timeline({
      onComplete: onClose
    });

    closeTl.to(
      modalRef.current, 
      { 
        y: '100%', 
        opacity: 0.8, 
        duration: 0.4, 
        ease: "power2.in" 
      }
    );

    closeTl.to(
      modalContainerRef.current, 
      { 
        opacity: 0, 
        duration: 0.3 
      }, 
      "-=0.2"
    );
  };

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style jsx global>{globalScrollbarStyle}</style>
      <div 
        ref={modalContainerRef}
        className="fixed inset-0 bg-gray-900/80 bg-opacity-50 z-50 flex items-center justify-center"
      >
        <div 
          ref={modalRef}
          className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-xl"
          style={{ 
            maxHeight: '80vh', 
            overflowY: 'auto',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{departmentName} Team</h2>
            <button 
              onClick={handleClose}
              className="text-gray-900 hover:text-gray-700 transition-colors cursor-pointer bg-gray-200 p-2 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {members.length > 0 ? (
            <DepartmentCard members={members} />
          ) : (
            <div className="py-8 text-center text-gray-500">
              <p>No team members found for this department.</p>
            </div>
          )}
          
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleClose}
              className="px-6 py-2 bg-gray-200 cursor-pointer text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentModal;