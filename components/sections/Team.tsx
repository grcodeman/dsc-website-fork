"use client";

import React from 'react';
import Image from 'next/image';
import '../styles/team-styles.css';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  initials: string;
  image?: string; // Optional profile image URL
  linkedin?: string; // Optional LinkedIn profile URL
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Cody Thornell",
    role: "President",
    initials: "CT",
    image: "/pfp/cody.webp",
    linkedin: "https://www.linkedin.com/in/codythornell/",
  },
  {
    id: 2,
    name: "Aiden Kim",
    role: "Vice President",
    initials: "AK",
    image: "/pfp/aiden.webp",
    linkedin: "https://www.linkedin.com/in/aiden-kim-531107249/",
  },
  {
    id: 3,
    name: "Michael Osei",
    role: "Research Director",
    initials: "MO",
    image: "/pfp/michael.webp",
    linkedin: "https://www.linkedin.com/in/michael-osei-1st-91714753/",
  },
  {
    id: 4,
    name: "Caden Carr",
    role: "Finance Director",
    initials: "CC",
    image: "/pfp/caden.webp",
    linkedin: "https://www.linkedin.com/in/caden-carr/",
  },
  {
    id: 5,
    name: "Rafia Authoi",
    role: "Marketing Director",
    initials: "RA",
    image: "/pfp/rafia.webp",
    linkedin: "https://www.linkedin.com/in/rafia-authoi/",
  },
  {
    id: 6,
    name: "Borsha Podder",
    role: "Event Director",
    initials: "BP",
    image: "/pfp/borsha.webp",
    linkedin: "https://www.linkedin.com/in/borsha-podder-6971502b6/",
  },
  {
    id: 7,
    name: "Santhiya Venkatesh",
    role: "Research Coordinator",
    initials: "SV",
    linkedin: "https://www.linkedin.com/in/vsanthiya/",
  },
  {
    id: 8,
    name: "Korey Colton",
    role: "Finance Planner",
    initials: "KC",
    linkedin: "https://www.linkedin.com/in/korey-colton-a284b936a/",
  },
  {
    id: 9,
    name: "Yulia Baez",
    role: "Social Coordinator",
    initials: "YB",
    image: "/pfp/yulia.webp",
    linkedin: "https://www.linkedin.com/in/yulia-ildeliza-arias-baez-a5110a308/",
  },
  {
    id: 10,
    name: "Saad Mahmud",
    role: "Event Coordinator",
    initials: "SM",
    image: "/pfp/saad.webp",
    linkedin: "https://www.linkedin.com/in/saad-mahmud-/",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-16 bg-charcoal/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          Club Eboard
        </h2>
        
        {/* Team layout with connecting lines */}
        <div className="relative mx-auto mb-16 overflow-hidden" style={{ maxWidth: '1200px' }}>
          {/* Container with horizontal scroll */}
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            {/* Connecting line - visible on larger screens */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-violet/20 via-teal/40 to-violet/20 top-16 z-0 hidden md:block" style={{ width: 'max-content', minWidth: '100%' }}></div>
            
            {/* Team members */}
            <div className="flex flex-row flex-nowrap min-w-full" style={{ width: 'max-content' }}>
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center px-4 md:px-6 flex-shrink-0" style={{ width: '180px' }}>
                {/* Avatar circle */}
                <div className="relative z-10 mb-6">
                  {member.linkedin ? (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-violet/40 to-teal/30 flex items-center justify-center border-2 border-teal/30 shadow-lg overflow-hidden transition-transform hover:scale-105">
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
                    </a>
                  ) : (
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
                  )}
                  
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
      </div>
    </section>
  );
};

export default Team;
