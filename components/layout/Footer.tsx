import React from 'react';

// Circuit Component for a section of traces
const CircuitTrace = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main traces */}
    <path d="M10,50 H80 V120 H150 V50 H220 V180" stroke="#4CAF50" strokeWidth="2" />
    <path d="M100,10 V60 H170 V140 H240 V100" stroke="#4CAF50" strokeWidth="2" />
    <path d="M50,80 H100 V170 H200" stroke="#4CAF50" strokeWidth="2" />
    
    {/* Connection points/vias */}
    <circle cx="80" cy="50" r="3" fill="#8bc34a" />
    <circle cx="150" cy="120" r="3" fill="#8bc34a" />
    <circle cx="170" cy="60" r="3" fill="#8bc34a" />
    <circle cx="100" cy="80" r="3" fill="#8bc34a" />
    <circle cx="100" cy="170" r="3" fill="#8bc34a" />
    
    {/* Component pads */}
    <rect x="75" y="45" width="10" height="10" rx="1" fill="#8bc34a" />
    <rect x="145" y="115" width="10" height="10" rx="1" fill="#8bc34a" />
    <rect x="165" y="55" width="10" height="10" rx="1" fill="#8bc34a" />
    <rect x="95" y="75" width="10" height="10" rx="1" fill="#8bc34a" />
    <rect x="95" y="165" width="10" height="10" rx="1" fill="#8bc34a" />
    
    {/* Thin connecting traces */}
    <path d="M20,30 H60 V70 M120,20 V40 M200,60 H250 V100 M30,150 H70 V180 M180,130 H220 V160" 
          stroke="#4CAF50" strokeWidth="1" />
          
    {/* IC chip outlines */}
    <rect x="30" y="90" width="30" height="40" rx="2" stroke="#4CAF50" strokeWidth="1" fill="#1B5E20" />
    <rect x="190" y="30" width="40" height="20" rx="2" stroke="#4CAF50" strokeWidth="1" fill="#1B5E20" />
    
    {/* IC pins */}
    <path d="M35,90 V85 M40,90 V85 M45,90 V85 M50,90 V85 M55,90 V85" stroke="#8bc34a" strokeWidth="1" />
    <path d="M35,130 V135 M40,130 V135 M45,130 V135 M50,130 V135 M55,130 V135" stroke="#8bc34a" strokeWidth="1" />
    
    {/* Small components */}
    <circle cx="210" cy="120" r="5" stroke="#4CAF50" strokeWidth="1" fill="#388E3C" />
    <circle cx="80" cy="160" r="5" stroke="#4CAF50" strokeWidth="1" fill="#388E3C" />
    <rect x="140" y="20" width="10" height="15" rx="1" stroke="#4CAF50" strokeWidth="1" fill="#388E3C" />
  </svg>
);

// LED Component for social links
const LED = ({ active = false, color = 'teal', pulse = false }: { active?: boolean; color?: string; pulse?: boolean }) => {
  // Use predefined CSS classes for the LEDs
  const ledClass = active ? `led-${color}` : 'led-inactive';
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
  // Get the LED color - this stays the same
  const ledColor = color;
  
  // Check if the link is external (starts with http or mailto:)
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  
  return (
    <div className="flex items-center mb-1.5 relative z-20">
      <LED active={active} color={ledColor} pulse={Math.random() > 0.7} />
      <a 
        href={href}
        className="text-xs font-mono flex items-center hover-teal-custom"
        style={{ color: '#E5E5E5' }}
        {...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer"
        })}
      >
        {label}
      </a>
    </div>
  );
};

// Capacitor Component
const Capacitor = ({ className = '', rotate = 0 }: { className?: string, rotate?: number }) => (
  <svg className={className} style={{ transform: `rotate(${rotate}deg)` }} viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="0" x2="10" y2="15" stroke="#4CAF50" strokeWidth="2" />
    <rect x="0" y="15" width="20" height="4" fill="#8bc34a" />
    <rect x="0" y="21" width="20" height="4" fill="#8bc34a" />
    <line x1="10" y1="25" x2="10" y2="40" stroke="#4CAF50" strokeWidth="2" />
  </svg>
);

// Resistor Component
const Resistor = ({ className = '', rotate = 0 }: { className?: string, rotate?: number }) => (
  <svg className={className} style={{ transform: `rotate(${rotate}deg)` }} viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="10" x2="10" y2="10" stroke="#4CAF50" strokeWidth="2" />
    <rect x="10" y="5" width="40" height="10" fill="#1B5E20" stroke="#4CAF50" strokeWidth="1" />
    <line x1="50" y1="10" x2="60" y2="10" stroke="#4CAF50" strokeWidth="2" />
  </svg>
);

// IC Chip Component
const ICChip = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="15" width="40" height="40" rx="2" fill="#1B5E20" stroke="#4CAF50" strokeWidth="1" />
    
    {/* Pins */}
    <line x1="10" y1="15" x2="10" y2="5" stroke="#8bc34a" strokeWidth="1" />
    <line x1="15" y1="15" x2="15" y2="5" stroke="#8bc34a" strokeWidth="1" />
    <line x1="20" y1="15" x2="20" y2="5" stroke="#8bc34a" strokeWidth="1" />
    <line x1="25" y1="15" x2="25" y2="5" stroke="#8bc34a" strokeWidth="1" />
    <line x1="30" y1="15" x2="30" y2="5" stroke="#8bc34a" strokeWidth="1" />
    <line x1="35" y1="15" x2="35" y2="5" stroke="#8bc34a" strokeWidth="1" />
    <line x1="40" y1="15" x2="40" y2="5" stroke="#8bc34a" strokeWidth="1" />
    
    <line x1="10" y1="55" x2="10" y2="65" stroke="#8bc34a" strokeWidth="1" />
    <line x1="15" y1="55" x2="15" y2="65" stroke="#8bc34a" strokeWidth="1" />
    <line x1="20" y1="55" x2="20" y2="65" stroke="#8bc34a" strokeWidth="1" />
    <line x1="25" y1="55" x2="25" y2="65" stroke="#8bc34a" strokeWidth="1" />
    <line x1="30" y1="55" x2="30" y2="65" stroke="#8bc34a" strokeWidth="1" />
    <line x1="35" y1="55" x2="35" y2="65" stroke="#8bc34a" strokeWidth="1" />
    <line x1="40" y1="55" x2="40" y2="65" stroke="#8bc34a" strokeWidth="1" />
    
    {/* Circle indicator */}
    <circle cx="10" cy="20" r="2" fill="#8bc34a" />
    
    {/* Text */}
    <text x="25" y="35" textAnchor="middle" fill="#8bc34a" fontSize="8" fontFamily="monospace">DSC</text>
  </svg>
);

const Footer = () => {
  return (
    <footer className="mt-auto py-6 relative overflow-hidden" style={{ backgroundColor: '#0a1c0a', color: '#E5E5E5' }}>
      {/* Circuit Board Background - Main green PCB */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#0d280d', opacity: 0.7 }}>
        {/* Background grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, #4CAF5030 1px, transparent 1px), linear-gradient(to bottom, #4CAF5030 1px, transparent 1px)', 
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Circuit Traces - Large Circuit in background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <CircuitTrace className="absolute top-0 left-0 w-full h-full" />
        <CircuitTrace className="absolute top-0 right-0 w-2/3 h-2/3 rotate-90" />
        <CircuitTrace className="absolute bottom-0 left-0 w-3/4 h-3/4 -rotate-90" />
      </div>
      
      {/* Electronic Components */}
      <div className="absolute top-4 left-10">
        <Capacitor className="w-5 h-10" />
      </div>
      <div className="absolute top-16 right-20">
        <Resistor className="w-12 h-4" rotate={45} />
      </div>
      <div className="absolute bottom-12 left-1/4">
        <ICChip className="w-12 h-16" />
      </div>
      <div className="absolute top-20 right-1/3">
        <ICChip className="w-8 h-12" />
      </div>
      <div className="absolute bottom-8 right-1/4">
        <Capacitor className="w-4 h-8" rotate={90} />
      </div>
      
      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Network Panel */}
        <div className="max-w-lg mx-auto bg-charcoal/10 backdrop-filter backdrop-blur-md p-3 rounded-md shadow-[0_4px_16px_rgba(31,38,135,0.12)] hover:shadow-[0_4px_20px_rgba(31,38,135,0.2)] transition-all border border-green-500/30 relative overflow-hidden">
          {/* Inner Circuit Elements - more subtle for glassmorphism */}
          <div className="absolute inset-0 opacity-15 z-0" style={{ 
            backgroundImage: 'linear-gradient(to right, #4CAF5010 1px, transparent 1px), linear-gradient(to bottom, #4CAF5010 1px, transparent 1px)', 
            backgroundSize: '10px 10px'
          }}></div>
          
          {/* Inner PCB Traces - more subtle for glassmorphism */}
          <div className="absolute inset-0 opacity-20 z-0">
            <svg className="w-full h-full" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 H200" stroke="#4CAF50" strokeWidth="0.8" />
              <path d="M50,0 V100" stroke="#4CAF50" strokeWidth="0.8" />
              <path d="M100,0 V100" stroke="#4CAF50" strokeWidth="0.8" />
              <path d="M150,0 V100" stroke="#4CAF50" strokeWidth="0.8" />
              
              <circle cx="50" cy="50" r="3" fill="#8bc34a" />
              <circle cx="100" cy="50" r="3" fill="#8bc34a" />
              <circle cx="150" cy="50" r="3" fill="#8bc34a" />
              
              <path d="M50,50 H100" stroke="#4CAF50" strokeWidth="1.5" />
              <path d="M100,50 H150" stroke="#4CAF50" strokeWidth="1.5" />
              
              {/* Small components */}
              <rect x="70" y="20" width="10" height="15" rx="1" stroke="#4CAF50" strokeWidth="1" fill="#1B5E20" opacity="0.6" />
              <rect x="120" y="70" width="15" height="10" rx="1" stroke="#4CAF50" strokeWidth="1" fill="#1B5E20" opacity="0.6" />
            </svg>
          </div>
          
          {/* Glassmorphism gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent z-0"></div>
          <div className="flex items-center justify-between mb-2 border-b border-green-500/20 pb-1 relative z-10">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full led-teal mr-2 animate-pulse"></div>
              <p className="text-xs font-mono" style={{ color: '#00FFC3' }}>CLUB STATUS</p>
            </div>
            <div className="text-xs font-mono" style={{ color: '#E5E5E5' }}>{new Date().toISOString().split('T')[0]}</div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 relative z-20">
            <div>
              <div className="text-xs font-mono mb-1 border-b border-green-500/20 pb-0.5" style={{ color: '#E5E5E5' }}>Social</div>
              <NetworkLink href="https://www.linkedin.com/company/data-science-club-wmu/" label="LinkedIn" color="blue" />
              <NetworkLink href="https://www.instagram.com/wmudatascience" label="Instagram" color="pink" />
              <NetworkLink href="https://experiencewmu.wmich.edu/organization/datascienceclub" label="ExperienceWMU" color="brown" />
            </div>
            
            <div>
              <div className="text-xs font-mono mb-1 border-b border-green-500/20 pb-0.5" style={{ color: '#E5E5E5' }}>Development</div>
              <NetworkLink href="https://github.com/Data-Science-Club-at-WMU" label="GitHub" />
              <NetworkLink href="#" label="Projects" color="blue" />
              <NetworkLink href="mailto:cmd1231@wmich.edu" label="Contact" color="orange" />
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <div className="text-xs font-mono mb-1 border-b border-green-500/20 pb-0.5" style={{ color: '#E5E5E5' }}>Navigation</div>
              <div className="grid grid-cols-2 sm:block">
                <NetworkLink href="/" label="Home" />
                <NetworkLink href="/projects" label="Projects" />
                <NetworkLink href="/calendar" label="Calendar" />
                <NetworkLink href="/join" label="Join" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-500/30 mt-3 pt-2 text-center text-xs font-mono relative z-10" style={{ color: '#E5E5E5' }}>
            <p>© {new Date().getFullYear()} Data Science Club at WMU</p>
            <div className="text-[10px] mt-0.5 flex items-center justify-center">
              <span className="mr-1" style={{ color: '#E5E5E5' }}>System Status:</span>
              <LED active={true} pulse={true} />
              <span style={{ color: '#00FFC3' }}>Online</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Circuit Connection Points - glowing solder joints */}
      <div className="absolute w-2 h-2 rounded-full bg-green-400/80 top-5 left-1/4 animate-ping" style={{ animationDuration: '3s' }}></div>
      <div className="absolute w-1.5 h-1.5 rounded-full bg-green-400/80 bottom-10 right-1/3 animate-ping" style={{ animationDuration: '2.5s' }}></div>
      <div className="absolute w-1 h-1 rounded-full bg-green-400/80 top-1/2 right-1/4 animate-ping" style={{ animationDuration: '4s' }}></div>
      <div className="absolute w-1.5 h-1.5 rounded-full bg-green-400/80 top-1/3 right-10 animate-ping" style={{ animationDuration: '3.2s' }}></div>
      <div className="absolute w-1 h-1 rounded-full bg-green-400/80 bottom-1/4 left-20 animate-ping" style={{ animationDuration: '4.5s' }}></div>
      

    </footer>
  );
};

export default Footer;
