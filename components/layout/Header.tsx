import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full px-4 py-3">
      <div className="max-w-screen-2xl mx-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg px-6 py-3 flex justify-between items-center">
        <div className="font-heading text-xl tracking-widest text-teal">DSC @ WMU</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#projects" className="hover:text-teal transition-colors">Projects</a>
          <a href="#calendar" className="hover:text-teal transition-colors">Calendar</a>
          <a href="#join" className="hover:text-teal transition-colors">Join</a>
        </nav>
        <button className="md:hidden text-offwhite">Menu</button>
      </div>
    </header>
  );
};

export default Header;
