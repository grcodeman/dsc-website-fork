import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full py-3 isolate">
      <div className="container mx-auto rounded-full bg-white/3 bg-charcoal/10 backdrop-filter backdrop-blur-md before:absolute before:inset-0 before:-z-10 shadow-[0_4px_16px_rgba(31,38,135,0.12)] hover:shadow-[0_4px_20px_rgba(31,38,135,0.2)] transition-all px-6 py-3 flex justify-between items-center bg-gradient-to-r from-transparent via-violet/5 to-transparent">
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
