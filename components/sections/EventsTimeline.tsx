"use client";

import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  color: 'violet' | 'ink';
  link?: { href: string; label: string };
};

const events: Event[] = [
  {
    id: 1,
    title: "Bronco Bash",
    date: "Tue Sep 1 2026, 3-6pm | Main Campus",
    description: "Come support us and stop by our table for free goodies and snacks!",
    color: "violet",
  },
  {
    id: 2,
    title: "Info Night",
    date: "Thu Sep 3 2026, 6:30-9pm | Parkview D-109",
    description: "Kick off the year with us! Featuring speaker Jia Chen, plus introductions to Developer Club, DSAIC, and W1 Builders.",
    color: "ink",
    link: { href: "https://experiencewmu.wmich.edu/event/12515581", label: "Event Details" },
  },
  {
    id: 3,
    title: "Company Tour",
    date: "TBA",
    description: "Currently in the works, stay tuned!",
    color: "violet",
  },
];

const EventCard = ({ event }: { event: Event }) => {
  const colorClass = event.color === 'violet' ? 'text-violet' : 'text-ink';
  const bgColorClass = event.color === 'violet' ? 'bg-violet' : 'bg-ink';
  const bgColorClassTransparent = event.color === 'violet' ? 'bg-violet/5' : 'bg-ink/5';
  const borderColorClass = event.color === 'violet' ? 'border-violet/25' : 'border-ink/25';
  const linkColorClasses = event.color === 'violet'
    ? 'text-violet border-violet/30 bg-violet/10 hover:bg-violet hover:text-white'
    : 'text-ink border-ink/30 bg-ink/10 hover:bg-ink hover:text-white';

  // Base style classes
  const nodeBaseClasses = "absolute left-0 w-5 h-5 rounded-full z-20 group-hover:scale-150 transition-transform duration-300 ease-out border-2 border-cream";
  const cardBaseClasses = "ml-12 bg-white rounded-lg overflow-hidden transition-all duration-300 ease-out transform origin-left group-hover:scale-105 shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)]";
  const headerBaseClasses = "px-4 py-3 border-b";

  return (
    <div className="group relative mb-12 last:mb-0">
      {/* Timeline node */}
      <div className={`${nodeBaseClasses} ${bgColorClass}`}></div>

      {/* Card */}
      <div className={`${cardBaseClasses} border ${borderColorClass}`}>
        {/* Header with date and title */}
        <div className={`${headerBaseClasses} ${bgColorClassTransparent} ${borderColorClass}`}>
          <p className="text-sm text-ink/70">{event.date}</p>
          <h3 className={`text-xl font-heading ${colorClass}`}>{event.title}</h3>
        </div>

        {/* Description */}
        <div className="p-4 bg-white">
          <p className="text-ink/75">{event.description}</p>
          {event.link && (
            <a
              href={event.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md border transition-all ${linkColorClasses}`}
            >
              {event.link.label}
              <FaExternalLinkAlt className="text-xs" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const EventsTimeline = () => {
  return (
    <section id="events" className="py-16 cv-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-ink">
          Schedule
        </h2>
        <div className="relative max-w-2xl mx-auto pl-8">
          {/* Timeline Line */}
          <div className="absolute left-2.5 top-0 bottom-0 w-0.5 z-10 bg-gradient-to-b from-violet via-ink to-violet"></div>

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
