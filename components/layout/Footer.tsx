import React from 'react';

// LED Component for social links
const LED = ({ active = false, color = 'teal', pulse = false }: { active?: boolean; color?: string; pulse?: boolean }) => {
  // Use predefined CSS classes for the LEDs
  let ledClass = active ? `led-${color}` : 'led-inactive';
  const pulseClass = pulse && active ? 'animate-pulse' : '';
  
  return <span className={`h-2 w-2 rounded-full inline-block mr-1.5 ${ledClass} ${pulseClass}`}></span>;
};

// Network Panel Link component
const NetworkLink = ({ 
  href, 
  label, 
  active = true,
  color = 'teal'
}: { 
  href: string; 
  label: string; 
  active?: boolean;
  color?: string;
}) => {
  return (
    <div className="flex items-center mb-1.5">
      <LED active={active} color={color} pulse={Math.random() > 0.7} />
      <a 
        href={href}
        className="text-xs text-offwhite/90 font-mono hover:text-teal transition-colors flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-charcoal/95 border-t border-violet/30">
      <div className="container mx-auto px-4">
        {/* Network Panel */}
        <div className="max-w-lg mx-auto bg-charcoal border border-violet/40 rounded-md p-3 shadow-md">
          <div className="flex items-center justify-between mb-2 border-b border-violet/20 pb-1">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full led-teal mr-2 animate-pulse"></div>
              <p className="text-teal text-xs font-mono">NETWORK STATUS</p>
            </div>
            <div className="text-xs text-offwhite/60 font-mono">{new Date().toISOString().split('T')[0]}</div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
            <div>
              <div className="text-offwhite/80 text-xs font-mono mb-1 border-b border-violet/20 pb-0.5">Social</div>
              <NetworkLink href="https://www.linkedin.com/company/data-science-club-wmu/" label="LinkedIn" color="blue" />
              <NetworkLink href="https://www.instagram.com/wmudatascience" label="Instagram" color="pink" />
              <NetworkLink href="#" label="Discord" color="violet" />
            </div>
            
            <div>
              <div className="text-offwhite/80 text-xs font-mono mb-1 border-b border-violet/20 pb-0.5">Development</div>
              <NetworkLink href="https://github.com/Data-Science-Club-at-WMU" label="GitHub" />
              <NetworkLink href="#" label="Projects" color="blue" />
              <NetworkLink href="mailto:wmu.datascienceclub@gmail.com" label="Contact" color="pink" />
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <div className="text-offwhite/80 text-xs font-mono mb-1 border-b border-violet/20 pb-0.5">Navigation</div>
              <div className="grid grid-cols-2 sm:block">
                <NetworkLink href="#about" label="About" />
                <NetworkLink href="#events" label="Events" />
                <NetworkLink href="#resources" label="Resources" />
                <NetworkLink href="#team" label="Team" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-violet/20 mt-3 pt-2 text-center text-offwhite/50 text-xs font-mono">
            <p>© {new Date().getFullYear()} Data Science Club at WMU</p>
            <div className="text-[10px] mt-0.5 flex items-center justify-center">
              <span className="mr-1">System Status:</span>
              <LED active={true} pulse={true} />
              <span className="text-teal/80">Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
