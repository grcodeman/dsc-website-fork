"use client";

import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Canvas placeholder logic can be added here later
    // This is just a placeholder for now
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Draw a placeholder pattern
        ctx.fillStyle = 'rgba(0, 255, 195, 0.1)';
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 40 + 10;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, []);

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Canvas Placeholder - Left side on desktop */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] relative order-2 md:order-1 mt-8 md:mt-0">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full bg-charcoal/30 rounded-lg border border-teal/20"
            />
          </div>
          
          {/* Content - Right side on desktop */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2">
            <h1 className="text-4xl md:text-6xl font-heading tracking-widest mb-6 uppercase text-teal">
              Data Science Club
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mb-8">
              WMU Student Community for Data Science and AI
            </p>
            <button className="bg-teal text-charcoal font-heading px-8 py-3 rounded-md hover:bg-teal/80 transition-colors uppercase tracking-widest">
              Join Club
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
