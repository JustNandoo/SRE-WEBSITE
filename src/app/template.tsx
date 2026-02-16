import SubPreloader from "@/app/components/ui/SubPreloader"; 

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SubPreloader>
      {children}
    </SubPreloader>
  );
}