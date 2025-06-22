import Hero from "@/app/layouts/about/Hero";
import Vismis from "@/app/layouts/about/VismisSect";
import Structure from "@/app/layouts/about/StructureSect";
import PresdirSect from "@/app/layouts/about/PresdirSection";
import Department from "@/app/layouts/about/DepartmentSection";
import Contact from "@/app/layouts/SectionContact";

export default function Page() {
  return (
    <div className="relative">
      <Hero />
      <Vismis />
      <Structure />
      <PresdirSect />
      <Department />
      <Contact />
    </div>
  );
}
