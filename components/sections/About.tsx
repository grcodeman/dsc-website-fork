"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Club photos shown in the About gallery. Kept at module scope so the array
// reference is stable across renders (keeps the cycle interval effect clean).
const GALLERY_IMAGES = [
  { src: '/club-spring-26.webp', alt: 'Data Science and AI Club members together at a club gathering' },
  { src: '/bronco-bash-25.webp', alt: 'DSAIC officers at the club table during Bronco Bash on the WMU campus' },
  { src: '/build-session-25.webp', alt: 'Students collaborating on laptops at a DSAIC build session' },
  { src: '/tabling-25.webp', alt: 'Students visiting the DSAIC table at a campus tabling event' },
  { src: '/advia-23.jpg', alt: 'Data Science and AI Club members at a club event' },
  { src: '/mtw-24.jpg', alt: 'Data Science and AI Club members at a club event' },
  { src: '/advia-24.jpg', alt: 'Data Science and AI Club members at a club event' },
  { src: '/stryker-25.jpg', alt: 'Data Science and AI Club members at a club event' },
];

type Slide = { currentImageIndex: number; mountedCount: number; forward: boolean };

const SLIDE_MS = 5000;

// Shows photo `index`, mounting it and the one after so the next fade is ready.
const showSlide = (index: number) => ({ currentImageIndex, mountedCount }: Slide): Slide => ({
  currentImageIndex: index,
  mountedCount: Math.max(mountedCount, Math.min(index + 2, GALLERY_IMAGES.length)),
  forward: index > currentImageIndex,
});
const nextSlide = (slide: Slide): Slide =>
  showSlide((slide.currentImageIndex + 1) % GALLERY_IMAGES.length)(slide);

// Dot geometry in px. Each dot sits in a 24px-wide button so every tap target
// is at least 24x24; the active blob is a 20px pill centered on its dot.
const DOT_PITCH = 24;
const PILL_PADDING = 8;
const BLOB_WIDTH = 20;
const PILL_WIDTH = PILL_PADDING * 2 + DOT_PITCH * GALLERY_IMAGES.length;

// Glass pagination over the photos. The active blob's leading edge moves
// first and its trailing edge follows, so it stretches toward the next dot and
// catches up, then squishes as it lands.
const PhotoDots = ({
  current,
  forward,
  onPick,
  onIntent,
}: {
  current: number;
  forward: boolean;
  onPick: (index: number) => void;
  onIntent: () => void;
}) => {
  const blobRef = useRef<HTMLSpanElement>(null);
  const shown = useRef(current);

  useEffect(() => {
    if (shown.current === current) return;
    shown.current = current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    blobRef.current?.animate(
      [
        { transform: 'scaleY(1)' },
        { transform: 'scaleY(0.6)', offset: 0.35 },
        { transform: 'scaleY(1.15)', offset: 0.7 },
        { transform: 'scaleY(1)' },
      ],
      { duration: 450, easing: 'ease-out' }
    );
  }, [current]);

  const center = PILL_PADDING + DOT_PITCH * current + DOT_PITCH / 2;
  const lead = '240ms cubic-bezier(0.4, 0, 0.2, 1)';
  const trail = `${lead} 120ms`;

  return (
    <div
      role="group"
      aria-label="Choose a photo"
      onPointerEnter={onIntent}
      onFocus={onIntent}
      className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-full border border-white/35 bg-ink/35 shadow-[0_6px_24px_-6px_rgba(21,18,56,0.45)] backdrop-blur-md"
      style={{ width: PILL_WIDTH, paddingInline: PILL_PADDING }}
    >
      <span
        ref={blobRef}
        aria-hidden
        className="pointer-events-none absolute top-[calc(50%-5px)] h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)] motion-reduce:transition-none!"
        style={{
          left: center - BLOB_WIDTH / 2,
          right: PILL_WIDTH - (center + BLOB_WIDTH / 2),
          transition: forward ? `right ${lead}, left ${trail}` : `left ${lead}, right ${trail}`,
        }}
      />
      {GALLERY_IMAGES.map((image, index) => (
        <button
          key={image.src}
          type="button"
          onClick={() => onPick(index)}
          aria-label={`Show photo ${index + 1} of ${GALLERY_IMAGES.length}`}
          aria-current={index === current ? 'true' : undefined}
          className="group flex h-7 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
          style={{ width: DOT_PITCH }}
        >
          <span className="h-2 w-2 rounded-full bg-white/60 transition-colors group-hover:bg-white/90" />
        </button>
      ))}
    </div>
  );
};

// Image Gallery component that cycles through images
const ImageGallery = () => {
  // Photos are mounted one slide ahead of the one showing, rather than all at
  // once, so the page doesn't download eight photos up front. Shown photos
  // stay mounted so the crossfade back from them still works.
  const [slide, setSlide] = useState<Slide>({ currentImageIndex: 0, mountedCount: 2, forward: true });
  const { currentImageIndex, mountedCount } = slide;
  // Nothing loads until the gallery is about to scroll into view, so the
  // photos don't compete with the hero for bandwidth on first load.
  const galleryRef = useRef<HTMLDivElement>(null);
  const [nearView, setNearView] = useState(false);
  // Hovering the photos or focusing the dots pauses autoplay.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearView(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px 0px' });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  // Advance every 5 seconds. Depending on the index restarts the clock after
  // every change, so a photo someone picks gets its full 5 seconds.
  useEffect(() => {
    if (!nearView || paused) return;
    const timer = setTimeout(() => setSlide(nextSlide), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [nearView, paused, currentImageIndex]);

  return (
    <div
      ref={galleryRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Club photos"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      className="w-full h-full relative overflow-hidden"
    >
      {nearView && GALLERY_IMAGES.slice(0, mountedCount).map((image, index) => (
        <div
          key={image.src}
          aria-hidden={index !== currentImageIndex}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 576px"
            className="object-cover" style={{ objectPosition: 'center 35%' }}
            loading="lazy"
          />
        </div>
      ))}
      {nearView && (
        <PhotoDots
          current={currentImageIndex}
          forward={slide.forward}
          onPick={(index) => setSlide(showSlide(index))}
          // Someone reaching for the dots will likely jump ahead, so load the rest.
          onIntent={() =>
            setSlide((s) => (s.mountedCount === GALLERY_IMAGES.length ? s : { ...s, mountedCount: GALLERY_IMAGES.length }))
          }
        />
      )}
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 bg-white/60 cv-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-ink">
          About Us
        </h2>

        {/* Content Section - Mobile: stacked, Desktop: side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:items-center">
          {/* Text Content */}
          <div className="order-1 p-8">
            <h3 className="text-2xl font-heading mb-6 text-violet">Our Mission</h3>
            <p className="text-ink/80 mb-4 leading-relaxed">
              At the Data Science &amp; AI Club (DSAIC), we&apos;re dedicated to exploring the frontiers of data science, machine learning, and artificial intelligence.
              We believe in the power of data to improve understanding and creating innovative solutions.
            </p>
            <p className="text-ink/80 mb-4 leading-relaxed">
              Our community is open to students from all majors who share a passion for data driven insights and technology.
            </p>
            <h3 className="text-2xl font-heading my-6 text-violet">What We Do</h3>
            <ul className="list-disc list-inside space-y-2 text-ink/80">
              <li>
                Build weekly at joint sessions with{' '}
                <a
                  href="https://devwmu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet underline underline-offset-2 hover:text-ink transition-colors"
                >
                  Developer Club
                </a>{' '}
                and{' '}
                <a
                  href="https://www.w1build.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet underline underline-offset-2 hover:text-ink transition-colors"
                >
                  W1 Builders
                </a>
              </li>
              <li>Collaborate on real-world data science and AI projects</li>
              <li>Connect with industry professionals and researchers</li>
              <li>Create a supportive environment for learning and growth</li>
            </ul>
          </div>

          {/* Image Gallery */}
          <div className="order-2 h-[350px] rounded-lg overflow-hidden flex items-center justify-center border border-lavender shadow-[0_8px_24px_-12px_rgba(37,25,122,0.18)]">
            <ImageGallery />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
