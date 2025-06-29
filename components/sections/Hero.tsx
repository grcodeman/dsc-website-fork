import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-heading tracking-widest mb-6 uppercase text-teal">
          Data Science Club
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          WMU Student Community for Data Science and AI
        </p>
        <button className="bg-teal text-charcoal font-heading px-8 py-3 rounded-md hover:bg-teal/80 transition-colors uppercase tracking-widest">
          Join Us
        </button>
      </div>
    </section>
  );
};

export default Hero;
