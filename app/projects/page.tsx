import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Projects from "../../components/sections/Projects";

export const metadata = {
  title: "Projects | Data Science & AI Club at WMU",
  description: "Explore current projects from the Data Science & AI Club at Western Michigan University",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main>
        <div className="container mx-auto px-4 pt-12">
          <h1 className="text-4xl md:text-5xl font-heading text-ink mb-4 text-center">
            DSAIC Projects
          </h1>
          <p className="text-xl text-ink/70 max-w-3xl mx-auto text-center">
            Discover what members of the Data Science &amp; AI Club are building
          </p>
        </div>
        <Projects />
      </main>

      <Footer />
    </div>
  );
}
