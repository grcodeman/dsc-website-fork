"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  color: "teal" | "violet";
};

const events: Event[] = [
  {
    id: 1,
    title: "Data Kickoff Fall 2025",
    date: "TBA",
    description: "Kicking off the semester with an info session! Students can join projects and meet other members.",
    color: "teal",
  },
  {
    id: 2,
    title: "Company Tour",
    date: "TBA",
    description: "Currently in the works, stay tuned!",
    color: "violet",
  },
  {
    id: 3,
    title: "Data Kickoff Spring 2026",
    date: "TBA",
    description: "Kicking off the semester with an info session! Students can join projects and meet other members.",
    color: "teal",
  },
  {
    id: 4,
    title: "Stryker Company Tour",
    date: "TBA",
    description: "Visiting Stryker to learn about their industry usage of data science and ai.",
    color: "violet",
  },
];

const CalendarPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading text-teal mb-8">Club Calendar</h1>
          
          <div className="bg-white/5 backdrop-filter backdrop-blur-md rounded-xl shadow-lg border border-white/10 p-4 mb-8">
              <p className="text-offwhite mb-6">
                Stay updated with all our upcoming events, meetings, and workshops.
                View the full calendar below to plan your participation.
              </p>
            
            {/* Google Calendar Embed Placeholder */}
            <div className="relative w-full rounded-lg overflow-hidden">
              {/* Aspect ratio container for responsive iframe */}
              <div className="aspect-w-16 aspect-h-9 bg-violet/10">
                {/* Google Calendar placeholder - replace with actual embed code */}
                <div className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-teal/30 rounded-lg p-6">
                  <div className="text-teal text-5xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <h3 className="text-teal text-xl font-heading mb-2">Google Calendar</h3>
                  <p className="text-center text-offwhite/80">
                    Replace this placeholder with your Google Calendar embed code.
                  </p>
                  <div className="mt-4 text-sm text-offwhite/60">
                    {/* Instructions for embedding Google Calendar */}
                    <p>To embed your Google Calendar:</p>
                    <ol className="list-decimal list-inside mt-2">
                      <li>Go to your Google Calendar</li>
                      <li>Click on Settings (gear icon) &rarr; Settings</li>
                      <li>Select your calendar from the left sidebar</li>
                      <li>Scroll to &quot;Integrate calendar&quot; section</li>
                      <li>Copy the iframe code from &quot;Embed code&quot;</li>
                      <li>Replace this placeholder with that code</li>
                    </ol>
                  </div>
                </div>
                
                {/* Uncomment and replace with actual Google Calendar embed
                <iframe 
                  src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=YOUR_TIMEZONE" 
                  style={{ border: 0 }} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no"
                  title="DSC Calendar"
                ></iframe>
                */}
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-filter backdrop-blur-md rounded-xl shadow-lg border border-white/10 p-6">
            <h2 className="text-2xl font-heading text-teal mb-4">Upcoming Events</h2>
              <p className="text-offwhite mb-6">
                Here are our key upcoming events. Check the calendar for full details and more events.
              </p>
            
            {/* Event Timeline */}
            <div className="relative pl-8 space-y-12">
              {/* Timeline Line */}
              <div className="absolute left-2.5 top-0 bottom-0 w-0.5 z-10" style={{
                background: "linear-gradient(to bottom, #00FFC3, #B200FF, #00FFC3)"
              }}></div>
              
              {/* Event Items */}
              {events.map((event) => {
                const colorValue = event.color === "teal" ? "#00FFC3" : "#B200FF";
                const colorValueTransparent = event.color === "teal" ? "rgba(0, 255, 195, 0.1)" : "rgba(178, 0, 255, 0.1)";
                const colorValueBorder = event.color === "teal" ? "rgba(0, 255, 195, 0.3)" : "rgba(178, 0, 255, 0.3)";
                
                return (
                  <div key={event.id} className="group relative mb-12 last:mb-0">
                    {/* Timeline node */}
                    <div 
                      className="absolute left-0 w-5 h-5 rounded-full z-20 group-hover:scale-150 transition-transform duration-300 ease-out border-2 border-charcoal"
                      style={{ backgroundColor: colorValue }}
                    ></div>
                    
                    {/* Card */}
                    <div 
                      className="ml-12 bg-charcoal/30 rounded-lg overflow-hidden transition-all duration-300 ease-out transform origin-left group-hover:scale-105 border"
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
                        <p className="text-sm text-offwhite/70">{event.date}</p>
                        <h3 
                          className="text-xl font-heading" 
                          style={{ color: colorValue }}
                        >
                          {event.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <div className="p-4">
                        <p className="text-offwhite/80">{event.description}</p>
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
