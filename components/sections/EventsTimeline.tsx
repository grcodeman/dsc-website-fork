import React from 'react';

const EventsTimeline = () => {
  return (
    <section id="events" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          Events Timeline
        </h2>
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-teal/50"></div>
          
          {/* Timeline Items */}
          <div className="flex flex-col space-y-8">
            {/* Event 1 */}
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2 pl-12 md:pl-0 md:pr-12 relative">
                <div className="absolute left-0 md:left-auto md:right-0 rounded-full w-8 h-8 bg-teal"></div>
                <div className="md:text-right">
                  <h3 className="text-xl font-heading text-teal">Workshop Title</h3>
                  <p className="text-violet">June 15, 2025</p>
                  <p className="text-offwhite/80 mt-2">Event description placeholder.</p>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>
            
            {/* Event 2 */}
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="hidden md:block md:w-1/2"></div>
              <div className="md:w-1/2 pl-12 relative">
                <div className="absolute left-0 md:left-0 rounded-full w-8 h-8 bg-violet"></div>
                <div>
                  <h3 className="text-xl font-heading text-teal">Hackathon</h3>
                  <p className="text-violet">July 10-12, 2025</p>
                  <p className="text-offwhite/80 mt-2">Event description placeholder.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsTimeline;
