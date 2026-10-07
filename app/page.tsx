import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Schedule from "../components/sections/Schedule";
import Resources from "../components/sections/Resources";
import Team from "../components/sections/Team";

// Re-render hourly so the static HTML's "next session" stays current; the
// schedule components also re-check the visitor's clock after loading.
export const revalidate = 3600;

export default function Home() {
  const now = Date.now();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main>
        <Hero now={now} />
        <About />
        <Schedule now={now} />
        <Resources />
        <Team />
      </main>

      <Footer />
    </div>
  );
}
