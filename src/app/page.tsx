import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import SectionHome from "@/app/layouts/home/SectionHome";
import SectionAbout from "@/app/layouts/home/SectionAbout";
import MarqueeContact from "./layouts/home/Marquee";
import SectionNews from "@/app/layouts/home/SectionNews";
import SectionContact from "@/app/layouts/SectionContact";

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <SectionHome />
        <SectionAbout />
        <MarqueeContact />
        <SectionNews />
        <SectionContact />
      </SmoothScrollProvider>
    </div>
  );
}
