"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import NextSessionCard from '../cards/NextSessionCard';

const Hero = ({ now }: { now: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Each digit is drawn once into an offscreen sprite sheet, at the largest
    // size it can appear, so every frame only copies and scales bitmaps. The
    // old loop set a font and color string per digit per frame (1,000 parses
    // every frame), which kept the main thread busy on phones.
    const TOTAL_DIGITS = 500;
    const MAX_SIZE = 18; // digits are 10-18px
    const SPRITE_SCALE = 1.6; // the biggest perspective scale on phones and laptops
    const CELL = Math.ceil(MAX_SIZE * SPRITE_SCALE * 1.3);
    const COLUMNS = 25;
    const PAD = 4; // glyph origin inside its cell
    const BASELINE = Math.round(CELL * 0.8);
    const SPEED = 0.3; // radians per second

    const sheet = document.createElement('canvas');
    sheet.width = COLUMNS * CELL;
    sheet.height = Math.ceil(TOTAL_DIGITS / COLUMNS) * CELL;
    const sheetCtx = sheet.getContext('2d');
    if (!sheetCtx) return;

    let angle = 0;
    let ready = false;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (ready) draw();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Digits (1s and 0s) scattered over a torus
    const torusRadius = Math.min(canvas.width, canvas.height) * 0.3; // Major radius
    const tubeRadius = torusRadius * 0.3; // Minor radius
    const digits: { x: number; y: number; z: number; sx: number; sy: number; scale: number }[] = [];
    // Every glyph is drawn at the largest digit size (one font parse total);
    // smaller digits are scaled down when placed.
    sheetCtx.font = `${MAX_SIZE * SPRITE_SCALE}px monospace`;

    for (let i = 0; i < TOTAL_DIGITS; i++) {
      // Parametric equation for a torus
      const u = Math.random() * Math.PI * 2; // Angle around the tube
      const v = Math.random() * Math.PI * 2; // Angle around the center of the torus

      // Wireframe violet with occasional deep-indigo digits, matching the logo mark
      const isDeep = Math.random() > 0.75;
      const alpha = 0.45 + Math.random() * 0.45;
      const color = isDeep
        ? `rgba(37, 25, 122, ${alpha})`
        : `rgba(${100 + Math.floor(Math.random() * 30)}, ${55 + Math.floor(Math.random() * 25)}, ${185 + Math.floor(Math.random() * 25)}, ${alpha})`;
      const size = 10 + Math.random() * 8; // Size variation

      const sx = (i % COLUMNS) * CELL;
      const sy = Math.floor(i / COLUMNS) * CELL;
      sheetCtx.fillStyle = color;
      sheetCtx.fillText(Math.random() > 0.5 ? '1' : '0', sx + PAD, sy + BASELINE);

      digits.push({
        x: (torusRadius + tubeRadius * Math.cos(u)) * Math.cos(v),
        y: (torusRadius + tubeRadius * Math.cos(u)) * Math.sin(v),
        z: tubeRadius * Math.sin(u),
        sx,
        sy,
        scale: size / MAX_SIZE,
      });
    }

    // Back-to-front by starting depth. The order never changes, so sort once.
    digits.sort((a, b) => a.z - b.z);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (const d of digits) {
        // Slow rotation, then perspective
        const rotatedX = d.x * cos - d.z * sin;
        const rotatedZ = d.x * sin + d.z * cos;
        const perspectiveScale = 600 / (600 + rotatedZ);
        const k = (d.scale * perspectiveScale) / SPRITE_SCALE;
        ctx.drawImage(
          sheet,
          d.sx, d.sy, CELL, CELL,
          centerX + rotatedX * perspectiveScale - PAD * k,
          centerY + d.y * perspectiveScale - BASELINE * k,
          CELL * k, CELL * k
        );
      }
    };

    ready = true;
    draw();

    // Spin only while the torus is on screen, and not at all for visitors who
    // prefer reduced motion (they get the still frame above).
    let frameId = 0;
    let last = 0;
    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);
      const elapsed = now - last;
      if (elapsed < 15) return; // cap at ~60fps on high-refresh screens
      angle += (Math.min(elapsed, 100) / 1000) * SPEED;
      last = now;
      draw();
    };
    const start = () => {
      if (frameId) return;
      last = performance.now();
      frameId = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduceMotion) start();
      else stop();
    });
    // Begin once the page has finished its startup work, so the spin doesn't
    // compete with it. Safari has no requestIdleCallback.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1000));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const idleId = idle(() => observer.observe(canvas));

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelIdle(idleId);
      observer.disconnect();
      stop();
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
              <NextSessionCard initialNow={now} className="mt-10 mx-auto md:mx-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
