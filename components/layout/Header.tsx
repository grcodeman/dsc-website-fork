import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-charcoal/90 backdrop-blur-sm border-b border-violet/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-heading text-xl tracking-widest text-teal">DSC</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className="hover:text-teal transition-colors">About</a>
          <a href="#events" className="hover:text-teal transition-colors">Events</a>
          <a href="#resources" className="hover:text-teal transition-colors">Resources</a>
          <a href="#team" className="hover:text-teal transition-colors">Team</a>
        </nav>
        <button className="md:hidden text-offwhite">Menu</button>
      </div>
    </header>
  );
};

export default Header;
