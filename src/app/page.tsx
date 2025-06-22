import Home from "@/app/layouts/home/SectionHome";
import About from "@/app/layouts/home/SectionAbout";
import Marquee from "@/app/layouts/home/Marquee";
import News from "@/app/layouts/home/SectionNews";
import Contact from "@/app/layouts/SectionContact";

export default function Page() {
  return (
    <div className="relative">
      <Home />
      <About />
      <Marquee />
      <News />
      <Contact />
    </div>
  );
}
