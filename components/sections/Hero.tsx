"use client";

import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions and handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create an array of digits (1s and 0s) that form the torus
    interface Digit {
      x: number;
      y: number;
      z: number;
      originalX: number;
      originalY: number;
      originalZ: number;
      char: string;
      size: number;
      color: string;
      displacement: number;
    }
    
    const digits: Digit[] = [];
    const torusRadius = Math.min(canvas.width, canvas.height) * 0.3; // Major radius
    const tubeRadius = torusRadius * 0.3; // Minor radius
    const totalDigits = 500; // Total number of digits to render
    
    // Create digits positioned in a torus shape
    for (let i = 0; i < totalDigits; i++) {
      // Parametric equation for a torus
      const u = Math.random() * Math.PI * 2; // Angle around the tube
      const v = Math.random() * Math.PI * 2; // Angle around the center of the torus
      
      const x = (torusRadius + tubeRadius * Math.cos(u)) * Math.cos(v);
      const y = (torusRadius + tubeRadius * Math.cos(u)) * Math.sin(v);
      const z = tubeRadius * Math.sin(u);
      
      // Add a digit at this position
      digits.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
        char: Math.random() > 0.5 ? '1' : '0',
        size: 10 + Math.random() * 8, // Size variation
        color: `rgba(0, ${200 + Math.random() * 55}, ${150 + Math.random() * 45}, ${0.6 + Math.random() * 0.4})`, // Teal variations
        displacement: 0
      });
    }
    
    // Track animation state
    let animationFrameId: number;
    let angle = 0;
    
    // No mouse hover effects
    
    // Animation function
    const animate = () => {
      angle += 0.005; // Slow rotation speed
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center of the canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Sort digits by z-index for pseudo-3D effect
      const sortedDigits = [...digits].sort((a, b) => a.z - b.z);
      
      // Draw each digit
      sortedDigits.forEach(digit => {
        // Apply a slow rotation to the torus
        const rotatedX = digit.x * Math.cos(angle) - digit.z * Math.sin(angle);
        const rotatedZ = digit.x * Math.sin(angle) + digit.z * Math.cos(angle);
        
        // Calculate display position with perspective scaling directly
        // The torus maintains its shape without any hover effects
        const perspectiveScale = 600 / (600 + rotatedZ);
        const finalX = centerX + rotatedX * perspectiveScale;
        const finalY = centerY + digit.y * perspectiveScale;
        
        // Draw the digit
        ctx.font = `${digit.size * perspectiveScale}px monospace`;
        ctx.fillStyle = digit.color;
        ctx.fillText(digit.char, finalX, finalY);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      // No mousemove event to remove
      cancelAnimationFrame(animationFrameId);
    };
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
