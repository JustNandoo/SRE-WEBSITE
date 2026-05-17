import SmoothScrollProvider from "@/app/components/SmoothScrollProvider";
import SectionHome from "@/app/layouts/merch/SectionHome";
import SectionContact from "@/app/layouts/SectionContact";

export default function Page() {
  return (
    <div className="relative">
      <SmoothScrollProvider>
        <SectionHome />
        <SectionContact />
      </SmoothScrollProvider>
    </div>
  );
}
