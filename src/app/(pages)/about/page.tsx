import Hero from "@/app/layouts/about/SectionHero";
import Vismis from "@/app/layouts/about/SectionVismis";
import Structure from "@/app/layouts/about/SectionStructure";
import MeetDepartment from "@/app/layouts/about/MeetDepartment";
// import PresdirSect from "@/app/layouts/about/SectionPresdir";
// import Department from "@/app/layouts/about/SectionDepartment";
import Contact from "@/app/layouts/SectionContact";

export default function Page() {
  return (
    <div className="relative">
      <Hero />
      <Vismis />
      <Structure />
      <MeetDepartment />
      {/* <PresdirSect /> */}
      {/* <Department /> */}
      <Contact />
    </div>
  );
}
