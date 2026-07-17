"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

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

      // Wireframe violet with occasional deep-indigo digits, matching the logo mark
      const isDeep = Math.random() > 0.75;
      const alpha = 0.45 + Math.random() * 0.45;
      const color = isDeep
        ? `rgba(37, 25, 122, ${alpha})`
        : `rgba(${100 + Math.floor(Math.random() * 30)}, ${55 + Math.floor(Math.random() * 25)}, ${185 + Math.floor(Math.random() * 25)}, ${alpha})`;

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
        color,
        displacement: 0
      });
    }

    // Track animation state
    let animationFrameId: number;
    let angle = 0;

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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 pt-2 pb-4">
        {/* Create a grid-like structure with two equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Torus canvas - Left side on desktop */}
          <div className="h-[40vh] md:h-[60vh] relative order-2 md:order-1 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          </div>

          {/* Content - Right side on desktop */}
          <div className="flex flex-col order-1 md:order-2 h-full justify-center md:-mt-10">
            <div className="md:text-left text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-[0.08em] mb-6 uppercase text-ink leading-tight">
                Data Science
                <br />
                &amp; AI Club
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl mb-8 text-ink/70">
                WMU&apos;s student community for data science, AI, and machine learning
              </p>
              <Link href="/join" className="bg-violet text-white font-heading px-8 py-3 rounded-md hover:bg-ink transition-colors uppercase tracking-widest font-bold shadow-[0_8px_24px_-8px_rgba(114,67,193,0.6)] transform hover:scale-105 duration-300 cursor-pointer inline-block text-center">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
