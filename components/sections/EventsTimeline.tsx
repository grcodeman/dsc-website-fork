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
    title: "Intro to Data Science Workshop",
    date: "September 15, 2025",
    description: "Learn the fundamentals of data science with hands-on exercises using Python and Pandas.",
    color: "teal",
  },
  {
    id: 2,
    title: "AI Ethics Panel Discussion",
    date: "October 5, 2025",
    description: "Join industry experts for a discussion on the ethical considerations in AI development and implementation.",
    color: "violet",
  },
  {
    id: 3,
    title: "Data Visualization Showcase",
    date: "November 12, 2025",
    description: "Present your data stories through powerful visualizations using tools like D3.js, Tableau, or Python libraries.",
    color: "teal",
  },
  {
    id: 4,
    title: "Machine Learning Hackathon",
    date: "January 20-22, 2026",
    description: "A 48-hour competition to build and train models that solve real-world problems with provided datasets.",
    color: "violet",
  },
];

const EventCard = ({ event }: { event: Event }) => {
  // Helper functions to assign correct classes based on color
  const getNodeClasses = () => {
    const baseClasses = "absolute left-0 w-5 h-5 rounded-full z-20 group-hover:scale-150 transition-transform duration-300 ease-out border-2 border-charcoal";
    return `${baseClasses} ${event.color === 'teal' ? 'bg-teal' : 'bg-violet'}`;
  };
  
  const getCardClasses = () => {
    const baseClasses = "ml-12 bg-charcoal/30 rounded-lg overflow-hidden transition-all duration-300 ease-out transform origin-left group-hover:scale-105";
    
    if (event.color === 'teal') {
      return `${baseClasses} border border-teal/30 group-hover:border-teal group-hover:shadow-lg group-hover:shadow-teal/10`;
    } else {
      return `${baseClasses} border border-violet/30 group-hover:border-violet group-hover:shadow-lg group-hover:shadow-violet/10`;
    }
  };
  
  const getHeaderClasses = () => {
    const baseClasses = "px-4 py-3 border-b";
    
    if (event.color === 'teal') {
      return `${baseClasses} bg-teal/10 border-teal/20`;
    } else {
      return `${baseClasses} bg-violet/10 border-violet/20`;
    }
  };

  return (
    <div className="group relative mb-12 last:mb-0">
      {/* Timeline node */}
      <div className={getNodeClasses()}></div>
      
      {/* Card */}
      <div className={getCardClasses()}>
        {/* Header with date and title */}
        <div className={getHeaderClasses()}>
          <p className="text-sm text-offwhite/70">{event.date}</p>
          <h3 className="text-xl font-heading text-teal">{event.title}</h3>
        </div>
        
        {/* Description - hidden until hover */}
        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 ease-out">
          <p className="p-4 text-offwhite/80">{event.description}</p>
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
          Events Timeline
        </h2>
        <div className="relative max-w-2xl mx-auto pl-8">
          {/* Timeline Line */}
          <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal via-violet to-teal z-10"></div>
          
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
