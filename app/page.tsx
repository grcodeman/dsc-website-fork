import Image from "next/image";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import EventsTimeline from "../components/sections/EventsTimeline";
import Resources from "../components/sections/Resources";
import Team from "../components/sections/Team";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal text-offwhite">
      <Header />

      <main>
        <Hero />
        <About />
        <EventsTimeline />
        <Resources />
        <Team />
      </main>

      <Footer />
    </div>
  );
}
