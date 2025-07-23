"use client";

import React from 'react';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  initials: string;
  image?: string; // Optional profile image URL
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Cody Thornell",
    role: "President",
    initials: "CT",
    image: "/pfp/cody.webp",
  },
  {
    id: 2,
    name: "Aiden Kim",
    role: "Vice President",
    initials: "AK",
    image: "/pfp/aiden.webp",
  },
  {
    id: 3,
    name: "Caden Carr",
    role: "Finance Director",
    initials: "CC",
  },
  {
    id: 4,
    name: "Rafia Authoi",
    role: "Marketing Director",
    initials: "RA",
  },
  {
    id: 5,
    name: "Michael Osei",
    role: "Research Director",
    initials: "MO",
  },
  {
    id: 6,
    name: "TBA",
    role: "Event Director",
    initials: "x",
  }
];

const Team = () => {
  return (
    <section id="team" className="py-16 bg-charcoal/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          Club Eboard
        </h2>
        
        {/* Team layout with connecting lines */}
        <div className="relative mx-auto mb-16" style={{ maxWidth: '1200px' }}>
          {/* Connecting line - visible on larger screens */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-violet/20 via-teal/40 to-violet/20 top-16 z-0 hidden md:block"></div>
          
          {/* Team members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-4 lg:gap-2 xl:gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                {/* Avatar circle */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-violet/40 to-teal/30 flex items-center justify-center border-2 border-teal/30 shadow-lg overflow-hidden">
                    {member.image ? (
                      <Image 
                        src={member.image}
                        alt={`${member.name}'s profile picture`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-xl font-heading text-offwhite">
                        {member.initials}
                      </span>
                    )}
                  </div>
                  
                  {/* Connecting dot on line - visible on larger screens */}
                  <div className="absolute h-3 w-3 rounded-full bg-teal bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 hidden md:block"></div>
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
