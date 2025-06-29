import React from 'react';

const Team = () => {
  return (
    <section id="team" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-40 h-40 rounded-full bg-teal/20 mx-auto mb-4"></div>
            <h3 className="text-xl font-heading text-teal">Name</h3>
            <p className="text-violet">Position</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-40 h-40 rounded-full bg-teal/20 mx-auto mb-4"></div>
            <h3 className="text-xl font-heading text-teal">Name</h3>
            <p className="text-violet">Position</p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-40 h-40 rounded-full bg-teal/20 mx-auto mb-4"></div>
            <h3 className="text-xl font-heading text-teal">Name</h3>
            <p className="text-violet">Position</p>
          </div>
          
          {/* Team Member 4 */}
          <div className="text-center">
            <div className="w-40 h-40 rounded-full bg-teal/20 mx-auto mb-4"></div>
            <h3 className="text-xl font-heading text-teal">Name</h3>
            <p className="text-violet">Position</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
