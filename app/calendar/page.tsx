import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CalendarSchedule from "@/components/sections/CalendarSchedule";
import { BUILD_SESSION } from "@/lib/events";
import { SESSION_PLACE, SESSION_TIME } from "@/lib/schedule";

const DESCRIPTION = `Data Science & AI Club build sessions every ${BUILD_SESSION.weekday}, ${SESSION_TIME}, in the WMU ${SESSION_PLACE}, plus upcoming club events.`;

export const metadata: Metadata = {
  // The root layout's title template appends the club name.
  title: "Calendar",
  description: DESCRIPTION,
  alternates: { canonical: "/calendar" },
};

// Re-render hourly so the static HTML marks past and next sessions correctly;
// the schedule also re-checks the visitor's clock after loading.
export const revalidate = 3600;

const CalendarPage = () => {
  const now = Date.now();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading text-ink mt-0! mb-4!">Club Calendar</h1>
          <p className="max-w-2xl text-lg text-ink/70">
            We build together every {BUILD_SESSION.weekday}. Special events like company tours are
            posted here once they&apos;re scheduled. For the latest updates, check our Microsoft Teams.
          </p>

          <CalendarSchedule initialNow={now} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalendarPage;
