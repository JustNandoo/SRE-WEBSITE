"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import DepartmentModal from "../../components/about/DepartmentModal";
import {
  departments,
  DepartmentType,
  getTeamMembersByDepartment,
} from "../../../../lib/departmentData";
import Link from "next/link";

const DepartmentSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] =
    useState<DepartmentType | null>(null);

  // Membuat ref untuk setiap tombol departemen
  const buttonRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const openModal = (department: DepartmentType) => {
    setCurrentDepartment(department);
    setIsModalOpen(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-hidden");
    setTimeout(() => setCurrentDepartment(null), 300); // Wait for animation to complete
  };

  // Fungsi untuk menangani hover masuk pada tombol
  const handleMouseEnter = (departmentId: string) => {
    const button = buttonRefs.current[departmentId];
    if (button) {
      gsap.to(button, {
        scale: 1.05,
        y: -3,
        boxShadow: "0px 6px 0px 0px rgba(1,46,33, 50%)",
        ease: "power2.out",
        duration: 0.2,
      });
    }
  };

  // Fungsi untuk menangani hover keluar pada tombol
  const handleMouseLeave = (departmentId: string) => {
    const button = buttonRefs.current[departmentId];
    if (button) {
      gsap.to(button, {
        scale: 1,
        y: 0,
        boxShadow: "0px 0px 0px 0px rgba(1,46,33, 0%)",
        ease: "power2.out",
        duration: 0.2,
      });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-yellow-100 to-[#134576]">
      <div className="max-w-7xl mx-auto">
        {/* Header with logos */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            A TEAM OF
            <br />
            ALL OUR DEPARTMENT
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-medium text-gray-900 uppercase mb-2">
                Greeting our department
              </p>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <div
              key={department.id}
              className="bg-white rounded-xl px-3 py-2 shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-96">
                <Image
                  src={department.image || "/images/placeholder-department.jpg"}
                  alt={department.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {department.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">
                  {department.description}
                </p>
                <Link
                  href="#"
                  ref={(el) => (buttonRefs.current[department.id] = el)}
                  onMouseEnter={() => handleMouseEnter(department.id)}
                  onMouseLeave={() => handleMouseLeave(department.id)}
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(department.id);
                  }}
                  className="flex max-w-md mx-auto items-center justify-center py-2.5 px-6 sm:px-4 md:px-8 rounded-full font-medium text-white bg-[#012e21] border-2 text-xs border-[#fff0aa] shadow-lg transition-all hover:shadow-sm"
                >
                  <span>Meet The Team</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Component */}
        {currentDepartment && (
          <DepartmentModal
            isOpen={isModalOpen}
            onClose={closeModal}
            members={getTeamMembersByDepartment(currentDepartment)}
            departmentName={
              departments.find((d) => d.id === currentDepartment)?.name || ""
            }
          />
        )}
      </div>
    </section>
  );
};

export default DepartmentSection;