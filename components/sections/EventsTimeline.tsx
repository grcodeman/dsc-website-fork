"use client";

import React from 'react';

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  color: 'teal' | 'violet';
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

const EventCard = ({ event }: { event: Event }) => {
  // Define color values - different for light and dark modes
  const colorClass = event.color === 'teal' ? 'text-emerald-600 dark:text-teal' : 'text-purple-700 dark:text-violet';
  const bgColorClass = event.color === 'teal' ? 'bg-emerald-600 dark:bg-teal' : 'bg-purple-700 dark:bg-violet';
  const bgColorClassTransparent = event.color === 'teal' ? 'bg-emerald-100 dark:bg-emerald-900/20' : 'bg-purple-100 dark:bg-purple-900/20';
  const borderColorClass = event.color === 'teal' ? 'border-emerald-300 dark:border-emerald-700/50' : 'border-purple-300 dark:border-purple-700/50';
  
  // Base style classes
  const nodeBaseClasses = "absolute left-0 w-5 h-5 rounded-full z-20 group-hover:scale-150 transition-transform duration-300 ease-out border-2 dark:border-charcoal border-white";
  const cardBaseClasses = "ml-12 bg-white/80 dark:bg-charcoal/30 rounded-lg overflow-hidden transition-all duration-300 ease-out transform origin-left group-hover:scale-105";
  const headerBaseClasses = "px-4 py-3 border-b";



  return (
    <div className="group relative mb-12 last:mb-0">
      {/* Timeline node */}
      <div className={`${nodeBaseClasses} ${bgColorClass}`}></div>
      
      {/* Card */}
      <div className={`${cardBaseClasses} border ${borderColorClass}`}>
        {/* Header with date and title */}
        <div className={`${headerBaseClasses} ${bgColorClassTransparent} ${borderColorClass}`}>
          <p className="text-sm text-gray-600 dark:text-offwhite/70">{event.date}</p>
          <h3 className={`text-xl font-heading ${colorClass}`}>{event.title}</h3>
        </div>
        
        {/* Description - hidden until hover */}
        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 ease-out">
          <p className="p-4 text-gray-700 dark:text-offwhite/80">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

const EventsTimeline = () => {
  return (
    <section id="events" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          Key Events
        </h2>
        <div className="relative max-w-2xl mx-auto pl-8">
          {/* Timeline Line */}
          <div className="absolute left-2.5 top-0 bottom-0 w-0.5 z-10 bg-gradient-to-b from-emerald-600 via-purple-700 to-emerald-600 dark:from-teal dark:via-violet dark:to-teal"></div>
          
          {/* Timeline Items */}
          <div className="relative z-20">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsTimeline;
