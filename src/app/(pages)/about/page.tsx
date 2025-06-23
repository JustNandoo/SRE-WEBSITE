import Hero from "@/app/layouts/about/SectionHero";
import Vismis from "@/app/layouts/about/SectionVismis";
import Structure from "@/app/layouts/about/SectionStructure";
import MeetDepartment from "@/app/layouts/about/SectionLeaders";
import Contact from "@/app/layouts/SectionContact";

export default function Page() {
  return (
    <div className="relative">
      <Hero />
      <Vismis />
      <Structure />
      <MeetDepartment />
      <Contact />
    </div>
  );
}
