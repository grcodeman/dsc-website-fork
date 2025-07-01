"use client";

import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-charcoal/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Mission Text */}
          <div className="flex-1 p-8">
            <h3 className="text-2xl font-heading mb-6 text-teal">Our Mission</h3>
            <p className="text-offwhite/90 mb-4 leading-relaxed">
              At the Data Science Club, we&apos;re dedicated to exploring the frontiers of data science, machine learning, and artificial intelligence. 
              We believe in the power of data to transform understanding and create innovative solutions.
            </p>
            <p className="text-offwhite/90 mb-4 leading-relaxed">
              Our community brings together students from all disciplines who share a passion for data-driven insights and cutting-edge technology.
            </p>
            <h3 className="text-2xl font-heading my-6 text-teal">What We Do</h3>
            <ul className="list-disc list-inside space-y-2 text-offwhite/90">
              <li>Collaborate on real-world data science projects</li>
              <li>Connect with industry professionals and researchers</li>
              <li>Create a supportive environment for learning and growth</li>
            </ul>
          </div>
          
          {/* Right Column - TensorFlow.js Demo Placeholder */}
          <div className="flex-1 bg-charcoal/30 rounded-lg border border-teal/20 flex flex-col">
            <div className="border-b border-teal/20 p-4">
              <h3 className="text-xl font-heading text-teal">TODO Demo</h3>
              <p className="text-sm text-offwhite/70">Powered by TensorFlow.js</p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="bg-charcoal/50 p-4 rounded mb-4 flex-1 flex items-center justify-center">
                <p className="text-offwhite/60 text-center">TensorFlow.js demo will be integrated here</p>
              </div>
              <div className="mt-auto">
                <div className="w-full h-2 bg-violet/20 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-teal to-violet"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-offwhite/60">
                  <span>Negative</span>
                  <span>Neutral</span>
                  <span>Positive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
