import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Projects from "../../components/sections/Projects";

export const metadata = {
  title: "Projects | Data Science Club at WMU",
  description: "Explore current projects from the Data Science Club at Western Michigan University",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal text-offwhite">
      <Header />

      <main>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-heading text-teal mb-4 text-center">
            DSC Projects
          </h1>
          <p className="text-xl text-offwhite/80 max-w-3xl mx-auto text-center mb-12">
            Discover the exciting research projects our members are working on
          </p>
        </div>
        <Projects />
      </main>

      <Footer />
    </div>
  );
}
