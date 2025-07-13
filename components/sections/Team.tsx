"use client";

import React from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "TBA",
    role: "President",
    initials: "1",
  },
  {
    id: 2,
    name: "TBA",
    role: "Vice President",
    initials: "2",
  },
  {
    id: 3,
    name: "TBA",
    role: "Finance Director",
    initials: "3",
  },
  {
    id: 4,
    name: "TBA",
    role: "Marketing Director",
    initials: "4",
  },
  {
    id: 5,
    name: "TBA",
    role: "Event Director",
    initials: "5",
  },
  {
    id: 6,
    name: "TBA",
    role: "Research Director",
    initials: "6",
  }
];

const Team = () => {
  return (
    <section id="team" className="py-16 bg-charcoal/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          Club Officers
        </h2>
        
        {/* Team layout with connecting lines */}
        <div className="relative mx-auto mb-16" style={{ maxWidth: '900px' }}>
          {/* Connecting line */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-violet/20 via-teal/40 to-violet/20 top-16 z-0"></div>
          
          {/* Team members */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center w-32">
                {/* Avatar circle */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-violet/40 to-teal/30 flex items-center justify-center border-2 border-teal/30 shadow-lg">
                    <span className="text-xl font-heading text-offwhite">
                      {member.initials}
                    </span>
                  </div>
                  
                  {/* Connecting dot on line */}
                  <div className="absolute h-3 w-3 rounded-full bg-teal bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                {/* Name and role */}
                <h3 className="text-md font-heading text-teal text-center">{member.name}</h3>
                <p className="text-offwhite/70 text-sm text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
