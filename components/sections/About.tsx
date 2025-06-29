import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-charcoal/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-charcoal/30 p-8 rounded-lg border border-teal/20">
            <h3 className="text-xl font-heading mb-4 text-teal">Our Mission</h3>
            <p className="text-offwhite/80">Mission description placeholder text goes here.</p>
          </div>
          <div className="flex-1 bg-charcoal/30 p-8 rounded-lg border border-teal/20">
            <h3 className="text-xl font-heading mb-4 text-teal">What We Do</h3>
            <p className="text-offwhite/80">What we do placeholder text goes here.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
