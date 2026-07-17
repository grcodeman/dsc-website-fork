"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Image Gallery component that cycles through images
const ImageGallery = () => {
  const images = [
    '/club-spring-26.webp',
    '/advia-23.jpg',
    '/mtw-24.jpg',
    '/advia-24.jpg',
    '/stryker-25.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={src}
            alt={`Club image ${index + 1}`}
            fill
            className="object-cover" style={{ objectPosition: 'center 35%' }}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 bg-white/60">
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
              <li>Build weekly at joint sessions with Developer Club</li>
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
