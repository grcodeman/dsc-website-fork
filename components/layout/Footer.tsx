import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-12 bg-charcoal/90 border-t border-violet/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-heading mb-4 text-teal tracking-widest">DSC</h3>
            <p className="text-offwhite/80">Short description about the club.</p>
          </div>
          <div>
            <h3 className="text-xl font-heading mb-4 text-teal">Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-offwhite/80 hover:text-teal transition-colors">About</a></li>
              <li><a href="#" className="text-offwhite/80 hover:text-teal transition-colors">Events</a></li>
              <li><a href="#" className="text-offwhite/80 hover:text-teal transition-colors">Resources</a></li>
              <li><a href="#" className="text-offwhite/80 hover:text-teal transition-colors">Team</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-heading mb-4 text-teal">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-offwhite hover:text-teal transition-colors">Twitter</a>
              <a href="#" className="text-offwhite hover:text-teal transition-colors">GitHub</a>
              <a href="#" className="text-offwhite hover:text-teal transition-colors">Discord</a>
            </div>
          </div>
        </div>
        <div className="border-t border-violet/10 mt-8 pt-8 text-center text-offwhite/60">
          <p>© {new Date().getFullYear()} Developer Student Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
