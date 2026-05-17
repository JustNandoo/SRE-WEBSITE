import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import Home from "@/app/layouts/announcement/SectionHome";

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <Home />
      </SmoothScrollProvider>
    </div>
  );
}
