"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full py-3 isolate">
      <div className="container mx-auto rounded-full bg-white/3 bg-charcoal/10 backdrop-filter backdrop-blur-md before:absolute before:inset-0 before:-z-10 shadow-[0_4px_16px_rgba(31,38,135,0.12)] hover:shadow-[0_4px_20px_rgba(31,38,135,0.2)] transition-all px-6 py-3 flex justify-between items-center bg-gradient-to-r from-transparent via-violet/5 to-transparent">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative w-8 h-8 overflow-hidden rounded-full border border-violet/30">
            <Image 
              src="/dsc_logo.jpeg" 
              alt="DSC Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="font-heading text-xl tracking-widest text-teal">DSC @ WMU</div>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <a href="/projects" className="hover:text-teal transition-colors">Projects</a>
          <a href="/calendar" className="hover:text-teal transition-colors">Calendar</a>
          <a href="/join" className="hover:text-teal transition-colors">Join</a>
        </nav>
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden flex items-center gap-2 text-offwhite hover:text-teal transition-colors"
          aria-label="Toggle mobile menu"
        >
          <span>Menu</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full inset-x-0 px-6 pt-2 pb-4 z-50">
          {/* Invisible overlay to capture clicks outside menu */}
          <div 
            className="fixed inset-0 -z-10" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          
          {/* Menu container with blur effect */}
          <div className="mx-auto rounded-2xl backdrop-blur-md bg-white/10 shadow-lg border border-white/20 overflow-hidden">
            <nav className="flex flex-col divide-y divide-white/5">
              <a 
                href="/projects" 
                className="px-6 py-3 text-offwhite hover:text-teal hover:bg-violet/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#calendar" 
                className="px-6 py-3 text-offwhite hover:text-teal hover:bg-violet/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calendar
              </a>
              <a 
                href="#join" 
                className="px-6 py-3 text-offwhite hover:text-teal hover:bg-violet/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
