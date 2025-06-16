import Home from "./layouts/home/SectionHome";
import About from "./layouts/home/SectionAbout";
import Marquee from "./layouts/home/Marquee";
import News from "./layouts/home/SectionNews";
import Contact from "./layouts/home/SectionContact";

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
