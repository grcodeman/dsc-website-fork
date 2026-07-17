"use client";

import React, { useRef, useState, useEffect } from 'react';
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
    name: "Saad Mahmud",
    role: "Vice President",
    initials: "SM",
    image: "/pfp/saad.webp",
    linkedin: "https://www.linkedin.com/in/saad-mahmud-/",
  },
  {
    id: 3,
    name: "Rafia Authoi",
    role: "Marketing",
    initials: "RA",
    image: "/pfp/rafia.webp",
    linkedin: "https://www.linkedin.com/in/rafia-authoi/",
  },
  {
    id: 4,
    name: "Sandy",
    role: "Projects",
    initials: "S",
  },
  {
    id: 5,
    name: "Yulia Baez",
    role: "Socials",
    initials: "YB",
    image: "/pfp/yulia.webp",
    linkedin: "https://www.linkedin.com/in/yulia-ildeliza-arias-baez-a5110a308/",
  },
];

const Team = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // Function to handle scroll left and right
  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300; // Amount to scroll in pixels
      const targetScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Function to check scroll position and update button visibility
  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Show left button if we're not at the beginning
      setShowLeftButton(container.scrollLeft > 10);
      
      // Show right button if we're not at the end
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      setShowRightButton(!isAtEnd);
    }
  };

  // Listen for scroll events to update button visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      // Initial check for button visibility
      updateScrollButtons();
      
      // Also check on window resize as this may change the scroll width
      window.addEventListener('resize', updateScrollButtons);

      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, []);

  return (
    <section id="team" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-ink">
          Club Eboard
        </h2>
        
        {/* Team layout with connecting lines */}
        <div className="relative mx-auto mb-16 overflow-hidden" style={{ maxWidth: 'fit-content' }}>
          {/* Scroll left button */}
          {showLeftButton && (
            <button 
              onClick={() => handleScroll('left')} 
              className="scroll-button scroll-left-button"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Scroll right button */}
          {showRightButton && (
            <button 
              onClick={() => handleScroll('right')} 
              className="scroll-button scroll-right-button"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h17.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Container with horizontal scroll */}
          <div ref={scrollContainerRef} className="overflow-x-auto pb-4 hide-scrollbar">
            {/* Connecting line - visible on larger screens */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-violet/20 via-ink/30 to-violet/20 top-16 z-0 hidden md:block" style={{ width: 'max-content', minWidth: '100%' }}></div>
            
            {/* Team members */}
            <div className="flex flex-row flex-nowrap min-w-full" style={{ width: 'max-content' }}>
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center px-4 md:px-6 flex-shrink-0" style={{ width: '180px' }}>
                {/* Avatar circle */}
                <div className="relative z-10 mb-3 pt-3">
                  {member.linkedin ? (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-violet/15 to-ink/10 flex items-center justify-center border-2 border-violet/30 shadow-[0_8px_24px_-12px_rgba(37,25,122,0.3)] overflow-hidden transition-transform hover:scale-105">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={`${member.name}'s profile picture`}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-xl font-heading text-ink">
                            {member.initials}
                          </span>
                        )}
                      </div>
                    </a>
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-violet/15 to-ink/10 flex items-center justify-center border-2 border-violet/30 shadow-[0_8px_24px_-12px_rgba(37,25,122,0.3)] overflow-hidden">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={`${member.name}'s profile picture`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-xl font-heading text-ink">
                          {member.initials}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Connecting dot on line - visible on larger screens */}
                  <div className="absolute h-3 w-3 rounded-full bg-violet bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 hidden md:block"></div>
                </div>
                
                {/* Name and role */}
                <h3 className="text-md font-heading text-ink text-center">
                  {member.name.split(' ')[0]}<br />
                  {member.name.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-ink/70 text-sm text-center">
                  {member.role.includes(' ') ? (
                    <>
                      {member.role.split(' ')[0]}<br />
                      {member.role.split(' ').slice(1).join(' ')}
                    </>
                  ) : member.role}
                </p>
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
