import Home from "@/app/layouts/article/SectionHome";
import Article from "@/app/layouts/article/SectionArticle";
import Contact from "@/app/layouts/article/SectionContact";

export default function Page() {
  return (
    <div className="relative">
      <Home />
      <Article />
      <Contact />
    </div>
  );
}