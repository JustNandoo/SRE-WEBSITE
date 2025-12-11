import Home from "@/app/layouts/article/SectionHome";
import Contact from "@/app/layouts/SectionContact";
import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <Home />
        <Contact />
      </SmoothScrollProvider>
    </div>
  );
}
