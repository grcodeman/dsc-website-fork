import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Calendar | Data Science & AI Club at WMU",
  description: "Upcoming events from the Data Science & AI Club at Western Michigan University",
};

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  color: "violet" | "ink";
};

const events: Event[] = [
  {
    id: 1,
    title: "Bronco Bash",
    date: "Tue Sep 1 2026, 3:00-6:00pm | Main Campus",
    description: "Come support us and stop by our table for free goodies and snacks!",
    color: "violet",
  },
  {
    id: 2,
    title: "Info Night",
    date: "Wed Sep 2 2026, 6:30-9:00pm | Parkview Campus, Room D-109",
    description: "Kick off the year with us! Featuring speaker Jia Chen, plus introductions to Developer Club, DSAIC, and W1 Builders. Hosted in collaboration with Developer Club and W1 Builders.",
    color: "ink",
  },
  {
    id: 3,
    title: "Company Tour",
    date: "TBA",
    description: "Currently in the works, stay tuned!",
    color: "violet",
  },
  {
    id: 4,
    title: "Stryker Company Tour",
    date: "Spring | TBA",
    description: "Visiting Stryker to learn about their industry usage of data science and AI.",
    color: "ink",
  },
];

const CalendarPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading text-ink mb-8">Club Calendar</h1>

          <div className="bg-white rounded-xl shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)] border border-lavender p-6">
            <h2 className="text-2xl font-heading text-ink mb-4 mt-0">Upcoming Events</h2>
            <p className="text-ink/70 mb-6">
              Here are our key upcoming events. Follow us on social media and join our
              Microsoft Teams for the latest updates and details.
            </p>

            {/* Event Timeline */}
            <div className="relative pl-8 space-y-12">
              {/* Timeline Line */}
              <div className="absolute left-2.5 top-0 bottom-0 w-0.5 z-10" style={{
                background: "linear-gradient(to bottom, #7243C1, #25197A, #7243C1)"
              }}></div>

              {/* Event Items */}
              {events.map((event) => {
                const colorValue = event.color === "violet" ? "#7243C1" : "#25197A";
                const colorValueTransparent = event.color === "violet" ? "rgba(114, 67, 193, 0.06)" : "rgba(37, 25, 122, 0.05)";
                const colorValueBorder = event.color === "violet" ? "rgba(114, 67, 193, 0.3)" : "rgba(37, 25, 122, 0.3)";

                return (
                  <div key={event.id} className="group relative mb-12 last:mb-0">
                    {/* Timeline node */}
                    <div
                      className="absolute left-0 w-5 h-5 rounded-full z-20 group-hover:scale-150 transition-transform duration-300 ease-out border-2 border-white"
                      style={{ backgroundColor: colorValue }}
                    ></div>

                    {/* Card */}
                    <div
                      className="ml-12 bg-white rounded-lg overflow-hidden transition-all duration-300 ease-out transform origin-left group-hover:scale-105 border shadow-[0_4px_16px_-8px_rgba(37,25,122,0.15)]"
                      style={{ borderColor: colorValueBorder }}
                    >
                      {/* Header with date and title */}
                      <div
                        className="px-4 py-3 border-b"
                        style={{
                          backgroundColor: colorValueTransparent,
                          borderColor: colorValueBorder,
                        }}
                      >
                        <p className="text-sm text-ink/60">{event.date}</p>
                        <h3
                          className="text-xl font-heading"
                          style={{ color: colorValue }}
                        >
                          {event.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <div className="p-4">
                        <p className="text-ink/75">{event.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalendarPage;
