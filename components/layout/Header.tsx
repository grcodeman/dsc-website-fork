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
      <div className="container mx-auto rounded-full bg-white/70 backdrop-filter backdrop-blur-md border border-lavender shadow-[0_4px_16px_rgba(37,25,122,0.08)] hover:shadow-[0_4px_20px_rgba(37,25,122,0.12)] transition-all px-6 py-2.5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10">
            <Image
              src="/dsaic-logo.png"
              alt="Data Science & AI Club logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div className="font-heading font-bold text-lg tracking-[0.14em] uppercase text-ink">DSAIC @ WMU</div>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <a href="/projects" className="hover-accent transition-colors font-medium text-ink/80">Projects</a>
          <a href="/calendar" className="hover-accent transition-colors font-medium text-ink/80">Calendar</a>
          <a href="/join" className="hover-accent transition-colors font-medium text-ink/80">Join</a>
        </nav>
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center gap-2 text-ink hover:text-violet transition-colors"
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
          <div className="mx-auto rounded-2xl backdrop-blur-md bg-white/90 shadow-[0_8px_24px_rgba(37,25,122,0.12)] border border-lavender overflow-hidden">
            <nav className="flex flex-col divide-y divide-lavender/60">
              <a
                href="/projects"
                className="px-6 py-3 hover-accent hover:bg-violet/5 transition-colors font-medium text-ink/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="/calendar"
                className="px-6 py-3 hover-accent hover:bg-violet/5 transition-colors font-medium text-ink/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calendar
              </a>
              <a
                href="/join"
                className="px-6 py-3 hover-accent hover:bg-violet/5 transition-colors font-medium text-ink/80"
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
