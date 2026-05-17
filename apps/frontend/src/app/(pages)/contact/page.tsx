import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import Contact from "@/app/layouts/SectionContact";
import SectionHome from "@/app/layouts/contact/SectionHome";

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <SectionHome />
        <Contact />
      </SmoothScrollProvider>
    </div>
  );
}
